define([
    'services/log',
    'services/ng-session',
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
    'angular-storage',
    'angular'
],function(log,session,settings,teams,scoresheet,scores,ranking,services,directives,size,filters,indexFilter,fsTest,dbTest) {

    log('device ready');

    // fsTest();
    // dbTest();

    //initialize main controller and load main view
    //load other main views to create dynamic views for different device layouts
    angular.module('main',[]).controller('mainCtrl',[
        '$scope', '$session',
        function($scope, $session) {
            log('init main ctrl');
            $scope.drawer = 'views/drawer.html';
            $scope.scoringPages = ['scoresheet','settings'];
            $scope.validationErrors = [];
            $scope.drawerVisible = false;

            $session.load().then(function(session) {
                $scope.user = session['user'];
                if($scope.user === 'admin') {
                    $scope.pages = [
                        { name: 'scoresheet', title: 'Scoresheet', icon: 'check' },
                        { name: 'teams', title: 'Teams', icon: 'people' },
                        { name: 'scores', title: 'Scorekeeping', icon: 'list' },
                        { name: 'ranking', title: 'Ranking', icon: 'format_list_numbered' },
                        { name: 'settings', title: 'Settings', icon: 'settings' }
                    ];
                } else {
                    $scope.pages = [
                        { name: 'scoresheet', title: 'Scoresheet', icon: 'check' },
                        { name: 'settings', title: 'Settings', icon: 'settings' }
                    ];
                }

                $scope.currentPage = $scope.pages[0];
            })

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
