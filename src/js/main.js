define([
    'services/log',
    'views/settings',
    'views/teams',
    'views/scores',
    'services/ng-services',
    'tests/fsTest',
    'tests/indexedDBTest',
    'angular'
],function(log,settings,teams,scores,services,fsTest,dbTest) {

    log('device ready');

    // fsTest();
    // dbTest();


    //initialize main controller and load main view
    //load other main views to create dynamic views for different device layouts
    angular.module('main',[]).controller('mainCtrl',[
        '$scope',
        function($scope) {
            log('init main ctrl');
            $scope.mainView = 'views/main.html';
            $scope.page = 'scores';

            $scope.setPage = function(page) {
                $scope.page = page;
            };
        }
    ]);
    angular.bootstrap(document.body,[
        'main',
        settings.name,
        teams.name,
        scores.name,
        services.name
    ]);
});
