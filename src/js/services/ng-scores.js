/**
 * Service handling all access to scores, including scoreboard
 * and ranking computation.
 */
define('services/ng-scores',[
    'services/ng-services',
    'services/log',
    'services/ng-fs',
    'services/ng-stages',
    'factories/poller',
    'services/ng-teams',
],function(module,log) {
    "use strict";

    // Current file version for scores.
    // Increment when adding/removing 'features' to stored scores.
    var SCORES_VERSION = 2;

    return module.service('$scores',
        ['$rootScope', '$fs', '$stages', '$q', '$teams', 'Poller',
        function($rootScope, $fs, $stages, $q, $teams, Poller) {

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

        function DuplicateScoreError(score) {
            this.team = score.team;
            this.stage = score.stage;
            this.round = score.round;
            this.name = "DuplicateScoreError";
            this.message = format(
                "duplicate score for team '{0}' ({1}), stage {2}, round {3}",
                this.team.name, score.teamNumber,
                this.stage.name, this.round
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
            this.AUTO_REFRESH_INTERVAL = 30 * 1000; // milliseconds
            this._autoRefreshPoller = new Poller(this.AUTO_REFRESH_INTERVAL, function() { self._onAutoRefresh(); });
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

        Scores.prototype.save = function() {
            var data = {
                version: 2,
                scores: this._rawScores,
                sheets: Object.keys(this._sheets),
            };
            return $fs.write('scores.json', data).then(function() {
                log('scores saved');
            }, function(err) {
                log('scores write error', err);
            });
        };

        Scores.prototype.load = function() {
            var self = this;
            this._autoRefreshPoller.reset();
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
         * Determine whether given score is valid, i.e. a number, or "dnc" (Did Not Compete),
         * or "dsq" (DiSQualified).
         * Note: `null` and `undefined` are invalid: remove the score to denote this instead.
         *
         * @param score {any} Score value to test
         * @return true when score is valid
         */
        Scores.prototype.isValidScore = function (score) {
            return typeof score === "number" && score > -Infinity && score < Infinity ||
                score === "dnc" || score === "dsq";
        };

        /**
         * Convert 'dirty' score value to correct type used during score
         * computations etc.
         * Valid inputs are fixed strings like "dnc" (Did Not Compete) and
         * "dsq" (DiSQualified) in any combination of upper/lower case,
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

        Scores.prototype.add = function(score) {
            // Create a copy of the score, in case the
            // original score is being modified...
            this._rawScores.push(sanitizeEntry(score));
            this._update();
        };

        /**
         * Update score at given index.
         * This differs from e.g. remove(index); add(score); in that
         * it ensures that only allowed changes are made, and marks the
         * the score as modified.
         */
        Scores.prototype.update = function(index, score) {
            if (index < 0 || index >= this._rawScores.length) {
                throw new RangeError("unknown score index: " + index);
            }
            var newScore = sanitizeEntry(score);
            newScore.edited = (new Date()).toString();
            this._rawScores.splice(index, 1, newScore);
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
            if (!this.isUpdating()) {
                this._update();
            }
        };

        Scores.prototype.isUpdating = function () {
            return this._updating > 0;
        };

        /**
         * Enable automatic refresh of scores if no e.g. manual
         * refresh happened for a while. This is mostly used as
         * a backup scenario in case we e.g. missed an (MHub) event,
         * or when MHub is not available.
         * Use disableAutoRefresh() when no longer needed (e.g. on
         * controller destruction).
         */
        Scores.prototype.enableAutoRefresh = function() {
            this._autoRefreshPoller.start();
        };

        /**
         * Unregister interest in auto-refresh. See enableAutoRefresh().
         */
        Scores.prototype.disableAutoRefresh = function () {
            this._autoRefreshPoller.stop();
        };

        Scores.prototype._onAutoRefresh = function () {
            // Reload scores from server (if we're not already
            // in the middle of something).
            if (!this.isUpdating()) {
                this.load();
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

        Scores.prototype._update = function() {
            if (this.isUpdating()) {
                return;
            }

            var self = this;

            // Update global scores without creating a new object
            var scores = this.getValidatedScores();
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

            var scoreboard = this.getRankings();
            Object.keys(scoreboard).forEach(function(stageId) {
                self.scoreboard[stageId] = scoreboard[stageId];
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
         * Perform validation on scores.
         * @return list of scores including annotations about e.g. errors
         */
        Scores.prototype.getValidatedScores = function() {
            var self = this;

            // Create a copy of the score, such that we can add
            // additional info (e.g. validation errors) without
            // polluting rawScores.
            var validatedScores = this._rawScores.map(function (_score) {
                return {
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
            });

            // Map of stageId -> teamId -> roundId -> score to detect
            // duplicate scores
            var scoresPerTeamPerStage = {};

            // Walk all scores and annotate with sanity checks
            validatedScores.forEach(function (s) {
                // Mark score as modified if there have been changes to the
                // original entry
                if (s.score !== s.originalScore) {
                    s.modified = true;
                }

                // Check whether score is for a 'known' stage
                if (!s.stage) {
                    s.error = new UnknownStageError(s.stageId);
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
                if (!self.isValidScore(s.score)) {
                    s.error = new InvalidScoreError(s.score);
                    return;
                }

                // Check whether team is valid
                if (!s.team) {
                    s.error = new UnknownTeamError(s.teamNumber);
                    return;
                }

                // Detect duplicate entries (same stage+team+round)
                if (!scoresPerTeamPerStage[s.stageId]) {
                    scoresPerTeamPerStage[s.stageId] = {};
                }
                var scoresPerTeam = scoresPerTeamPerStage[s.stageId];

                if (!scoresPerTeam[s.teamNumber]) {
                    scoresPerTeam[s.teamNumber] = {};
                }
                var teamEntries = scoresPerTeam[s.teamNumber];

                if (teamEntries[s.round]) {
                    // Find the original entry with which this entry collides,
                    // then assign an error to that entry and to ourselves.
                    var dupEntry = teamEntries[s.round];
                    var e = dupEntry.error;
                    if (!e) {
                        e = new DuplicateScoreError(dupEntry);
                        dupEntry.error = e;
                    }
                    s.error = e;
                    return;
                } else {
                    teamEntries[s.round] = s;
                }
            });

            return validatedScores;
        }

        /**
         * Compute scoreboard.
         *
         * Optionally, pass an object containing stageId => nrOfRoundsOrTrue mapping.
         * E.g. { "practice": true, "qualifying": 2 }, which computes the ranking
         * for all rounds in the practice stage, and the first 2 rounds of the
         * qualifying stage.
         * If no stages filter is passed, all scores will be output.
         * If a stages filter is passed, only valid and relevant scores are
         * output.
         *
         * Resulting object is a per-stage array containing one item per team,
         * which lists the rank, team info, scores per round and highest score.
         *
         * @param  stageFilter Optional object stageId => nrOfRoundsOrTrue
         * @return Per-stage rankings
         */
        Scores.prototype.getRankings = function(stageFilter) {
            var self = this;

            // Create a pass-all filter if necessary
            if (!stageFilter) {
                stageFilter = {};
                $stages.stages.forEach(function (stage) {
                    stageFilter[stage.id] = true;
                });
            }

            // Ensure the number of rounds to use for each stage is a
            // number, and is not higher than the configured number of
            // rounds per stage.
            // And create empty lists for each stage
            var board = {};
            Object.keys(stageFilter).forEach(function (stage) {
                var s = stageFilter[stage];
                var maxRounds = typeof s === "number" && s || s && Infinity || 0;
                stageFilter[stage] = Math.min(maxRounds, $stages.get(stage).rounds);
                board[stage] = [];
            });

            // Create filtered scores (both user-supplied filter and errors).
            var filteredScores = this.scores.filter(function (s) {
                // Only include published scores
                if (!s.published) {
                    return false;
                }

                // Ignore completely invalid scores
                if (!self.isValidScore(s.score)) {
                    return false;
                }

                // Ignore score if filtered
                if (!stageFilter[s.stageId] || s.round > stageFilter[s.stageId]) {
                    return false;
                }

                return true;
            });

            // Convert all valid scores to a per-stage array of objects
            // per team (containing team and entries per round)
            filteredScores.forEach(function (s) {
                // Find existing entry for this team, or create one
                var bteam;
                var i;
                var bstage = board[s.stageId];
                for (i = 0; i < bstage.length; i++) {
                    if (bstage[i].teamNumber === s.teamNumber) {
                        bteam = bstage[i];
                        break;
                    }
                }
                if (!bteam) {
                    var maxRounds = stageFilter[s.stageId];
                    var initialScores = new Array(maxRounds);
                    var initialEntries = new Array(maxRounds);
                    for (i = 0; i < maxRounds; i++) {
                        initialScores[i] = null;
                        initialEntries[i] = null;
                    }
                    bteam = {
                        teamNumber: s.teamNumber,
                        scores: initialScores,
                        rank: null,
                        highest: null,
                        entries: initialEntries,
                    };
                    bstage.push(bteam);
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
                    result = (teamEntry1.teamNumber > teamEntry2.teamNumber) ? 1 : -1;
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

            // Convert team number into team object
            for (var stageId in board) {
                if (!board.hasOwnProperty(stageId)) {
                    continue;
                }
                var stage = board[stageId];
                stage.forEach(function (teamEntry) {
                    teamEntry.team = $teams.get(teamEntry.teamNumber);
                    delete teamEntry.teamNumber;
                });
            }

            return board;
        };

        return new Scores();
    }]);
});
