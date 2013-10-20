define([
    'fastclick',
    'services/log',
    'views/settings',
    'views/teams',
    'views/scores',
    'views/ranking',
    'services/ng-services',
    'directives/ng-directives',
    'directives/size',
    'tests/fsTest',
    'tests/indexedDBTest',
    'angular'
],function(FastClick,log,settings,teams,scores,ranking,services,directives,size,fsTest,dbTest) {

    log('device ready');

    // fsTest();
    // dbTest();

    //initiate fastclick
    $(function() {
        FastClick.attach(document.body);
    });


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

            $scope.containerClass = function(w,h) {
                w = w();
                if (w<480) {
                    return 'smallWindow';
                } else if (w<1024) {
                    return 'mediumWindow';
                } else {
                    return 'largeWindow';
                }
            };
        }
    ]);
    angular.bootstrap(document.body,[
        'main',
        settings.name,
        teams.name,
        scores.name,
        ranking.name,
        services.name,
        directives.name
    ]);
});
