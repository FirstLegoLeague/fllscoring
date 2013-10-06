define([
    'services/log',
    'services/fs',
    'angular'
], function(log, fs) {
    var moduleName = 'scores';

    angular.module(moduleName, []).controller(moduleName + 'Ctrl', [
        '$scope',
        function($scope) {
            log('init scores ctrl');

            fs.read('field.js').then(function(field) {
                var field = eval('('+field+')');
                $scope.observables = field.observables;
                $scope.rules = field.rules;
                angular.forEach($scope.rules,process);
                console.log($scope.rules);
                // console.log(test);
            // }).fail(function() {
            //     log('error getting field');
            }).then(function() {
                $scope.$apply();
            });

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
