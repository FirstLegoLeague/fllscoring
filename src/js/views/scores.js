define([
    'services/log',
    'services/fs',
    'services/ng-fs',
    'services/ng-results',
    'directives/sigpad',
    'directives/spinner',
    'angular'
], function(log, fs) {
    var moduleName = 'scores';

    var field = {
        "title":"Senior Solutions",
        "missions":{
            "general":{
                "title":"Team",
                "objectives": {
                    "teamColor": {
                        "title": ["Red team","Blue team"],
                        "type": "Enum"
                    },
                },
                "score":function(teamColor) {
                    return ["Red","Blue"][teamColor];
                }
            },
            "bowling":{
                "title":"Bowling",
                "objectives": {
                    "pinsDown": {
                        "title":"Number of pins down",
                        "max":6,
                        "type":"Number"
                    }
                },
                "score":function(pinsDown) {
                    return [0,7,14,21,28,35,60][pinsDown];
                }
            },
            "strength":{
                "title":"Strength Exercise",
                "objectives": {
                    "weightPosition": {
                        "title": ["Weight height at the red maker","Weight height above red maker","Weight elsewhere"],
                        "type": "Enum"
                    },
                },
                "score":function(weightPosition) {
                    return [15,25,0][weightPosition];
                }
            },
            "quilting":{
                "title":"Quiting",
                "objectives": {
                    "blueQuilts":{
                        "title":"Blue quilt square touching their black target regions",
                        "max":2,
                        "type":"Number"
                    },
                    "orangeQuilts":{
                        "title":"Orange quilt square touching their black target regions",
                        "max":2,
                        "type":"Number"
                    }
                },
                "score":function(blueQuilts,orangeQuilts) {
                    return blueQuilts*15 + orangeQuilts*30;
                }
            },
            "woodworking":{
                "title":"Wood Working",
                "objectives": {
                    "chairPosition": {
                        "title": ["Chair fixed in base","Chair fixed and any part under table","Chair elsewhere"],
                        "type": "Enum"
                    },
                },
                "score":function(chairPosition) {
                    return [15,25,0][chairPosition];
                }
            },
            "medicine":{
                "title":"Medicine",
                "objectives": {
                    "orangeBottleMoved":{
                        "title":"Orange bottle moved or outside lines",
                        "type":"Boolean"
                    },
                    "greenBottleInBase":{
                        "title":"Green bottle in base",
                        "type":"Boolean"
                    }
                },
                "score":function(orangeBottleMoved,greenBottleInBase) {
                    return 25*(!orangeBottleMoved && greenBottleInBase);
                }
            },
            "animals":{
                "title":"Service Animals",
                "objectives": {
                    "dogInBase":{
                        "title":"Dog is in base",
                        "type":"Boolean"
                    }
                },
                "score":function(dogInBase) {
                    return dogInBase * 20;
                }
            },
            "stove":{
                "title":"Stove",
                "objectives":{
                    "allBurnersBlack":{
                        "title":"All 4 burners black",
                        "type":"Boolean"
                    }
                },
                "score":function(allBurnersBlack) {
                    return allBurnersBlack * 25;
                }
            },
            "gardening":{
                "title":"Gardening",
                "objectives":{
                    "plantTouchingWhite":{
                        "title":"Plant's base touching a white target area",
                        "type":"Boolean"
                    }
                },
                "score":function(plantTouchingWhite) {
                    return plantTouchingWhite * 25;
                }
            },
            "videocall":{
                "title":"Video call",
                "objectives":{
                    "flagsUp":{
                        "title":"Flags all the way up",
                        "type":"Number",
                        "max":2
                    }
                },
                "score":function(flagsUp) {
                    return flagsUp * 20;
                }
            },
            "flexibility":{
                "title":"Flexibility",
                "objectives":{
                    "yellowLoopsInBase":{
                        "title":"Yellow loops in Base",
                        "type":"Number",
                        "max":2
                    }
                },
                "score":function(yellowLoopsInBase) {
                    return yellowLoopsInBase * 20;
                }
            },
            "transitions":{
                "title":"Transitions",
                "objectives":{
                    "robotPosition": {
                        "title": ["Robot touching tilted center platform only","Robot touching balanced center platform only","Robot elsewhere"],
                        "type": "Enum"
                    },
                },
                "score":function(robotPosition) {
                    return [45,65,0][robotPosition];
                }
            },
            "ballGame":{
                "title":"Ball game",
                "objectives":{
                    "centerColor": {
                        "title": ["Red ball in center position","Blue ball in center position","Yellow ball in center position"],
                        "type": "Enum"
                    },
                    "blueOnRack":{
                        "title":"Blue balls on rack",
                        "type":"Number",
                        "max":3
                    },
                    "redOnRack":{
                        "title":"Red balls on rack",
                        "type":"Number",
                        "max":3
                    }
                },
                "score":function(centerColor, teamColor, blueOnRack, redOnRack) {
                    var yellowCenter = centerColor===2;
                    return (centerColor === teamColor) * 60 +
                        (yellowCenter * 10) +
                        (blueOnRack * 10) +
                        (redOnRack * 10);
                }
            },
            "cooperation":{
                "title":"Similarity recognition and cooperation",
                "objectives":{
                    "pointersParallel":{
                        "title":"Pointers parallel",
                        "type":"Boolean"
                    }
                },
                "score":function(pointersParallel) {
                    return pointersParallel * 45;
                }
            },
            "cardio":{
                "title":"Cardiovascular exercise",
                "objectives":{
                    "dialBig":{
                        "title":"Big dial",
                        "type":"Number",
                        "min":1,
                        "max":9
                    },
                    "dialSmall":{
                        "title":"Small dial",
                        "type":"Number",
                        "max":5
                    }
                },
                "expectations": [
                    function(dialBig, dialSmall) {
                        if (dialBig===9) {
                            return !dialSmall;
                        }
                        return true;
                    }
                ],
                "score":function(dialBig, dialSmall) {
                    if (dialBig === 1 && dialSmall === 0) {return -60;}
                    if (dialBig === 1 && dialSmall === 1) {return -55;}
                    if (dialBig === 1 && dialSmall === 2) {return -50;}
                    if (dialBig === 1 && dialSmall === 3) {return -45;}
                    if (dialBig === 1 && dialSmall === 4) {return -40;}
                    if (dialBig === 1 && dialSmall === 5) {return -35;}
                    if (dialBig === 2 && dialSmall === 0) {return -30;}
                    if (dialBig === 2 && dialSmall === 1) {return -25;}
                    if (dialBig === 2 && dialSmall === 2) {return -20;}
                    if (dialBig === 2 && dialSmall === 3) {return -15;}
                    if (dialBig === 2 && dialSmall === 4) {return -10;}
                    if (dialBig === 2 && dialSmall === 5) {return -5;}
                    if (dialBig === 3 && dialSmall === 0) {return 0;}
                    if (dialBig === 3 && dialSmall === 1) {return 5;}
                    if (dialBig === 3 && dialSmall === 2) {return 10;}
                    if (dialBig === 3 && dialSmall === 3) {return 15;}
                    if (dialBig === 3 && dialSmall === 4) {return 20;}
                    if (dialBig === 3 && dialSmall === 5) {return 25;}
                    if (dialBig === 4 && dialSmall === 0) {return 30;}
                    if (dialBig === 4 && dialSmall === 1) {return 35;}
                    if (dialBig === 4 && dialSmall === 2) {return 40;}
                    if (dialBig === 4 && dialSmall === 3) {return 45;}
                    if (dialBig === 4 && dialSmall === 4) {return 50;}
                    if (dialBig === 4 && dialSmall === 5) {return 55;}
                    if (dialBig === 5 && dialSmall === 0) {return 60;}
                    if (dialBig === 5 && dialSmall === 1) {return 63;}
                    if (dialBig === 5 && dialSmall === 2) {return 66;}
                    if (dialBig === 5 && dialSmall === 3) {return 69;}
                    if (dialBig === 5 && dialSmall === 4) {return 72;}
                    if (dialBig === 5 && dialSmall === 5) {return 75;}
                    if (dialBig === 6 && dialSmall === 0) {return 78;}
                    if (dialBig === 6 && dialSmall === 1) {return 91;}
                    if (dialBig === 6 && dialSmall === 2) {return 94;}
                    if (dialBig === 6 && dialSmall === 3) {return 97;}
                    if (dialBig === 6 && dialSmall === 4) {return 100;}
                    if (dialBig === 6 && dialSmall === 5) {return 103;}
                    if (dialBig === 7 && dialSmall === 0) {return 106;}
                    if (dialBig === 7 && dialSmall === 1) {return 107;}
                    if (dialBig === 7 && dialSmall === 2) {return 108;}
                    if (dialBig === 7 && dialSmall === 3) {return 109;}
                    if (dialBig === 7 && dialSmall === 4) {return 110;}
                    if (dialBig === 7 && dialSmall === 5) {return 111;}
                    if (dialBig === 8 && dialSmall === 0) {return 112;}
                    if (dialBig === 8 && dialSmall === 1) {return 113;}
                    if (dialBig === 8 && dialSmall === 2) {return 114;}
                    if (dialBig === 8 && dialSmall === 3) {return 115;}
                    if (dialBig === 8 && dialSmall === 4) {return 116;}
                    if (dialBig === 8 && dialSmall === 5) {return 117;}
                    if (dialBig === 9 && dialSmall === 0) {return 118;}
                }
            }
        }
    };

    return angular.module(moduleName, []).controller(moduleName + 'Ctrl', [
        '$scope','$fs','$results','$modal',
        function($scope,$fs,$results,$modal) {
            log('init scores ctrl');

            $fs.read('settings.json').then(function(res) {
                $scope.settings = res;
                load();
            },function() {
                log('unable to load settings');
                $scope.settings = {};
                load();
            });

            function load() {
                //use non-angular fs to load plain javascript instead of json
                    // var field = field2;
                fs.read($scope.settings.challenge).then(function(defs) {
                    init(eval('('+defs+')'));
                }).fail(function() {
                    log('error getting field');
                    init(field);
                }).then(function() {
                    $scope.$apply();
                }).done();
            }

            function init(field) {
                $scope.field = field;
                $scope.missionIndex = field.missions;
                $scope.missions = transpose(field.missions);
                $scope.objectiveIndex = indexObjectives(field.missions);
                angular.forEach($scope.missions,process);
            }

            //team color
            // $scope.teamColor = function() {
            //     return $scope.missionIndex['general'].result;
            // };


            function getDependencies(fn) {
                var deps = fn.toString().match(/^function\s*\((.*?)\)/)[1];
                return deps?deps.split(/\s*,\s*/):[];
            }
            function getObjectives(names) {
                return names.map(function(dep) {
                    var val = $scope.objectiveIndex[dep].value;
                    if (val===undefined || val===null) {return 0;}
                    return 1*($scope.objectiveIndex[dep].value||0);
                });
            }
            // function inject(fn) {
            //     var vars = getDependencies(fn);
            //     return function() {
            //         return fn.apply(null,vars);
            //     };
            // }
            function getMission(name) {
                return $scope.missionIndex[name];
            }

            function transpose(obj) {
                return Object.keys(obj).map(function(key) {
                    var o = obj[key];
                    o._key = key;
                    if (o.objectives) {
                        o.objectiveList = transpose(o.objectives);
                    }
                    return o;
                });
            }

            function indexObjectives(missions) {
                objs = {};
                angular.forEach(missions,function(mission) {
                    angular.forEach(mission.objectives,function(obj,key) {
                        objs[key] = obj;
                    });
                });
                return objs;
            }

            function getErrorFunc(mission) {
                var expectations = (mission.expectations||[function(){return true;}]).map(function(e) {
                    return {
                        deps: getDependencies(e),
                        fn: e
                    };
                });
                return function() {
                    return !expectations.every(function(exp) {
                        var vars = getObjectives(exp.deps);
                        return exp.fn.apply(null,vars);
                    });
                };
            }

            function process(mission) {
                var key = mission._key;
                var deps = getDependencies(mission.score);
                var getError = getErrorFunc(mission);
                mission.result = 0;
                //addd watcher for all dependencies
                $scope.$watch(function() {
                    return deps.map(function(dep) {
                        return $scope.objectiveIndex[dep].value;
                    }).join('|');
                },function(newValue) {
                    //check expectations
                    mission.error = getError();
                    if (mission.error) {return;}

                    //calculate the result for the mission
                    vars = getObjectives(deps);
                    mission.result = mission.score.apply(null,vars)||0;
                });

            }

            $scope.inc = function(objective,amount) {
                objective.value = Math.min(objective.max||Number.Infinity,(objective.value||0)+(amount||1));
            };
            $scope.dec = function(objective,amount) {
                objective.value = Math.max(objective.min||0,(objective.value||0)-(amount||1));
            };

            $scope.score = function() {
                if (!$scope.missions) {return;}
                return $scope.missions.reduce(function(prev,mission) {
                    return prev+(parseInt(mission.result,10)||0);
                },0);
            };

            $scope.showTeams = function() {
                $scope.setPage('teams');
            };

            $scope.selectTeam = function(team) {
                $scope.team = team;
            };

            $scope.$root.$on('selectTeam',function(e,team) {
                $scope.selectTeam(team);
            });

            //saves mission scoresheet
            //take into account a key: https://github.com/FirstLegoLeague/fllscoring/issues/5#issuecomment-26030045
            $scope.save = function() {
                if (!$scope.team) {
                    alert('no team selected, do so first');
                    return;
                }
                //todo:
                var fn = [
                    'result',
                    $scope.settings.table,
                    $scope.team.number,
                    +(new Date())
                ].join('_')+'.json';

                var data = angular.copy($scope.field);
                data.team = $scope.team;
                data.table = $scope.settings.table;
                data.signature = $scope.signature;


                return $fs.write(fn,data).then(function() {
                    return $results.add({
                        file: fn,
                        team: $scope.team,
                        score: $scope.score()
                    });
                }).then(function() {
                    log('result saved');
                },function() {
                    log('unable to write result');
                });
            };

            $scope.open = function (size) {

                var modalInstance = $modal.open({
                  templateUrl: 'myModalContent.html',
                  controller: 'ModalInstanceCtrl',
                  size: size,
                  resolve: {
                    items: function () {
                      return ['item1', 'item2', 'item3'];
                    }
                  }
                });

                modalInstance.result.then(function (selectedItem) {
                  $scope.selected = selectedItem;
                }, function () {
                  $log.info('Modal dismissed at: ' + new Date());
                });
              };

        }
    ]).controller('ModalInstanceCtrl',[
        '$scope', '$modalInstance', 'items',
        function ($scope, $modalInstance, items) {

          $scope.items = items;
          $scope.selected = {
            item: $scope.items[0]
          };

          $scope.ok = function () {
            $modalInstance.close($scope.selected.item);
          };

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };
        }
    ]);
});
