define([
    'services/log',
    'services/fs',
    'angular'
], function(log, fs) {
    var moduleName = 'scores';

    var field = {
        "title":"Senior Solutions",
        "observables":{
            "pinsDown": {
                "title":"Number of pins down",
                "max":6,
                "type":Number
            },
            "weightAtRedMaker": {
                "title":"Weight height at the red maker",
                "type":Boolean
            },
            "weightAboveRedMaker": {
                "title":"Weight height above red maker",
                "type":Boolean
            },
            "blueQuilts":{
                "title":"Blue quilt square touching their black target regions",
                "max":2,
                "type":Number
            },
            "orangeQuilts":{
                "title":"Orange quilt square touching their black target regions",
                "max":2,
                "type":Number
            },
            "chairFixedInBase":{
                "title":"Chair fixed in base",
                "type":Boolean
            },
            "chairFixedUnderTable":{
                "title":"Chair fixed and any part under table",
                "type":Boolean
            },
            "orangeBottleMoved":{
                "title":"Orange bottle moved or outside lines",
                "type":Boolean
            },
            "greenBottleInBase":{
                "title":"Green bottle in base",
                "type":Boolean
            }
        },
        "rules": {
            "bowling":{
                "title":"Bowling",
                "exp":function(pinsDown) {
                    if (pinsDown < 6) {
                        return pinsDown*7;
                    }
                    return 60;
                }
            },
            "strength":{
                "title":"Strength Exercise",
                "exp":function(weightAtRedMaker,  weightAboveRedMaker) {
                    if (weightAtRedMaker && weightAboveRedMaker) {
                        throw new Error('select only one');
                    }
                    return weightAtRedMaker*15 + weightAboveRedMaker*25;
                }
            },
            "quilting":{
                "title":"Quiting",
                "exp":function(blueQuilts,orangeQuilts) {
                    return blueQuilts*15 + orangeQuilts*30;
                }
            },
            "woodworking":{
                "title":"Wood Working",
                "exp":function(chairFixedInBase,chairFixedUnderTable) {
                    if (chairFixedInBase && chairFixedUnderTable) {
                        throw new Error('select only one');
                    }
                    return chairFixedInBase*15 + chairFixedUnderTable*25;
                }
            },
            "medicin":{
                "title":"Medicine",
                "exp":function(orangeBottleMoved,greenBottleInBase) {
                    return 25*(!orangeBottleMoved && greenBottleInBase);
                }
            }
        }
    };

    angular.module(moduleName, []).controller(moduleName + 'Ctrl', [
        '$scope',
        function($scope) {
            log('init scores ctrl');

            // fs.read('field.js').then(function(defs) {
                // var field = eval('('+defs+')');
                $scope.observables = field.observables;
                $scope.rules = field.rules;
                angular.forEach($scope.rules,process);
                console.log($scope.rules);
                // console.log(test);
            // }).fail(function() {
            //     log('error getting field');
            // }).then(function() {
            //     $scope.$apply();
            // });

            function process(rule,key) {
                var exp = rule.exp;
                var args = exp.toString().match(/^function\s*\((.*?)\)/)[1].split(/\s*,\s*/);
                rule.fn = function() {
                    var vars = args.map(function(name) {
                        return 1*($scope.observables[name].value||0);
                    });
                    return exp.apply(null,vars);
                }
            }


            $scope.result = function(rule) {
                return rule.fn();
            };

            $scope.test = moduleName;
        }
    ]);
    return moduleName;
});
