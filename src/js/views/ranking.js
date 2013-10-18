define([
    'services/log',
    'services/ng-results',
    'angular'
],function(log) {
    var moduleName = 'ranking';
    return angular.module(moduleName,[]).controller(moduleName+'Ctrl',[
        '$scope', '$results',
        function($scope,$results) {
            log('init ranking ctrl');

            $scope.results = $results.data;

            $scope.removeResult = function(index) {
                $scope.results.splice(index,1);
                $results.save();
            };
        }
    ]);
});
