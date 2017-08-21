define('views/scoresheet',[
    'services/log',
    'services/fs',
    'services/ng-fs',
    'services/ng-challenge',
    'services/ng-scores',
    'services/ng-teams',
    'services/ng-stages',
    'services/ng-settings',
    'services/ng-handshake',
    'directives/sigpad',
    'directives/spinner',
    'controllers/DescriptionDialogController',
    'controllers/TeamDialogController',
    'controllers/RoundDialogController',
    'angular'
], function(log, fs) {
    var moduleName = 'scoresheet';
    var module = angular.module(moduleName, [
        'DescriptionDialog',
        'TeamDialog',
        'RoundDialog'
    ]);

    return module.controller(moduleName + 'Ctrl', [
        '$scope','$fs','$stages','$settings','$challenge','$window','$q','$teams','$handshake', '$scores',
        function($scope,$fs,$stages,$settings,$challenge,$window,$q,$teams,$handshake, $scores) {
            log('init scoresheet ctrl');

            // Set up defaults
            $scope.settings = {};
            $scope.missions = [];
            $scope.strings = [];
            $scope.table = null;
            $scope.referee = null;

            // add teams and stages to scope for selection
            $scope.teams = $teams.teams;
            $scope.stages = $stages.stages;
            $scope.scores = $scores.scores;

            $settings.init().then(function(res) {
                $scope.settings = res;
                return $scope.load();
            });

            function generateId() {
                var max = 0x100000000; // 8 digits
                // Add current time to prevent Math.random() generating the same
                // sequence if it's seeded with a constant. Not sure this is
                // really needed, but better safe than sorry...
                var num = (Math.floor(Math.random() * max) + Date.now()) % max;
                // Convert to nice hex representation with padded zeroes, then strip that initial 1.
                return (num + max).toString(16).slice(1);
            }

            $scope.load = function() {
                return $challenge.load($scope.settings.challenge).then(function(defs) {
                    $scope.field = defs.field;
                    $scope.missions = defs.missions;
                    $scope.strings = defs.strings;
                    $scope.objectiveIndex = defs.objectiveIndex;
                    angular.forEach($scope.missions,process);
                }).catch(function() {
                    //could not read field locally or remotely
                    $scope.errorMessage = 'Could not load field, please configure host in settings';
                    $window.alert($scope.errorMessage);
                });
            };

            $scope.getString = function(key) {
                return $scope.strings[key]||key;
            };

            function getObjectives(names) {
                return names.map(function(dep) {
                    return $scope.objectiveIndex[dep].value;
                });
            }

            function process(mission) {
                var deps = mission.score.reduce(function(all,score) {
                    return all.concat($challenge.getDependencies(score));
                },[]);
                mission.errors = [];
                mission.percentages = [];
                mission.completed = false;
                //addd watcher for all dependencies
                $scope.$watch(function() {
                    return deps.map(function(dep) {
                        return $scope.objectiveIndex[dep].value;
                    }).join('|');
                },function(newValue) {
                    mission.errors = [];
                    mission.percentages = [];
                    mission.completedObjectives = [];
                    mission.result = mission.score.reduce(function(total,score,i) {
                        var deps = $challenge.getDependencies(score);
                        var vars = getObjectives(deps);
                        var res = score.apply(null,vars);
                        mission.completedObjectives[i] = (res !== undefined);
                        if (res instanceof Error) {
                            mission.errors.push(res);
                            //do not count this bit
                            return total;
                        }
                        //check for fraction. TODO: work with Percentage object
                        if (typeof res === 'number' && (res % 1) !== 0) {
                            mission.percentages.push(res);
                            //do not count
                            return total;
                        }
                        return total + (res||0);
                    },0);
                    mission.completed = mission.completedObjectives.every(function(objectCompleted) {
                        return objectCompleted;
                    });
                });

            }

            $scope.score = function() {
                if (!$scope.missions) {return;}
                //step 1: sum all scores from missions without percentages
                var subScore = $scope.missions.filter(function(m) {
                    return m.percentages.length === 0;
                }).reduce(function(total,m) {
                    return total + m.result;
                },0);
                //step 2: sum all percentages
                var bonus = $scope.missions.filter(function(m) {
                    return m.percentages.length !== 0;
                }).reduce(function(total,m) {
                    //sum of mission percentages
                    return total + m.percentages.reduce(function(total,perc) {
                        return total + perc;
                    },0);
                },1);   //add 1 for multiplication later on
                //step 3: apply percentages
                var bonusScore = Math.ceil(subScore * bonus);
                //step 4: add points from missions with percentages
                var restScore = $scope.missions.filter(function(m) {
                    return m.percentages.length !== 0;
                }).reduce(function(total,m) {
                    return total + m.result;
                },0);

                return bonusScore + restScore;
            };

            function empty(val) {
                return val === undefined || val === null;
            }

            //lists reasons why the scoresheet cannot be saved
            $scope.preventSaveErrors = function() {
                var list = $scope.teamRoundErrors();
                if (!$scope.missions) {return [];}

                function errors() {
                    return $scope.missions.some(function(mission) {
                        return !!mission.errors.length;
                    });
                }
                function inComplete() {
                    return $scope.missions.some(function(mission) {
                        return mission.objectives.some(function(objective) {
                            return empty(objective.value);
                        });
                    });
                }

                if (errors()) {
                    list.push('Some missions have errors');
                }
                if (inComplete()) {
                    list.push('Some missions are incomplete');
                }

                return list;
            };

            $scope.teamRoundErrors = function() {
                var list = [];
                if (empty($scope.stage)) {
                    list.push('No stage selected');
                }
                if (empty($scope.round)) {
                    list.push('No round selected');
                }
                if (empty($scope.team)) {
                    list.push('No team selected');
                }
                if ($scope.settings.askTable && !$scope.table) {
                    list.push('No table number entered');
                }
                if ($scope.settings.askReferee && !$scope.referee) {
                    list.push('No referee entered');
                }

                return list;
            };

            $scope.teamRoundOk = function() {
                return !$scope.teamRoundErrors().length;
            }

            $scope.isSaveable = function() {
                if (!$scope.missions) {return false;}

                return !$scope.preventSaveErrors().length;
            };

            $scope.clear = function() {
                $scope.editedScore = null;
                $scope.uniqueId = generateId();
                $scope.signature = null;
                $scope.team = null;
                $scope.stage = null;
                $scope.round = null;
                $scope.missions.forEach(function(mission) {
                    mission.objectives.forEach(function(objective) {
                        delete objective["value"];
                    });
                });
                log('scoresheet cleared');
            };

            //wraps the __save function- if we were editing a scoresheet, it will delete the old one before saving normally
            $scope.saveEdit = function () {
                $scores.remove($scope.scores.findIndex(function (s) { return s === $scope.editedScore }));
                return $scores.save().then($scope.save());
            };

            //saves mission scoresheet
            $scope.save = function() {
                if (!$scope.team || !$scope.stage || !$scope.round) {
                    $window.alert('no team selected, do so first');
                    return $q.reject(new Error('no team selected, do so first'));
                }

                var data = angular.copy($scope.field);
                data.uniqueId = $scope.uniqueId;
                data.team = $scope.team;
                data.stage = $scope.stage;
                data.round = $scope.round;
                // data.table = $scope.settings.table;
                data.table = $scope.table;
                data.referee = $scope.referee;
                data.signature = $scope.signature;
                data.score = $scope.score();

                var fn = [
                    'score',
                    data.stage.id,
                    'round' + data.round,
                    'table' + data.table,
                    'team' + data.team.number,
                    data.uniqueId
                ].join('_')+'.json';

                return $fs.write("scoresheets/" + fn,data).then(function() {
                    log('result saved');
                    $scope.clear();
                    $window.alert('Thanks for submitting a score of ' +
                        data.score +
                        ' points for team (' + data.team.number + ') ' + data.team.name +
                        ' in ' + data.stage.name + ' ' + data.round + '.'
                    );
                }, function(err) {
                    $window.alert('Error submitting score: ' + String(err));
                    throw err;
                });
            };

            $scope.openDescriptionModal = function (mission) {
                $handshake.$emit('showDescription',mission);
            };

            $scope.openTeamModal = function (teams) {
                $handshake.$emit('chooseTeam',teams).then(function(result) {
                    if (result) {
                        $scope.team = result.team;
                    }
                });
            };

            $scope.openRoundModal = function (stages) {
                $handshake.$emit('chooseRound',stages).then(function(result) {
                    if (result) {
                        $scope.stage = result.stage;
                        $scope.round = result.round;
                    }
                });
            };

            $scope.loadScoresheet = function (score) {
                log(format("Editing scoresheet: stage {0}, round {1}, team {2}, score {3}", score.stageId, score.round, score.teamNumber, score.score));
                $scope.editedScore = score;
                $scores.loadScoresheet(score).then(function (result) {
                    $scope.missions.forEach(function (mission) {
                        var filledMission = result.missions.find(function (e) {return e.title === mission.title});
                        mission.objectives.forEach(function (objective, index) {
                            objective["value"] = filledMission.objectives[index]["value"];
                        });
                    });
                    $scope.uniqueId = generateId();
                    $scope.signature = result.signature;
                    $scope.team = result.team;
                    $scope.stage = result.stage;
                    $scope.round = result.round;
                    $scope.table = result.table;
                    $scope.referee = result.referee;
                });
            };

            $scope.$on("editScoresheet", function (e, score) {
                $scope.loadScoresheet(score);
            });

            // Initialize empty scoresheet (mostly uniqueId)
            $scope.clear();
        }
    ]);
});

function format(/* fmt, args... */) {
    var args = Array.prototype.slice.call(arguments);
    var fmt = args.shift();
    return fmt.replace(/{(\d+)}/g, function (match, number) {
        return args[number] !== undefined  ? args[number] : match;
    });
}
