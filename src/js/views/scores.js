define([
    'services/log',
    'services/fs',
    'angular'
], function(log, fs) {
    var moduleName = 'scores';

    var field = {
        "title":"Senior Solutions",
        "missions":{
            "general":{
                "title":"Team",
                "objectives": {
                    "blueTeam": {
                        "title":"blue",
                        "type": "Boolean"
                    },
                    "redTeam": {
                        "title":"red",
                        "type": "Boolean"
                    }
                },
                "score":function(blueTeam, redTeam) {
                    return blueTeam?'blue':'red';
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
                    switch (pinsDown) {
                        case 0: return 0;
                        case 1: return 7;
                        case 2: return 14;
                        case 3: return 21;
                        case 4: return 28;
                        case 5: return 35;
                        case 6: return 60;
                    }
                }
            },
            "strength":{
                "title":"Strength Exercise",
                "objectives": {
                    "weightAtRedMaker": {
                        "title":"Weight height at the red maker",
                        "type":"Boolean"
                    },
                    "weightAboveRedMaker": {
                        "title":"Weight height above red maker",
                        "type":"Boolean"
                    }
                },
                "score":function(weightAtRedMaker,  weightAboveRedMaker) {
                    return weightAtRedMaker*15 + weightAboveRedMaker*25;
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
                    "chairFixedInBase":{
                        "title":"Chair fixed in base",
                        "type":"Boolean"
                    },
                    "chairFixedUnderTable":{
                        "title":"Chair fixed and any part under table",
                        "type":"Boolean"
                    }
                },
                "score":function(chairFixedInBase,chairFixedUnderTable) {
                    return chairFixedInBase*15 + chairFixedUnderTable*25;
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
                    "robotTouchingTiltedPlatform":{
                        "title":"Robot touching tilted center platform only",
                        "type":"Boolean"
                    },
                    "robotTouchingBalancedPlatform":{
                        "title":"Robot touching balanced center platform only",
                        "type":"Boolean"
                    }
                },
                "score":function(robotTouchingTiltedPlatform, robotTouchingBalancedPlatform) {
                    return robotTouchingTiltedPlatform*45 + robotTouchingBalancedPlatform*65;
                }
            },
            "ballGame":{
                "title":"Ball game",
                "objectives":{
                    "blueCenter":{
                        "title":"Blue ball in center position",
                        "type":"Boolean"
                    },
                    "redCenter":{
                        "title":"Red ball in center position",
                        "type":"Boolean"
                    },
                    "yellowCenter":{
                        "title":"Yellow ball in center position",
                        "type":"Boolean"
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
                "score":function(blueCenter, redCenter, yellowCenter, blueTeam, redTeam, blueOnRack, redOnRack) {
                    return (blueCenter * blueTeam * 60) +
                        (redCenter * redTeam * 60) +
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
        },
        "expectations": {
            "general": [
                function(redTeam,  blueTeam) {
                    return (redTeam + blueTeam) === 1;
                }
            ],
            "strength": [
                function(weightAtRedMaker,  weightAboveRedMaker) {
                    return !(weightAtRedMaker && weightAboveRedMaker);
                }
            ],
            "woodworking": [
                function(chairFixedInBase,  chairFixedUnderTable) {
                    return !(chairFixedInBase && chairFixedUnderTable);
                }
            ],
            "transitions": [
                function(robotTouchingTiltedPlatform,  robotTouchingBalancedPlatform) {
                    return !(robotTouchingTiltedPlatform && robotTouchingBalancedPlatform);
                }
            ],
            "ballGame": [
                function(blueCenter, redCenter, yellowCenter) {
                    return (blueCenter + redCenter + yellowCenter <= 1);
                }
            ],
            "cardio": [
                function(dialBig, dialSmall) {
                    if (dialBig===9) {
                        return !dialSmall;
                    }
                    return true;
                }
            ]
        }
    };

    angular.module(moduleName, []).controller(moduleName + 'Ctrl', [
        '$scope',
        function($scope) {
            log('init scores ctrl');

            // fs.read('field.js').then(function(defs) {
                // var field = eval('('+defs+')');
                $scope.missionIndex = field.missions;
                $scope.expectations = field.expectations;
                $scope.objectiveIndex = indexObjectives(field.missions);
                // console.log($scope.objectiveIndex);
                $scope.missions = transpose(field.missions);
                angular.forEach($scope.missions,process);
                // console.log($scope.rules);
                // console.log(test);
            // }).fail(function() {
            //     log('error getting field');
            // }).then(function() {
            //     $scope.$apply();
            // }).done();

            //team color
            $scope.teamColor = function() {
                return $scope.missionIndex['general'].result;
            };


            function getDependencies(fn) {
                var deps = fn.toString().match(/^function\s*\((.*?)\)/)[1];
                return deps?deps.split(/\s*,\s*/):[];
            }
            function getObjectives(names) {
                return names.map(function(dep) {
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

            function getErrorFunc(key) {
                var expectations = ($scope.expectations[key]||[function(){return true;}]).map(function(e) {
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
                var getError = getErrorFunc(mission._key);
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
                    mission.result = mission.score.apply(null,vars);
                    console.log('deps for',key,'changed',newValue,mission.result);
                });

            }
        }
    ]);
    return moduleName;
});
