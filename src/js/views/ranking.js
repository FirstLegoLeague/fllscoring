define([
    'services/log',
    'services/ng-fs',
    'angular'
],function(log) {
    var moduleName = 'ranking';
    return angular.module(moduleName,[]).controller(moduleName+'Ctrl',[
        '$scope', '$fs',
        function($scope,$fs) {
            log('init ranking ctrl');

            $fs.read('results.json').then(function(res) {
                $scope.results = res;
            },function() {
                $scope.results = {};
            });
        }
    ]);
});
