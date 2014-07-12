define([
    'fastclick',
    'services/log',
    'views/settings',
    'views/teams',
    'views/scoresheet',
    'views/scores',
    'views/ranking',
    'services/ng-services',
    'directives/ng-directives',
    'directives/size',
    'filters/ng-filters',
    'filters/index',
    'tests/fsTest',
    'tests/indexedDBTest',
    'angular-bootstrap',
    'angular'
],function(FastClick,log,settings,teams,scoresheet,scores,ranking,services,directives,size,filters,indexFilter,fsTest,dbTest) {

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
            $scope.pages = ['teams','scoresheet','scores','ranking','settings'];
            $scope.currentPage = $scope.pages[1];

            $scope.setPage = function(page) {
                $scope.currentPage = page;
            };

            $scope.setPlatform = function(platform) {
                $scope.platform = platform;
            }

            $scope.containerClass = function(w,h) {
                w = w();
                if (w<=480) {
                    return $scope.platform + ' smallWindow';
                } else if (w<=1024) {
                    return $scope.platform + ' mediumWindow';
                } else {
                    return $scope.platform + ' largeWindow';
                }
            };

            // $scope.
        }
    ]);
    angular.bootstrap(document.body,[
        'main',
        'ui.bootstrap',
        settings.name,
        teams.name,
        scoresheet.name,
        scores.name,
        ranking.name,
        filters.name,
        services.name,
        directives.name
    ]);
});
