/**
 * Service handling all access to scores, including scoreboard
 * and ranking computation.
 */
define('services/ng-scores',[
    'services/ng-services',
    'services/log',
    'services/ng-fs',
    'services/ng-stages',
    'services/ng-teams',
    'services/ng-independence',
    'services/ng-rankings',
    'services/ng-validation',
    'services/ng-score'
],function(module,log) {
    "use strict";

    // Current file version for scores.
    // Increment when adding/removing 'features' to stored scores.
    var SCORES_VERSION = 2;

    return module.service('$scores',
        ['$rootScope', '$fs', '$stages', '$q', '$teams', '$http', '$independence', '$rankings', '$validation', '$score',
        function($rootScope, $fs, $stages, $q, $teams, $http, $independence, $rankings, $validation, $score) {

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

            this._updating = 0;
            this._initialized = null; // Promise<void>
            this.init();
        }

        /**
         * Initialize service, if not initialized already.
         * @returns Promise<void> that is resolved when init is complete.
         */
        Scores.prototype.init = function() {
            if(!this._initialized) {
                var self = this;
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
                    self.scores = scores.map(score => new $score(score));
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
            this.getRankings().then(function() {
                $rootScope.$broadcast('validationError', self.validationErrors);
            });
        };

        Scores.prototype.create = function(scoresheet) {
            var self = this;
            var score = scoresheet.scoreEntry;
            delete scoresheet.scoreEntry;
            return new Promise(function(resolve, reject) {
                $http.post('/scores/create', { scoresheet: scoresheet, score: score }).then(function(res) {
                    self.load(res.data);
                    $independence.sendSavedActionsToServer();
                    resolve();
                }, function() {
                    $independence.actAheadOfServer({
                        type: 'create',
                        params: [scoresheet]
                    });
                    scores.scores.push(score);
                    reject();
                });
            });
        };

        Scores.prototype.delete = function(score) {
            var self = this;
            return $http.post('/scores/delete/' + score.id).then(function(res) {
                self.load(res.data);
                $independence.sendSavedActionsToServer();
            }, function() {
                $independence.actAheadOfServer({
                    type: 'delete',
                    params: [score]
                });
                self.scores.splice(self.socres.findIndex(s => s.id === score.id), 1);
            });
        };

        Scores.prototype.update = function(score) {
            score.edited = (new Date()).toString();
            var self = this;
            return $http.post('/scores/update/' + score.id, score).then(function(res) {
                self.load(res.data);
                $independence.sendSavedActionsToServer();
            }, function(){
                $independence.actAheadOfServer({
                    type: 'update',
                    params: [score]
                });
                let index = self.socres.findIndex(s => s.id === score.id);
                self.scores[index] = score;
            });
        };

        Scores.prototype.getRankings = function() {
            this.validationErrors = $validation.validate(this.scores);

            var self = this;
            if(this.validationErrors.length === 0) {
                return $rankings.calculate(this.scores).then(function(scoreboard) {
                    self.scoreboard = scoreboard;
                    return scoreboard;
                });
            } else {
                return new Promise(function(resolve) {
                    resolve(self.scoreboard);
                });
            }
        };

        Scores.prototype.pendingActions = function() {
            return $independence.pendingActions();
        };

        return new Scores();
    }]);
});
