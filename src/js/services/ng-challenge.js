define('services/ng-challenge',[
    'services/log',
    'services/ng-services',
    'services/fs'
],function(log,module,fs) {
    return module.factory('$challenge',['$fs',function($fs) {
        var mission;

        var field = {
            title: "Senior Solutions",
            missions: [
                {
                    "title": "Flexibility",
                    "objectives": {
                        "yellowloops": {
                            "title": "Yellow Loops in Base",
                            "type": "number",
                            "min": "0",
                            "max": "2"
                        }
                    },
                    "score": [
                        function(yellowloops) {
                            if (yellowloops === '0') {
                                return 0
                            }
                            if (yellowloops === '1') {
                                return 20
                            }
                            if (yellowloops === '2') {
                                return 40
                            }
                        }
                    ]
                }, {
                    "title": "Medicine",
                    "objectives": {
                        "meds": {
                            "title": "Green in Base, Orange Not Moved",
                            "type": "yesno"
                        }
                    },
                    "score": [
                        function(meds) {
                            if (meds === 'no') {
                                return 0
                            }
                            if (meds === 'yes') {
                                return 25
                            }
                        }
                    ]
                }, {
                    "title": "Service Animals",
                    "objectives": {
                        "dog": {
                            "title": "Dog in Base",
                            "type": "yesno"
                        }
                    },
                    "score": [
                        function(dog) {
                            if (dog === 'no') {
                                return 0
                            }
                            if (dog === 'yes') {
                                return 20
                            }
                        }
                    ]
                }, {
                    "title": "Wood Working",
                    "objectives": {
                        "chairbase": {
                            "title": "Chair Repaired and in Base",
                            "type": "yesno"
                        },
                        "chairtable": {
                            "title": "Chair Repaired and under Table",
                            "type": "yesno"
                        }
                    },
                    "score": [
                        function(chairbase, chairtable) {
                            if (chairbase === 'no' && chairtable === 'no') {
                                return 0
                            }
                            if (chairbase === 'no' && chairtable === 'yes') {
                                return 25
                            }
                            if (chairbase === 'yes' && chairtable === 'no') {
                                return 15
                            }
                            if (chairbase === 'yes' && chairtable === 'yes') {
                                return new Error("Chair cannot be in base AND under the table.")
                            }
                        }
                    ]
                }, {
                    "title": "Video Call",
                    "objectives": {
                        "flags": {
                            "title": "Flags Fully Upright",
                            "type": "number",
                            "min": "0",
                            "max": "2"
                        }
                    },
                    "score": [
                        function(flags) {
                            if (flags === '0') {
                                return 0
                            }
                            if (flags === '1') {
                                return 20
                            }
                            if (flags === '2') {
                                return 40
                            }
                        }
                    ]
                }, {
                    "title": "Quilts",
                    "objectives": {
                        "quiltsblue": {
                            "title": "Blue Squares Touch Target",
                            "type": "number",
                            "min": "0",
                            "max": "2"
                        },
                        "quiltsorange": {
                            "title": "Orange Squares Touch Target",
                            "type": "number",
                            "min": "0",
                            "max": "2"
                        }
                    },
                    "score": [
                        function(quiltsblue) {
                            if (quiltsblue === '0') {
                                return 0
                            }
                            if (quiltsblue === '1') {
                                return 15
                            }
                            if (quiltsblue === '2') {
                                return 30
                            }
                        },
                        function(quiltsorange) {
                            if (quiltsorange === '0') {
                                return 0
                            }
                            if (quiltsorange === '1') {
                                return 30
                            }
                            if (quiltsorange === '2') {
                                return 60
                            }
                        }
                    ]
                }, {
                    "title": "Similarity Recognition and Cooperation",
                    "objectives": {
                        "coop": {
                            "title": "Dials on Both Fields are Parallel",
                            "type": "yesno"
                        }
                    },
                    "score": [
                        function(coop) {
                            if (coop === 'no') {
                                return 0
                            }
                            if (coop === 'yes') {
                                return 45
                            }
                        }
                    ]
                }, {
                    "title": "Ball Game",
                    "objectives": {
                        "ballcount": {
                            "title": "Balls on Rack",
                            "type": "number",
                            "min": "0",
                            "max": "7"
                        },
                        "ballmiddle": {
                            "title": [{
                                "id": "your",
                                "title": "Middle Ball Yours"
                            }, {
                                "id": "them",
                                "title": "Middle Ball Theirs"
                            }, {
                                "id": "none",
                                "title": "Middle Ball Neither"
                            }],
                            "type": "enum"
                        }
                    },
                    "score": [
                        function(ballmiddle, ballcount) {
                            if (ballmiddle === 'your' && ballcount === '0') {
                                return new Error("When no balls are left, the middle ball must be 'Neither'.")
                            }
                            if (ballmiddle === 'your' && ballcount === '1') {
                                return 70
                            }
                            if (ballmiddle === 'your' && ballcount === '2') {
                                return 80
                            }
                            if (ballmiddle === 'your' && ballcount === '3') {
                                return 90
                            }
                            if (ballmiddle === 'your' && ballcount === '4') {
                                return 100
                            }
                            if (ballmiddle === 'your' && ballcount === '5') {
                                return 110
                            }
                            if (ballmiddle === 'your' && ballcount === '6') {
                                return 120
                            }
                            if (ballmiddle === 'your' && ballcount === '7') {
                                return new Error("When all balls are left, the middle ball must be 'Neither'.")
                            }
                            if (ballmiddle === 'them' && ballcount === '0') {
                                return new Error("When no balls are left, the middle ball must be 'Neither'.")
                            }
                            if (ballmiddle === 'them' && ballcount === '1') {
                                return 10
                            }
                            if (ballmiddle === 'them' && ballcount === '2') {
                                return 20
                            }
                            if (ballmiddle === 'them' && ballcount === '3') {
                                return 30
                            }
                            if (ballmiddle === 'them' && ballcount === '4') {
                                return 40
                            }
                            if (ballmiddle === 'them' && ballcount === '5') {
                                return 50
                            }
                            if (ballmiddle === 'them' && ballcount === '6') {
                                return 60
                            }
                            if (ballmiddle === 'them' && ballcount === '7') {
                                return new Error("When all balls are left, the middle ball must be 'Neither'.")
                            }
                            if (ballmiddle === 'none' && ballcount === '0') {
                                return 0
                            }
                            if (ballmiddle === 'none' && ballcount === '1') {
                                return new Error("When some, but not all, balls are left, the middle ball cannot be 'Neither'.")
                            }
                            if (ballmiddle === 'none' && ballcount === '2') {
                                return new Error("When some, but not all, balls are left, the middle ball cannot be 'Neither'.")
                            }
                            if (ballmiddle === 'none' && ballcount === '3') {
                                return new Error("When some, but not all, balls are left, the middle ball cannot be 'Neither'.")
                            }
                            if (ballmiddle === 'none' && ballcount === '4') {
                                return new Error("When some, but not all, balls are left, the middle ball cannot be 'Neither'.")
                            }
                            if (ballmiddle === 'none' && ballcount === '5') {
                                return new Error("When some, but not all, balls are left, the middle ball cannot be 'Neither'.")
                            }
                            if (ballmiddle === 'none' && ballcount === '6') {
                                return new Error("When some, but not all, balls are left, the middle ball cannot be 'Neither'.")
                            }
                            if (ballmiddle === 'none' && ballcount === '7') {
                                return 70
                            }
                        }
                    ]
                }, {
                    "title": "Gardening",
                    "objectives": {
                        "plants": {
                            "title": "Base of Plants Touch Target",
                            "type": "yesno"
                        }
                    },
                    "score": [
                        function(plants) {
                            if (plants === 'no') {
                                return 0
                            }
                            if (plants === 'yes') {
                                return 25
                            }
                        }
                    ]
                }, {
                    "title": "Stove",
                    "objectives": {
                        "burners": {
                            "title": "All Burners are Black",
                            "type": "yesno"
                        }
                    },
                    "score": [
                        function(burners) {
                            if (burners === 'no') {
                                return 0
                            }
                            if (burners === 'yes') {
                                return 25
                            }
                        }
                    ]
                }, {
                    "title": "Bowling",
                    "objectives": {
                        "pins": {
                            "title": "Pins Hit",
                            "type": "number",
                            "min": "0",
                            "max": "6"
                        }
                    },
                    "score": [
                        function(pins) {
                            if (pins === '0') {
                                return 0
                            }
                            if (pins === '1') {
                                return 7
                            }
                            if (pins === '2') {
                                return 14
                            }
                            if (pins === '3') {
                                return 21
                            }
                            if (pins === '4') {
                                return 28
                            }
                            if (pins === '5') {
                                return 35
                            }
                            if (pins === '6') {
                                return 60
                            }
                        }
                    ]
                }, {
                    "title": "Transitions",
                    "objectives": {
                        "platslant": {
                            "title": "Robot Only Touches Slanted Platform",
                            "type": "yesno"
                        },
                        "platbalan": {
                            "title": "Robot Only Touches Balanced Platform",
                            "type": "yesno"
                        },
                        "platclear": {
                            "title": "Platform Only Touches Robot and Mat",
                            "type": "yesno"
                        }
                    },
                    "score": [
                        function(platslant, platbalan, platclear) {
                            if (platslant === 'no' && platbalan === 'no' && platclear === 'no') {
                                return 0
                            }
                            if (platslant === 'no' && platbalan === 'no' && platclear === 'yes') {
                                return 0
                            }
                            if (platslant === 'no' && platbalan === 'yes' && platclear === 'no') {
                                return 0
                            }
                            if (platslant === 'no' && platbalan === 'yes' && platclear === 'yes') {
                                return 65
                            }
                            if (platslant === 'yes' && platbalan === 'no' && platclear === 'no') {
                                return 0
                            }
                            if (platslant === 'yes' && platbalan === 'no' && platclear === 'yes') {
                                return 45
                            }
                            if (platslant === 'yes' && platbalan === 'yes' && platclear === 'no') {
                                return new Error("Platform cannot be slanted AND balanced.")
                            }
                            if (platslant === 'yes' && platbalan === 'yes' && platclear === 'yes') {
                                return new Error("Platform cannot be slanted AND balanced.")
                            }
                        }
                    ]
                }, {
                    "title": "Strength Exercise",
                    "objectives": {
                        "strength": {
                            "title": [{
                                "id": "lo",
                                "title": "Weight raised Low"
                            }, {
                                "id": "hi",
                                "title": "Weight raised High"
                            }, {
                                "id": "no",
                                "title": "Weight raised Not Done"
                            }],
                            "type": "enum"
                        }
                    },
                    "score": [
                        function(strength) {
                            if (strength === 'no') {
                                return 0
                            }
                            if (strength === 'lo') {
                                return 15
                            }
                            if (strength === 'hi') {
                                return 25
                            }
                        }
                    ]
                }, {
                    "title": "Cardio Training",
                    "objectives": {
                        "dialbig": {
                            "title": "Dial Big Step",
                            "type": "number",
                            "min": "1",
                            "max": "9"
                        },
                        "dialsmall": {
                            "title": "Dial Small Step",
                            "type": "number",
                            "min": "0",
                            "max": "5"
                        }
                    },
                    "score": [
                        function(dialbig, dialsmall) {
                            if (dialbig === '1' && dialsmall === '0') {
                                return -60
                            }
                            if (dialbig === '1' && dialsmall === '1') {
                                return -55
                            }
                            if (dialbig === '1' && dialsmall === '2') {
                                return -50
                            }
                            if (dialbig === '1' && dialsmall === '3') {
                                return -45
                            }
                            if (dialbig === '1' && dialsmall === '4') {
                                return -40
                            }
                            if (dialbig === '1' && dialsmall === '5') {
                                return -35
                            }
                            if (dialbig === '2' && dialsmall === '0') {
                                return -30
                            }
                            if (dialbig === '2' && dialsmall === '1') {
                                return -25
                            }
                            if (dialbig === '2' && dialsmall === '2') {
                                return -20
                            }
                            if (dialbig === '2' && dialsmall === '3') {
                                return -15
                            }
                            if (dialbig === '2' && dialsmall === '4') {
                                return -10
                            }
                            if (dialbig === '2' && dialsmall === '5') {
                                return -5
                            }
                            if (dialbig === '3' && dialsmall === '0') {
                                return 0
                            }
                            if (dialbig === '3' && dialsmall === '1') {
                                return 5
                            }
                            if (dialbig === '3' && dialsmall === '2') {
                                return 10
                            }
                            if (dialbig === '3' && dialsmall === '3') {
                                return 15
                            }
                            if (dialbig === '3' && dialsmall === '4') {
                                return 20
                            }
                            if (dialbig === '3' && dialsmall === '5') {
                                return 25
                            }
                            if (dialbig === '4' && dialsmall === '0') {
                                return 30
                            }
                            if (dialbig === '4' && dialsmall === '1') {
                                return 35
                            }
                            if (dialbig === '4' && dialsmall === '2') {
                                return 40
                            }
                            if (dialbig === '4' && dialsmall === '3') {
                                return 45
                            }
                            if (dialbig === '4' && dialsmall === '4') {
                                return 50
                            }
                            if (dialbig === '4' && dialsmall === '5') {
                                return 55
                            }
                            if (dialbig === '5' && dialsmall === '0') {
                                return 60
                            }
                            if (dialbig === '5' && dialsmall === '1') {
                                return 63
                            }
                            if (dialbig === '5' && dialsmall === '2') {
                                return 66
                            }
                            if (dialbig === '5' && dialsmall === '3') {
                                return 69
                            }
                            if (dialbig === '5' && dialsmall === '4') {
                                return 72
                            }
                            if (dialbig === '5' && dialsmall === '5') {
                                return 75
                            }
                            if (dialbig === '6' && dialsmall === '0') {
                                return 78
                            }
                            if (dialbig === '6' && dialsmall === '1') {
                                return 91
                            }
                            if (dialbig === '6' && dialsmall === '2') {
                                return 94
                            }
                            if (dialbig === '6' && dialsmall === '3') {
                                return 97
                            }
                            if (dialbig === '6' && dialsmall === '4') {
                                return 100
                            }
                            if (dialbig === '6' && dialsmall === '5') {
                                return 103
                            }
                            if (dialbig === '7' && dialsmall === '0') {
                                return 106
                            }
                            if (dialbig === '7' && dialsmall === '1') {
                                return 107
                            }
                            if (dialbig === '7' && dialsmall === '2') {
                                return 108
                            }
                            if (dialbig === '7' && dialsmall === '3') {
                                return 109
                            }
                            if (dialbig === '7' && dialsmall === '4') {
                                return 110
                            }
                            if (dialbig === '7' && dialsmall === '5') {
                                return 111
                            }
                            if (dialbig === '8' && dialsmall === '0') {
                                return 112
                            }
                            if (dialbig === '8' && dialsmall === '1') {
                                return 113
                            }
                            if (dialbig === '8' && dialsmall === '2') {
                                return 114
                            }
                            if (dialbig === '8' && dialsmall === '3') {
                                return 115
                            }
                            if (dialbig === '8' && dialsmall === '4') {
                                return 116
                            }
                            if (dialbig === '8' && dialsmall === '5') {
                                return 117
                            }
                            if (dialbig === '9' && dialsmall === '0') {
                                return 118
                            }
                            if (dialbig === '9' && dialsmall === '1') {
                                return new Error("When Big Dial is on 9, Small Dial must be on 0.")
                            }
                            if (dialbig === '9' && dialsmall === '2') {
                                return new Error("When Big Dial is on 9, Small Dial must be on 0.")
                            }
                            if (dialbig === '9' && dialsmall === '3') {
                                return new Error("When Big Dial is on 9, Small Dial must be on 0.")
                            }
                            if (dialbig === '9' && dialsmall === '4') {
                                return new Error("When Big Dial is on 9, Small Dial must be on 0.")
                            }
                            if (dialbig === '9' && dialsmall === '5') {
                                return new Error("When Big Dial is on 9, Small Dial must be on 0.")
                            }
                        }
                    ]
                }
            ]
        };

        function indexObjectives(missions) {
            objs = {};
            angular.forEach(missions,function(mission) {
                angular.forEach(mission.objectives,function(obj,key) {
                    objs[key] = obj;
                });
                //TODO: do this in the parser
                mission.objectives = Object.keys(mission.objectives).map(function(key) {
                    var o = mission.objectives[key];
                    o._key = key;
                    return o;
                });
            });
            return objs;
        }

        return {
            getDependencies: function(fn) {
                var deps = fn.toString().match(/^function\s*\((.*?)\)/)[1];
                return deps?deps.split(/\s*,\s*/):[];
            },
            load: function(challenge) {
                var self = this;
                //use non-angular fs to load plain javascript instead of json
                    // var field = field2;
                return fs.read(challenge).then(function(defs) {
                    return self.init(eval('('+defs+')'));
                }).fail(function() {
                    log('error getting field');
                    return self.init(field);
                });
            },
            init: function(field) {
                var red = {
                    field: field,
                    missions: field.missions,
                    objectiveIndex: indexObjectives(field.missions)
                };
                return red;
                // angular.forEach($scope.missions,process);
            },
            getErrorFunc: function(mission) {
                var self = this;
                var expectations = (mission.expectations||[function(){return true;}]).map(function(e) {
                    return {
                        deps: self.getDependencies(e),
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
        };
    }]);
});
