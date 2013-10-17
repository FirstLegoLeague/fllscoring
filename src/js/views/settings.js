define([
    'services/log',
    'angular'
],function(log) {
    var moduleName = 'settings';
    return angular.module(moduleName,[]).controller(moduleName+'Ctrl',[
        '$scope',
        function($scope) {
            log('init settings ctrl');
            $scope.log = log.get();


        }
    ]);
});
