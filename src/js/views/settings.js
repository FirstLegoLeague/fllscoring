define([
    'services/log',
    'angular'
],function(log) {
    var moduleName = 'settings';
    angular.module(moduleName,[]).controller(moduleName+'Ctrl',[
        '$scope',
        function($scope) {
            log('init settings ctrl');
            $scope.log = log.get();
        }
    ]);
    return moduleName;
});
