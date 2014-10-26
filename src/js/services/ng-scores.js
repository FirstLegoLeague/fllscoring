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

    return module.service('$scores', ['$fs', '$stages', '$q', function($fs, $stages, $q) {

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

        function InvalidTeamError(team) {
            this.team = team;
            this.name = "InvalidTeamError";
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
            this.DuplicateScoreError = DuplicateScoreError;

            // TODO: add a $watch on $stages.stages to call this._update()?
            // See also the _update() call in this.init().
            this._stages = $stages.stages;

            this._rawScores = [];

            this._updating = 0;
            this._initialized = null; // Promise<void>
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
                        // In the mean time, start loading our scores.
                        return self.load();
                    });
            }
            return this._initialized;
        }


        Scores.prototype.clear = function() {
            this._rawScores = [];
            this._update();
        };

        Scores.prototype.save = function() {
            return $fs.write('scores.json', this._rawScores).then(function() {
                log('scores saved');
            }, function(err) {
                log('scores write error', err);
            });
        };

        Scores.prototype.load = function() {
            var self = this;
            return $fs.read('scores.json').then(function(res) {
                self.beginupdate();
                try {
                    self.clear();
                    res.forEach(self.add.bind(self));
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

        Scores.prototype.add = function(score) {
            // Create a copy of the score, in case the
            // original score is being modified...
            // TODO: recursively do that for the stages etc. as well?
            // Or maybe e.g. only store the stage ID and team number?
            this._rawScores.push({
                file: score.file,
                team: score.team,
                stage: score.stage,
                round: score.round,
                score: score.score,
                originalScore: score.originalScore !== undefined ? score.originalScore : score.score
            });
            this._update();
        };

        /**
         * Update score at given index.
         * This differs from e.g. remove(index); add(score); in that
         * it ensures that only allowed changes are made, and marks the
         * the score as modified.
         */
        Scores.prototype.update = function(index, score) {
            var old = this._rawScores[index];
            if (!old) {
                throw new RangeError("unknown score index: " + index);
            }
            // Note: we leave eg. originalScore intact, so _update() will
            // mark it as modified.
            old.file = score.file;
            old.team = score.team;
            old.stage = score.stage;
            old.round = score.round;
            old.score = score.score;
            this._update();
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
            var board = this.scoreboard;

            // Clear existing properties
            this.scores.splice(0, this.scores.length); // clear without creating new object
            this.validationErrors.splice(0, this.validationErrors.length);
            var k;
            for (k in board) {
                if (!board.hasOwnProperty(k)) {
                    continue;
                }
                delete board[k];
            }

            // Create empty lists for each stage
            this._stages.forEach(function(stage) {
                board[stage.id] = [];
            });

            // Walk all scores, and put them in the corresponding round of each stage.
            // This also performs sanity checks on the scores, marking failures.
            // Highest scores and rankings are computed later.
            this._rawScores.forEach(function(_score) {
                // Create a copy of the score, such that we can add
                // additional info
                var s = {
                    file: _score.file,
                    team: _score.team,
                    stage: _score.stage,
                    round: _score.round,
                    score: _score.score,
                    originalScore: _score.originalScore,
                    modified: false,
                    error: null
                };
                self.scores.push(s);

                // Mark score as modified if there have been changes to the
                // original entry
                if (s.score !== s.originalScore) {
                    s.modified = true;
                }

                // Check whether score is for a 'known' stage
                var stageId = s.stage ? s.stage.id : undefined;
                var bstage = board[stageId];
                if (!bstage) {
                    s.error = new UnknownStageError(stageId);
                    return;
                }

                // Check whether score's round is valid for this stage
                var stage = $stages.get(stageId);
                if (!(s.round >= 1 && s.round <= stage.rounds)) {
                    s.error = new UnknownRoundError(s.round);
                    return;
                }

                // Check whether the score's value is sane
                // Note: null is not considered valid here, as it would
                // mean that one could 'reset' a team's score for that round.
                // If a team did not play in a round, there will simply be no
                // entry in scores.
                if (!(
                    typeof s.score === "number" && s.score >= -1000 && s.score <= 1000 ||
                    s.score === "dnc" ||
                    s.score === "dsq"
                )) {
                    s.error = new InvalidScoreError(s.score);
                    return;
                }

                // Check whether team is valid
                var teamId = s.team ? s.team.number : undefined;
                if (teamId === undefined || teamId === null) {
                    s.error = new InvalidTeamError(teamId);
                    return;
                }

                // Find existing entry for this team, or create one
                var bteam;
                var i;
                for (i = 0; i < bstage.length; i++) {
                    if (bstage[i].team.number === teamId) {
                        bteam = bstage[i];
                        break;
                    }
                }
                if (!bteam) {
                    var initialScores = new Array(stage.rounds);
                    for (i = 0; i < stage.rounds; i++) {
                        initialScores[i] = null;
                    }
                    bteam = {
                        team: s.team,
                        scores: initialScores,
                        rank: null,
                        highest: null,
                    };
                    bstage.push(bteam);
                }

                // Add score to team's entry
                if (bteam.scores[s.round - 1] !== null) {
                    // TODO: mark other scores too
                    s.error = new DuplicateScoreError(bteam.team, stage, s.round);
                    return;
                }
                bteam.scores[s.round - 1] = s.score;
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

            // Sort by scores and compute rankings
            for (var stageId in board) {
                if (!board.hasOwnProperty(stageId)) {
                    continue;
                }
                var stage = board[stageId];

                // Create sorted scores and compute highest score per team
                stage.forEach(function(teamEntry) {
                    teamEntry.sortedScores = teamEntry.scores.slice(0); // create a copy
                    teamEntry.sortedScores.sort(scoreCompare);
                    teamEntry.highest = teamEntry.sortedScores[0];
                });

                // Sort teams based on sorted scores
                stage.sort(entryCompare);

                // Compute ranking, assigning equal rank to equal scores
                var rank = 0;
                var lastScores = null;
                stage.forEach(function(teamEntry) {
                    if (lastScores === null || scoresCompare(lastScores, teamEntry.sortedScores) !== 0) {
                        rank++;
                    }
                    lastScores = teamEntry.sortedScores;
                    teamEntry.rank = rank;
                });
            }

            // Update validation errors (useful for views)
            this.scores.forEach(function(score) {
                if (score.error) {
                    self.validationErrors.push(score.error);
                }
            });
        }

        return new Scores();
    }]);
});
