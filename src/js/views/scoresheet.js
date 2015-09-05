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
        '$scope','$fs','$stages','$settings','$challenge','$window','$q','$teams','$handshake',
        function($scope,$fs,$stages,$settings,$challenge,$window,$q,$teams,$handshake) {
            log('init scoresheet ctrl');

            // Set up defaults
            $scope.settings = {};
            $scope.missions = [];
            $scope.strings = [];

            // add teams and stages to scope for selection
            $scope.teams = $teams.teams;
            $scope.stages = $stages.stages;


            $settings.init().then(function(res) {
                $scope.settings = res;
                return $scope.load();
            });

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
                //addd watcher for all dependencies
                $scope.$watch(function() {
                    return deps.map(function(dep) {
                        return $scope.objectiveIndex[dep].value;
                    }).join('|');
                },function(newValue) {
                    mission.errors = [];
                    mission.percentages = [];
                    mission.result = mission.score.reduce(function(total,score) {
                        var deps = $challenge.getDependencies(score);
                        var vars = getObjectives(deps);
                        var res = score.apply(null,vars);
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

            //lists reasons why the scoresheet cannot be saved
            $scope.preventSaveErrors = function() {
                var list = [];
                if (!$scope.missions) {return list;}

                function empty(val) {
                    return val === undefined || val === null;
                }
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

                if (empty($scope.stage)) {
                    list.push('No stage selected');
                }
                if (empty($scope.round)) {
                    list.push('No round selected');
                }
                if (empty($scope.team)) {
                    list.push('No team selected');
                }
                if (errors()) {
                    list.push('Some missions have errors');
                }
                if (inComplete()) {
                    list.push('Some missions are incomplete');
                }
                if (!$scope.table) {
                    list.push('No table number entered');
                }

                return list;
            };

            $scope.isSaveable = function() {
                if (!$scope.missions) {return false;}

                return !$scope.preventSaveErrors().length;
            };

            $scope.discard = function() {
                $scope.signature = null;
                $scope.team = null;
                $scope.stage = null;
                $scope.round = null;
                $scope.table = null;
                $scope.missions.forEach(function(mission) {
                    mission.objectives.forEach(function(objective) {
                        delete objective["value"];
                    });
                });
                console.log('discard');
            };

            //saves mission scoresheet
            //take into account a key: https://github.com/FirstLegoLeague/fllscoring/issues/5#issuecomment-26030045
            $scope.save = function() {
                if (!$scope.team || !$scope.stage || !$scope.round) {
                    $window.alert('no team selected, do so first');
                    return $q.reject(new Error('no team selected, do so first'));
                }
                //todo:
                var fn = [
                    'score',
                    $scope.settings.table,
                    $scope.team.number,
                    +(new $window.Date())
                ].join('_')+'.json';

                var data = angular.copy($scope.field);
                data.team = $scope.team;
                data.stage = $scope.stage;
                data.round = $scope.round;
                // data.table = $scope.settings.table;
                data.table = $scope.table;
                data.signature = $scope.signature;
                data.score = $scope.score();

                return $fs.write("scoresheets/" + fn,data).then(function() {
                    log('result saved');
                    $scope.discard();
                    $window.alert('Thanks for submitting a score of ' +
                        data.score +
                        ' points for team (' + data.team.number + ') ' + data.team.name +
                        ' in ' + data.stage.name + ' ' + data.round + '.'
                    );
                },function() {
                    $window.alert('unable to write result');
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

        }
    ]);
});
