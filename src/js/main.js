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
        '$scope','$window',
        function($scope, $window) {
            log('init main ctrl');
            $scope.drawer = 'views/drowar';
            $scope.pages = ['teams','scoresheet','scores','ranking','settings'];
            $scope.scoringPages = ['scoresheet','settings'];
            $scope.currentPage = $scope.pages[1];
            $scope.validationErrors = [];
            $scope.drawerVisible = false;

            $scope.$on('validationError',function(e,validationErrors) {
                $scope.validationErrors = validationErrors;
            });

            $scope.toggleDrawer = function(set) {
                if (set !== undefined) {
                    $scope.drawerVisible = set;
                } else {
                    $scope.drawerVisible = !$scope.drawerVisible;
                }
            };

            $scope.setPage = function(page) {
                $scope.currentPage = page;
                $('body').scrollTop(0);
                $scope.drawerVisible = false;
            };

            $scope.setPlatform = function(platform) {
                $scope.platform = platform;
            };

            $scope.containerClass = function(w,h) {
                w = w();
                if (w <= 480) {
                    return $scope.platform + ' smallWindow';
                } else if (w <= 1024) {
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
