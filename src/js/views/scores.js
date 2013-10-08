define([
    'services/log',
    'services/fs',
    'angular'
], function(log, fs) {
    var moduleName = 'scores';

    var field = {
        "title":"Senior Solutions",
        "missions":{
            "bowling":{
                "title":"Bowling",
                "objectives": {
                    "pinsDown": {
                        "title":"Number of pins down",
                        "max":6,
                        "type":Number
                    }
                }
            },
            "strength":{
                "title":"Strength Exercise",
                "objectives": {
                    "weightAtRedMaker": {
                        "title":"Weight height at the red maker",
                        "type":Boolean
                    },
                    "weightAboveRedMaker": {
                        "title":"Weight height above red maker",
                        "type":Boolean
                    }
                }
            },
            "quilting":{
                "title":"Quiting",
                "objectives": {
                    "blueQuilts":{
                        "title":"Blue quilt square touching their black target regions",
                        "max":2,
                        "type":Number
                    },
                    "orangeQuilts":{
                        "title":"Orange quilt square touching their black target regions",
                        "max":2,
                        "type":Number
                    }
                }
            },
            "woodworking":{
                "title":"Wood Working",
                "objectives": {
                    "chairFixedInBase":{
                        "title":"Chair fixed in base",
                        "type":Boolean
                    },
                    "chairFixedUnderTable":{
                        "title":"Chair fixed and any part under table",
                        "type":Boolean
                    }
                }
            },
            "medicin":{
                "title":"Medicine",
                "objectives": {
                    "orangeBottleMoved":{
                        "title":"Orange bottle moved or outside lines",
                        "type":Boolean
                    },
                    "greenBottleInBase":{
                        "title":"Green bottle in base",
                        "type":Boolean
                    }
                }
            }
        },
        "expectations": {
            "strength": [
                function(weightAtRedMaker,  weightAboveRedMaker) {
                    return !(weightAtRedMaker && weightAboveRedMaker);
                }
            ],
            "woodworking": [
                function(chairFixedInBase,  chairFixedUnderTable) {
                    return !(chairFixedInBase && chairFixedUnderTable);
                }
            ]
        },
        "rules": {
            "bowling": function(pinsDown) {
                switch (pinsDown) {
                    case 0: return 0;
                    case 1: return 7;
                    case 2: return 14;
                    case 3: return 21;
                    case 4: return 28;
                    case 5: return 35;
                    case 6: return 60;
                }
            },
            "strength": function(weightAtRedMaker,  weightAboveRedMaker) {
                return weightAtRedMaker*15 + weightAboveRedMaker*25;
            },
            "quilting": function(blueQuilts,orangeQuilts) {
                return blueQuilts*15 + orangeQuilts*30;
            },
            "woodworking": function(chairFixedInBase,chairFixedUnderTable) {
                return chairFixedInBase*15 + chairFixedUnderTable*25;
            },
            "medicin": function(orangeBottleMoved,greenBottleInBase) {
                return 25*(!orangeBottleMoved && greenBottleInBase);
            }
        }
    }

    angular.module(moduleName, []).controller(moduleName + 'Ctrl', [
        '$scope',
        function($scope) {
            log('init scores ctrl');

            // fs.read('field.js').then(function(defs) {
                // var field = eval('('+defs+')');
                $scope.missions = field.missions;
                $scope.expectations = field.expectations;
                $scope.rules = field.rules;
                //todo: implement
                angular.forEach($scope.expectations,processExpects);
                angular.forEach($scope.rules,process);
                console.log($scope.rules);
                // console.log(test);
            // }).fail(function() {
            //     log('error getting field');
            // }).then(function() {
            //     $scope.$apply();
            // }).done();

            function getDependencies(fn) {
                var deps = fn.toString().match(/^function\s*\((.*?)\)/)[1].split(/\s*,\s*/);
                return deps;
            }

            /*
                for every expectation, a watcher is attached to the dependent variables
                the expectation is checked when these change and an error flag is
                set on the mission if the expectation fails
            */
            function processExpects(expects,key) {
                var mission = $scope.missions[key];
                expects.forEach(function(expect) {
                    var deps = getDependencies(expect);
                    deps.forEach(function(name) {
                        $scope.$watch(function() {
                            return mission.objectives[name].value;
                        },function(newValue) {
                            var vars = deps.map(function(name) {
                                return 1*($scope.missions[key].objectives[name].value||0);
                            });
                            mission.error = !expect.apply(null,vars);
                        },true);
                    });
                });
            }

            /*
                for every mission the score rule is calculated when the
                dependent objectives change. The result is set as
                result on the mission object
            */
            function process(rule,key) {
                var mission = $scope.missions[key];
                var deps = getDependencies(rule);
                deps.forEach(function(name) {
                    $scope.$watch(function() {
                        return mission.objectives[name].value;
                    },function(newValue) {
                        var vars = deps.map(function(name) {
                            return 1*($scope.missions[key].objectives[name].value||0);
                        });
                        mission.result = rule.apply(null,vars);
                    });
                });
            }
        }
    ]);
    return moduleName;
});
