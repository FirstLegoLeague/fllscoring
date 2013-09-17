define([
    'services/log',
    'views/settings',
    'views/teams',
    'tests/fsTest',
    'tests/indexedDBTest',
    'angular'
],function(log,settings,teams,fsTest,dbTest) {

    log('device ready');

    fsTest();
    dbTest();


    //initialize main controller and load main view
    //load other main views to create dynamic views for different device layouts
    angular.module('main',[]).controller('mainCtrl',[
        '$scope',
        function($scope) {
            log('init main ctrl');
            $scope.mainView = 'views/main.html';
            $scope.page = 'settings';

            $scope.setPage = function(page) {
                $scope.page = page;
            };
        }
    ]);
    angular.bootstrap(document.body,['main',settings,teams]);
});
