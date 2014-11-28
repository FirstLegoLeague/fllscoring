define([
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
    'angular-touch',
    'angular-sanitize',
    'angular'
],function(log,settings,teams,scoresheet,scores,ranking,services,directives,size,filters,indexFilter,fsTest,dbTest) {

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
            $scope.scoringView = 'views/mainScoring.html';
            $scope.pages = ['teams','scoresheet','scores','ranking','settings'];
            $scope.scoringPages = ['scoresheet','settings'];
            $scope.currentPage = $scope.pages[1];
            $scope.validationErrors = [];

            $scope.$on('validationError',function(e,validationErrors) {
                $scope.validationErrors = validationErrors;
            });

            $scope.setPage = function(page) {
                $scope.currentPage = page;
            };

            $scope.setPlatform = function(platform) {
                $scope.platform = platform;
            };

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
    angular.module('main').config(function($compileProvider){
        // Override to allow data: URI's (e.g. for CSV export)
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|data):/);
    });
    angular.bootstrap(document.body,[
        'main',
        'ui.bootstrap',
        'ngSanitize',
        'ngTouch',
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
