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
        '$scope','$fs','$stages','$scores','$score','$settings','$challenge','$window','$q','$teams','$handshake',
        function($scope,$fs,$stages,$scores,$score,$settings,$challenge,$window,$q,$teams,$handshake) {
            log('init scoresheet ctrl');

            // Set up defaults
            $scope.settings = {};
            $scope.missions = [];
            $scope.strings = [];
            $scope.referee = null;

            // add teams and stages to scope for selection
            $scope.teams = $teams.teams;
            $scope.stages = $stages.stages;

            $scope.load = function() {
                return $settings.init()
                .then(function(res) {
                    $scope.settings = res;
                    return $challenge.load($scope.settings.challenge);
                })
                .then(function(defs) {
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

            $scope.load();

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
                //add watcher for all dependencies
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
                if (empty($scope.scoreEntry.stage)) {
                    list.push('No stage selected');
                }
                if (empty($scope.scoreEntry.round)) {
                    list.push('No round selected');
                }
                if (empty($scope.scoreEntry.team)) {
                    list.push('No team selected');
                }
                if ($scope.settings.askTable && !$scope.scoreEntry.table) {
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
                var table = $scope.scoreEntry ? $scope.scoreEntry.table : undefined;
                $scope.scoreEntry = new $score({ table: table });
                $scope.signature = null;
                $scope.missions.forEach(function(mission) {
                    mission.objectives.forEach(function(objective) {
                        delete objective["value"];
                    });
                });
                log('scoresheet cleared');
            };

            //saves mission scoresheet
            $scope.save = function() {
                if (!$scope.scoreEntry.team || !$scope.scoreEntry.stage || !$scope.scoreEntry.round) {
                    $window.alert('no team selected, do so first');
                    return $q.reject(new Error('no team selected, do so first'));
                }

                var data = angular.copy($scope.field);
                data.scoreEntry = new $score($scope.scoreEntry);
                data.team = $scope.scoreEntry.team;
                data.stage = $scope.scoreEntry.stage;
                data.round = $scope.scoreEntry.round;
                data.table = $scope.scoreEntry.table;
                data.referee = $scope.referee;
                data.signature = $scope.signature;
                data.scoreEntry.score = $scope.score();
                data.scoreEntry.calcFilename();

                return $scores.create(data).then(function() {
                    log('result saved: ');
                    $scope.clear();
                    message = `Thanks for submitting a score of ${data.score} points for team (${data.team.number})` +
                        ` ${data.team.name} in ${data.stage.name} ${data.round}.`;
                    $window.alert(message);
                }).catch(function(err) {
                    log(`Error: ${err}`);
                    $scope.clear();
                    message = `Thanks for submitting a score of ${data.score} points for team (${data.team.number})` +
                        ` ${data.team.name} in ${data.stage.name} ${data.round}.` + `
Notice: the score could not be sent to the server. ` +
                            `This might be caused by poor network conditions. ` +
                            `The score is thereafore save on your device, and will be sent when it's possible.` +
                            `Current number of scores actions waiting to be sent: ${$scores.pendingActions()}`
                    $window.alert(message);
                    throw err;
                });
            };

            $scope.openDescriptionModal = function (mission) {
                $handshake.$emit('showDescription',mission);
            };

            $scope.openTeamModal = function (teams) {
                $handshake.$emit('chooseTeam',teams).then(function(result) {
                    if (result) {
                        $scope.scoreEntry.team = result.team;
                    }
                });
            };

            $scope.openRoundModal = function (stages) {
                $handshake.$emit('chooseRound',stages).then(function(result) {
                    if (result) {
                        $scope.scoreEntry.stage = result.stage;
                        $scope.scoreEntry.round = result.round;
                    }
                });
            };

            // Initialize empty scoresheet (mostly uniqueId)
            $scope.clear();
        }
    ]);
});
