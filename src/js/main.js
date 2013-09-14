define([
    'services/log',
    'tests/fsTest',
    'views/settings',
    'angular'
],function(log,fsTest,settings) {

    log('device ready');

    fsTest();


    //initialize main controller and load main view
    //load other main views to create dynamic views for different device layouts
    angular.module('main',[]).controller('mainCtrl',[
        '$scope',
        function($scope) {
            log('init main ctrl');
            $scope.mainView = 'views/main.html';

            $scope.setPage = function(page) {
                $scope.page = page;
            };
        }
    ]);
    angular.bootstrap(document.body,['main',settings]);
});
