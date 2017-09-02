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
    var SCORES_VERSION = 3;

    return module.service('$scores',
        ['$rootScope', '$fs', '$stages', '$q', '$teams',
        function($rootScope, $fs, $stages, $q, $teams) {

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

            // Internal map of which scoresheets have already been
            // processed.
            this._sheets = {};

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


        Scores.prototype.load = function() {
            var self = this;
            return $fs.read('scores.json').then(function(res) {
                self.beginupdate();
                try {
                    // Determine scores file version
                    var scores;
                    var version;
                    var sheetNames = [];
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
                        sheetNames = res.sheets;
                    }
                    if (version > SCORES_VERSION) {
                        throw new Error(format("unknown scores version {0}, (expected {1})", version, SCORES_VERSION));
                    }
                    self.clear();
                    scores.forEach(function(score) {
                        self.add(score);
                    });
                    self._sheets = {};
                    sheetNames.forEach(function(name) { self._sheets[name] = true; });
                    log("scores loaded, version " + version);
                } finally {
                    self.endupdate();
                }
            }, function(err) {
                log('scores read error', err);
            });
        };

        Scores.prototype.remove = function(index) {
            // TODO: this function used to remove an associated
            // score sheet file.
            // However, as creating that scoresheet was not
            // the concern of this class, I (Martin) decided
            // that removing it should not be its concern either.
            // Note that e.g. the clear() method also did not
            // remove 'obsolete' scoresheet files.
            // Additionally note that a scoresheet may be the digital
            // representation of a 'physical' scoresheet, something
            // with a signature even, and may indeed be a very different
            // beast than 'merely' a score entry.
            this._rawScores.splice(index, 1);
            this._update();
        };

        /**
         * Convert 'dirty' score value to correct type used during score
         * computations etc.
         * Valid inputs are fixed strings like "dnc" (Did Not Compete) and
         * "dnq" (Did Not Qualify) in any combination of upper/lower case,
         * null (dummy entry, maybe because score was removed) and numbers
         * (also as strings). Empty string is converted to null.
         * Invalid input is simply returned (and later marked as invalid
         * during scoreboard computation).
         */
        function sanitizeScore(score) {
            // Passthrough for already valid inputs
            if (typeof score === "number")
                return score;
            switch (score) {
                case "dnc":
                case "dsq":
                case null:
                    return score;
            }
            // Accept numbers stored as strings
            var n = parseInt(score, 10);
            if (String(n) === score)
                return n;
            // Try to convert some spellings of accepted strings
            if (typeof score === "string") {
                var s = score.toLowerCase();
                switch (s) {
                    case "dnc":
                    case "dsq":
                        return s;
                    case "":
                        return null;
                }
            }
            // Pass through the rest
            log("Warning: invalid score " + score);
            return score;
        }

        /**
         * Convert 'dirty' input score entry to a representation that we can store
         * on a filesystem. This means e.g. not storing denormalized version of
         * team and stage, but only their ID's. Additionally, forces values to be
         * of the right type where possible.
         */
        function sanitizeEntry(entry) {
            return {
                file: (entry.file !== undefined && entry.file !== null) ? String(entry.file) : "",
                teamNumber: parseInt((entry.teamNumber !== undefined) ? entry.teamNumber : entry.team.number, 10),
                stageId: String((entry.stageId !== undefined) ? entry.stageId : entry.stage.id),
                round: parseInt(entry.round, 10),
                score: sanitizeScore(entry.score), // can be Number, null, "dnc", etc.
                originalScore: parseInt(entry.originalScore !== undefined ? entry.originalScore : entry.score, 10),
                edited: entry.edited !== undefined ? String(entry.edited) : undefined, // timestamp, e.g. "Wed Nov 26 2014 21:11:43 GMT+0100 (CET)"
                published: !!entry.published,
                table: entry.table
            };
        }

        Scores.prototype.create = function(scoresheet) {
            var self = this;

            var score = sanitizeEntry(scoresheet);
            return $independence.act('scores','/scores/create',{ scoresheet: scoresheet, score: score }, function() {
                self._rawScores.push(score);
            }).then((res) => self._update(res));
        };

        Scores.prototype.delete = function(score) {
            var self = this;

            return $independence.act('scores','/scores/delete/' + score.id, {}, function() {
                self._rawScores.splice(self.scores.findIndex(s => s.id === score.id), 1);
            }).then((res) => self._update(res));
        };

        Scores.prototype.update = function(score) {
            var self = this;

            score.edited = (new Date()).toString();
            return $independence.act('scores','/scores/update/' + score.id, score, function() {
                self._rawScores[self.scores.findIndex(s => s.id === score.id)] = score;
            }).then((res) => self._update(res));
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

        /**
         * Poll storage for any new score sheets.
         * Ignore already processed sheets, add a new score entry for each
         * new sheet.
         * FIXME: this is a temporary hack to get basic multi-user scoring
         * working very quickly. Functionality like this should be moved to
         * a server-instance and/or be distributed. The reason for integrating
         * it directly in $scores for now, is that this reduces the change of
         * having the state of processed sheets getting out of sync with the
         * list of scores.
         */
        Scores.prototype.pollSheets = function() {
            var self = this;
            // Prevent (accidentally) performing the check in parallel
            if (self._pollingSheets) {
                return self._pollingSheets;
            }

            self._pollingSheets = $fs.list("scoresheets/").catch(function(err) {
                // Ignore the fact that there are no sheets at all yet
                if (err.status === 404) {
                    return [];
                }
                // Convert to 'normal' errors in case of XHR response
                if (err.status && err.responseText) {
                    throw new Error(format("error {0} ({1}): {2}",
                        err.status, err.statusText,
                        err.responseText
                    ));
                }
                // Otherwise, pass the error on
                if (err instanceof Error) {
                    throw err;
                }
                // Fallback
                throw new Error("unknown error: " + String(err));
            }).then(function(filenames) {
                var promises = [];
                // Walk over all sheets, find the 'new' ones
                filenames.forEach(function(filename) {
                    if (filename in self._sheets) {
                        return;
                    }
                    // Retrieve the new sheet
                    var p = $fs.read("scoresheets/" + filename).then(function(sheet) {
                        // Convert to score entry and add to list
                        var score = {
                            file: filename,
                            teamNumber: sheet.teamNumber !== undefined ? sheet.teamNumber : sheet.team.number,
                            stageId: sheet.stageId !== undefined ? sheet.stageId : sheet.stage.id,
                            round: sheet.round,
                            score: sheet.score,
                            table: sheet.table
                        };
                        self.add(score);
                        // Mark as processed
                        self._sheets[filename] = true;
                        log(format("Added new scoresheet: stage {0}, round {1}, team {2}, score {3}",
                            score.stageId, score.round, score.teamNumber, score.score
                        ));
                    });
                    promises.push(p);
                });
                // Make sure to wait for all sheets to be processed
                // before resolving the promise.
                return $q.all(promises).finally(function() {
                    // Always save scores if there was work to do,
                    // even in case of errors, as some scores may still
                    // have been added successfully.
                    if (promises.length > 0) {
                        return self.save();
                    }
                });
            }).finally(function() {
                self._pollingSheets = null;
            });
            return self._pollingSheets;
        };

        Scores.prototype._update = function(response) {
            if (this._updating > 0) {
                return;
            }

            if(response) {
                this._rawScores = response.scores;
                this._sheets = response.sheets;
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
                var s = {
                    file: _score.file,
                    teamNumber: _score.teamNumber,
                    team: $teams.get(_score.teamNumber),
                    stageId: _score.stageId,
                    stage: $stages.get(_score.stageId),
                    round: _score.round,
                    score: _score.score,
                    originalScore: _score.originalScore,
                    edited: _score.edited,
                    published: _score.published,
                    table: _score.table,
                    modified: false,
                    error: null
                };
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
