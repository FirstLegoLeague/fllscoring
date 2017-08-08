/**
 * Service handling all access to scores, including scoreboard
 * and ranking computation.
 */
define('services/ng-scores',[
    'services/ng-services',
    'services/log',
    'services/ng-fs',
    'services/ng-stages'
],function(module,log) {
    "use strict";

    // Current file version for scores.
    // Increment when adding/removing 'features' to stored scores.
    var SCORES_VERSION = 2;

    return module.service('$scores',
        ['$rootScope', '$fs', '$stages', '$q', '$teams', '$http', '$localStorage',
        function($rootScope, $fs, $stages, $q, $teams, $http, $localStorage) {

        // Replace placeholders in format string.
        // Example: format("Frobnicate {0} {1} {2}", "foo", "bar")
        //       -> "Frobnicate foo bar {2}"
        // TODO: move this out of ng-scores to allow re-use
        function format(/* fmt, args... */) {
            var args = Array.prototype.slice.call(arguments);
            var fmt = args.shift();
            return fmt.replace(/{(\d+)}/g, function(match, number) {
                return args[number] !== undefined
                    ? args[number]
                    : match
                ;
            });
        }

        /* Validation error classes */

        function UnknownStageError(stageId) {
            this.stageId = stageId;
            this.name = "UnknownStageError";
            this.message = format("unknown stage '{0}'", String(stageId));
        }

        function UnknownRoundError(round) {
            this.round = round;
            this.name = "UnknownRoundError";
            this.message = format("invalid round '{0}'", String(round));
        }

        function InvalidScoreError(score) {
            this.score = score;
            this.name = "InvalidScoreError";
            this.message = format("invalid score '{0}'", String(score));
        }

        function UnknownTeamError(team) {
            this.team = team;
            this.name = "UnknownTeamError";
            this.message = format("invalid team '{0}'", String(team));
        }

        function DuplicateScoreError(team, stage, round) {
            this.team = team;
            this.stage = stage;
            this.round = round;
            this.name = "DuplicateScoreError";
            this.message = format(
                "duplicate score for team '{0}' ({1}), stage {2}, round {3}",
                team.name, team.number,
                stage.name, round
            );
        }

        /* Main Scores class */

        function Scores() {
            var self = this;

            /**
             * Current list of scores.
             * Each score is an object describing which team scored that
             * score in which round, and possibly contains a reference to the
             * scoresheet file.
             * You can use directly use this property in e.g. views, as
             * the reference will remain valid.
             */
            this.scores = [];

            /**
             * List of validation errors generated during scoreboard
             * computation.
             */
            this.validationErrors = [];

            /**
             * Scoreboard containing ordered lists of teams per stage.
             */
            this.scoreboard = {};

            this.UnknownStageError = UnknownStageError;
            this.UnknownRoundError = UnknownRoundError;
            this.InvalidScoreError = InvalidScoreError;
            this.UnknownTeamError = UnknownTeamError;
            this.DuplicateScoreError = DuplicateScoreError;

            // We need to track changes to $stages, in order to update
            // the stage-references from the scores.
            // Note that the scores on disk only store stageId's, not
            // the full stage, as the content of a stage may change
            // (mostly during development).
            $rootScope.$watch(function() {
                return $stages.stages;
            }, function() {
                self._update();
            }, true);

            // Also need to track updates to $teams
            $rootScope.$watch(function() {
                return $teams.teams;
            }, function() {
                self._update();
            }, true);

            this._rawScores = [];

            this._updating = 0;
            this._initialized = null; // Promise<void>
            this._pollingSheets = null; // Promise<void>
            this.init();
        }

        /**
         * Initialize service, if not initialized already.
         * @returns Promise<void> that is resolved when init is complete.
         */
        Scores.prototype.init = function() {
            var self = this;
            if (!this._initialized) {
                this._initialized = $stages.init()
                    .then(function() {
                        // Stages got defined, rebuild scoreboard
                        // before waiting until scores are loaded,
                        // as some views may e.g. iterate over all
                        // available stages in the scoreboard already.
                        self._update();

                        return $teams.init();
                    }).then(function() {
                        return self.load();
                    });
            }
            return this._initialized;
        };


        Scores.prototype.clear = function() {
            this._rawScores = [];
            this._update();
        };

        Scores.prototype.load = function(scores) {
            var self = this;
            var processScores = function(res) {
                self.beginupdate();
                try {
                    // Determine scores file version
                    var scores;
                    var version;
                    if (res.version === undefined) {
                        // 'Legacy' storage, all scores stored directly
                        // as an array
                        scores = res;
                        version = 1;
                    } else {
                        // New style storage, scores in a property,
                        // and an explicit version identifier.
                        version = res.version;
                        scores = res.scores;
                    }
                    if (version > SCORES_VERSION) {
                        throw new Error(format("unknown scores version {0}, (expected {1})", version, SCORES_VERSION));
                    }
                    self.clear();
                    scores.forEach(function(score) {
                        self._rawScores.push(score);
                    });
                    log("scores loaded, version " + version);
                } finally {
                    self.endupdate();
                }
            };

            if(scores) {
                return processScores(scores);
            } else {
                return $fs.read('scores.json').then(processScores, function(err) {
                    log('scores read error', err);
                });
            }
        };

        Scores.prototype.beginupdate = function() {
            this._updating++;
        };

        Scores.prototype.endupdate = function() {
            if (this._updating <= 0) {
                throw new Error("beginupdate()/endupdate() calls mismatched");
            }
            this._updating--;
            if (this._updating === 0) {
                this._update();
            }
        };

        Scores.prototype._update = function() {
            if (this._updating > 0) {
                return;
            }

            var self = this;
            var results = this.getRankings();

            // Update global scores without creating a new object
            var scores = results.scores;
            scores.unshift(0, this.scores.length);
            this.scores.splice.apply(this.scores, scores);

            // Update global scoreboard without creating a new object
            var board = this.scoreboard;
            var k;
            for (k in this.scoreboard) {
                if (!this.scoreboard.hasOwnProperty(k)) {
                    continue;
                }
                delete this.scoreboard[k];
            }
            Object.keys(results.scoreboard).forEach(function(stageId) {
                self.scoreboard[stageId] = results.scoreboard[stageId];
            });

            // Update validation errors (useful for views)
            this.validationErrors.splice(0, this.validationErrors.length);
            this.scores.forEach(function(score) {
                if (score.error) {
                    self.validationErrors.push(score.error);
                }
            });
            $rootScope.$broadcast('validationError', this.validationErrors);
        };

        Scores.prototype.create = function(scoresheet) {
            var self = this;
            return $http.post('/scores/create', { scoresheet: scoresheet }).then(function(res) {
                self.load(res.data);
                self.sendSavedActionsToServer();
                return true;
            }, function() {
                self.actAheadOfServer({
                    type: 'create',
                    params: [scoresheet]
                });
                return false;
            });
        };

        Scores.prototype.delete = function(score) {
            var self = this;
            return $http.post('/scores/delete/' + score.id).then(function(res) {
                self.load(res.data);
            });
        };

        Scores.prototype.update = function(score) {
            score.edited = (new Date()).toString();
            var self = this;
            return $http.post('/scores/update/' + score.id, score).then(function(res) {
                self.load(res.data);
            });
        };

        Scores.prototype.actAheadOfServer = function(action) {
            $localStorage[`action_${Date.now()}`] = JSON.stringify(action);
        };

        Scores.prototype.sendSavedActionsToServer = function() {
            if(this._sendingSavedActionsToServer) return;
            this._sendingSavedActionsToServer = true;

            var self = this;
            let promises = [];

            for(let key in $localStorage) {
                var _break = false;

                if(key.startsWith('action_')) {
                    let action = JSON.parse($localStorage[key]);

                    let promise = self[action.type].call(self, action.params).then(function() {
                        delete $localStorage[key];
                    }, function() {
                        _break = true;
                    });

                    promises.push(promise);
                }
                if(_break)  break;
            }
            $q.all(promises).then(function() {
                self._sendingSavedActionsToServer = false;
            });
        };

        Scores.prototype.pendings = function() {
            return Object.keys($localStorage).filter((k) => k.startsWith('scoresheet_')).length
        };

        /**
         * Compute scoreboard and sanitized/validated scores.
         *
         * Optionally, pass an object containing stageId => nrOfRoundsOrTrue mapping.
         * E.g. { "practice": true, "qualifying": 2 }, which computes the ranking
         * for all rounds in the practice stage, and the first 2 rounds of the
         * qualifying stage.
         *
         * Resulting object contains `scores` and `scoreboard` properties.
         * If no stages filter is passed, all scores will be output.
         * If a stages filter is passed, only valid and relevant scores are
         * output.
         *
         * @param  stages Optional object stageId => nrOfRoundsOrTrue
         * @return Results object with validated scores and per-stage rankings
         */
        Scores.prototype.getRankings = function(stages) {
            var self = this;
            var results = {
                scores: [], // List of sanitized scores
                scoreboard: {}, // Sorted rankings for each stage
            };

            var haveFilter = !!stages;
            if (!stages) {
                stages = {};
                $stages.stages.forEach(function(stage) {
                    stages[stage.id] = true;
                });
            }

            // Convert number of stages to take to a number (i.e. Infinity when
            // e.g. `true` is passed)
            // And create empty lists for each stage
            var board = results.scoreboard;
            Object.keys(stages).forEach(function(stage) {
                var s = stages[stage];
                stages[stage] = typeof s === "number" && s || s && Infinity || 0;
                board[stage] = [];
            });

            // Walk all scores, and put them in the corresponding round of each stage.
            // This also performs sanity checks on the scores, marking failures.
            // Highest scores and rankings are computed later.
            this._rawScores.forEach(function(_score) {
                // Create a copy of the score, such that we can add
                // additional info
                var s = angular.copy(_score);
                s.stage = $stages.get(_score.stageId);
                s.team = $teams.get(_score.teamNumber);
                s.modified = false;
                s.error = null;

                results.scores.push(s);

                // Mark score as modified if there have been changes to the
                // original entry
                if (s.score !== s.originalScore) {
                    s.modified = true;
                }

                // Check whether score is for a 'known' stage
                var bstage = board[_score.stageId];
                if (!bstage) {
                    s.error = new UnknownStageError(_score.stageId);
                    return;
                }

                // Check whether score's round is valid for this stage
                if (!(s.round >= 1 && s.round <= s.stage.rounds)) {
                    s.error = new UnknownRoundError(s.round);
                    return;
                }

                // Check whether the score's value is sane
                // Note: null is not considered valid here, as it would
                // mean that one could 'reset' a team's score for that round.
                // If a team did not play in a round, there will simply be no
                // entry in scores.
                if (!(
                    typeof s.score === "number" && s.score > -Infinity && s.score < Infinity ||
                    s.score === "dnc" ||
                    s.score === "dsq"
                )) {
                    s.error = new InvalidScoreError(s.score);
                    return;
                }

                // Check whether team is valid
                if (!s.team) {
                    s.error = new UnknownTeamError(_score.teamNumber);
                    return;
                }

                // Ignore score if filtered
                if (haveFilter && s.round > stages[s.stageId]) {
                    return;
                }

                // Find existing entry for this team, or create one
                var bteam;
                var i;
                for (i = 0; i < bstage.length; i++) {
                    if (bstage[i].team.number === s.team.number) {
                        bteam = bstage[i];
                        break;
                    }
                }
                if (!bteam) {
                    var maxRounds = Math.min(s.stage.rounds, stages[s.stageId]);
                    var initialScores = new Array(maxRounds);
                    var initialEntries = new Array(maxRounds);
                    for (i = 0; i < maxRounds; i++) {
                        initialScores[i] = null;
                        initialEntries[i] = null;
                    }
                    bteam = {
                        team: s.team,
                        scores: initialScores,
                        rank: null,
                        highest: null,
                        entries: initialEntries,
                    };
                    bstage.push(bteam);
                }

                // Add score to team's entry
                if (bteam.scores[s.round - 1] !== null) {
                    // Find the original entry with which this entry collides,
                    // then assign an error to that entry and to ourselves.
                    var dupEntry = bteam.entries[s.round - 1];
                    var e = dupEntry.error;
                    if (!e) {
                        e = new DuplicateScoreError(bteam.team, s.stage, s.round);
                        dupEntry.error = e;
                    }
                    s.error = e;
                    return;
                }
                bteam.scores[s.round - 1] = s.score;
                bteam.entries[s.round - 1] = s;
            });

            // Compares two scores.
            // Returns 0 if scores are equal, 1 if score2 is larger than score1,
            // -1 otherwise.
            // Note: this ordering causes Array.sort() to sort from highest to lowest score.
            function scoreCompare(score1, score2) {
                if (score1 === score2) {
                    return 0;
                }
                var comp = false;
                if (score1 === null || score2 === null) {
                    comp = (score1 === null);
                } else if (score1 === "dsq" || score2 === "dsq") {
                    comp = (score1 === "dsq");
                } else if (score1 === "dnc" || score2 === "dnc") {
                    comp = (score1 === "dnc");
                } else if (typeof score1 === "number" && typeof score2 === "number") {
                    comp = score1 < score2;
                } else {
                    throw new TypeError("cannot compare scores '" + score1 + "' and '" + score2 + '"');
                }
                return comp ? 1 : -1;
            }

            // Compares two scores-arrays.
            // Returns 0 if arrays are equal, 1 is scores2 is larger than scores1,
            // -1 otherwise.
            // Note: this ordering causes Array.sort() to sort from highest to lowest score.
            function scoresCompare(scores1, scores2) {
                var result = 0;
                var i;
                if (scores1.length !== scores2.length) {
                    throw new RangeError("cannot compare score arrays with different number of rounds");
                }
                for (i = 0; i < scores1.length; i++) {
                    result = scoreCompare(scores1[i], scores2[i]);
                    if (result !== 0)
                        break;
                }
                return result;
            }

            // Compare two 'team entries' (members of a scoreboard stage).
            // 1 is teamEntry2 has higher scores than teamEntry1, or -if scores are
            // equal- teamEntry1 has a higher team number. Returns -1 otherwise.
            // Note: this ordering causes Array.sort() to sort from highest to lowest score,
            // or in ascending team-id order.
            function entryCompare(teamEntry1, teamEntry2) {
                var result = scoresCompare(teamEntry1.sortedScores, teamEntry2.sortedScores);
                if (result === 0) {
                    // Equal scores, ensure stable sort by introducing
                    // extra criterion.
                    // Note: team number's might be strings, so don't assume numeric
                    // compare is possible.
                    result = (teamEntry1.team.number > teamEntry2.team.number) ? 1 : -1;
                }
                return result;
            }

            function createSortedScores(teamEntry) {
                teamEntry.sortedScores = teamEntry.scores.slice(0); // create a copy
                teamEntry.sortedScores.sort(scoreCompare);
                teamEntry.highest = teamEntry.sortedScores[0];
            }

            function calculateRank(state,teamEntry) {
                if (state.lastScores === null || scoresCompare(state.lastScores, teamEntry.sortedScores) !== 0) {
                    state.rank++;
                }
                state.lastScores = teamEntry.sortedScores;
                teamEntry.rank = state.rank;
                return state;
            }

            // Sort by scores and compute rankings
            for (var stageId in board) {
                if (!board.hasOwnProperty(stageId)) {
                    continue;
                }
                var stage = board[stageId];

                // Create sorted scores and compute highest score per team
                stage.forEach(createSortedScores);

                // Sort teams based on sorted scores
                stage.sort(entryCompare);

                // Compute ranking, assigning equal rank to equal scores
                stage.reduce(calculateRank,{
                    rank: 0,
                    lastScores: null
                });
            }

            // Filter scores if requested
            if (haveFilter) {
                results.scores = results.scores.filter(function(score) {
                    return !score.error && stages[score.stageId] && score.round <= stages[score.stageId];
                });
            }

            return results;
        };

        return new Scores();
    }]);
});
