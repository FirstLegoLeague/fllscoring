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
    'services/ng-settings',
    'services/ng-validation',
    'services/ng-score'
],function(module,log) {
    "use strict";

    // Current file version for scores.
    // Increment when adding/removing 'features' to stored scores.
    var SCORES_VERSION = 3;

    return module.service('$scores',
        ['$rootScope', '$fs', '$stages', '$message', '$teams','$independence', '$rankings', '$validation', '$score', '$settings',
        function($rootScope, $fs, $stages, $message, $teams, $independence, $rankings, $validation, $score, $settings) {

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

            // Watching for changes in currentStage
            $rootScope.$watch(() => $settings.settings.currentStage, function (newValue, oldValue, scope){
                if($settings.settings.currentStage) {
                    self.broadcastRanking($stages.get($settings.settings.currentStage));
                }
            },true);

            this._updating = 0;
            this._initialized = null; // Promise<void>
            this.init();

            $message.on('scores:reload',function(data, msg) {
                if(!msg.fromMe)
                    self.load();
            });
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
            this.scores = [];
            this._update();
        };

        function removeEmptyRanks(scoreboard) {
            let result = {};
            for (let stageId in scoreboard) {
                let stage = scoreboard[stageId];
                result[stageId] = stage.filter(rank => rank.scores.filter(score => score !== undefined).length);
            }
            return result;
        }

        Scores.prototype.broadcastRanking = function (stage) {
            var self = this;
            var ignoreNegativeScores = $settings.settings.ignoreNegativeScores;

            self.getRankings().then(function () {
                var rankingMessage = {
                    stage: {
                        id: stage.id,
                        name: stage.name,
                        rounds: stage.rounds,
                    },
                    ranking: removeEmptyRanks(self.scoreboard)[stage.id].map(function (item) {
                        if(ignoreNegativeScores) {
                            var scores = item.scores.map(score => score ? Math.max(score.score, 0) : undefined);
                            var highest = Math.max(item.highest.score, 0);
                        } else {
                            var scores = item.scores.map(score => score ? score.score : undefined);
                            var highest = item.highest.score;
                        }

                        return {
                            rank: item.rank, // Note: there can be multiple rows with same (shared) rank!
                            team: {
                                number: item.team.number,
                                name: item.team.name,
                            },
                            scores: scores,
                            highest: highest
                        };
                    }),
                };
                $message.send('scores:ranking', rankingMessage);
            });

        };

        Scores.prototype.load = function(data) {
            var self = this;
            var processScores = function(res) {
                self.beginupdate();
                try {
                    // Determine scores file version
                    // And throw an exception if it is not supported
                    var version = res.version || 1;
                    if (version !== SCORES_VERSION) {
                        throw new Error(`unsupported scores version ${version}, (expected ${SCORES_VERSION})`);
                    }

                    self.scores = res.scores.map(score => new $score(score));
                    log("scores loaded, version " + version);
                } finally {
                    self.endupdate();
                }
            };

            if(data) {
                return processScores(data);
            } else {
                return $fs.read('scores.json').then(processScores, function(err) {
                    log('scores read error', err);
                });
            }
        };

        Scores.prototype.loadScoresheet = function (score) {
            return $fs.read("scoresheets/"+score.file)
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

        Scores.prototype.acceptScores = function(res, tryAutoBroadcast) {
            var self = this;
            if(res) {
                self.load(res.data);
            }

            var stageID = $settings.settings.currentStage;
            if ($settings.settings.currentStage && stageID && tryAutoBroadcast) {
                log('auto-broadcasting stage ' + stageID);
                self.broadcastRanking($stages.get(stageID));
            }
            $message.send('scores:reload');

            if(res) {
                return res;
            } else {
                throw new Error('No response');
            }
        }

        Scores.prototype.create = function(scoresheet, score) {
            var self = this;

            return $independence.act('/scores/create',{ scoresheet: scoresheet, score: score }, function() {
                self.scores.push(score);
            })
            .then((res) => self.acceptScores(res, score.published));
        };

        Scores.prototype.delete = function(score) {
            var self = this;
            return $independence.act('/scores/delete/' + score.id, {}, function() {
                self.scores.splice(self.scores.findIndex(s => s.id === score.id), 1);
            }).then((res) => self.acceptScores(res, score.published));
        };

        Scores.prototype.update = function(score, forceAutoPublish) {
            score.edited = (new Date()).toString();
            var self = this;
            return $independence.act('/scores/update/' + score.id, score, function() {
                self.scores[self.scores.findIndex(s => s.id === score.id)] = score;
            }).then((res) => self.acceptScores(res, forceAutoPublish || score.published));
        };

        Scores.prototype.getRankings = function(filter) {
            this.validationErrors = $validation.validate(this.scores);

            var self = this;
            if(this.validationErrors.length === 0) {
                self.scores.forEach((score)=>{score.error = null});
                return $rankings.calculate(this.scores, filter).then(function(scoreboard) {
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
