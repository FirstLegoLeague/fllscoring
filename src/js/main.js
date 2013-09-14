define([
    'services/log',
    'tests/fsTest',
    'angular'
],function(log,fsTest) {

    log('device ready');

    fsTest();

    //initialize main controller and load main view
    //load other main views to create dynamic views for different device layouts
    angular.module('main',[]).controller('mainCtrl',[
        '$scope',
        function($scope) {
            log('init main ctrl');
            $scope.mainView = 'views/main.html';
        }
    ]);
    angular.bootstrap(document.body,['main']);
});
