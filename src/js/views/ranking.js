"use strict";

define('views/ranking',[
    'services/log',
    'services/ng-scores',
    'angular'
],function(log) {
    var moduleName = 'ranking';
    return angular.module(moduleName,[]).controller(moduleName+'Ctrl', [
        '$scope', '$scores', '$stages',
        function($scope, $scores, $stages) {
            log('init ranking ctrl');

            $scope.sort = 'rank';
            $scope.rev = false;

            $scope.doSort = function(col, defaultSort) {
                $scope.rev = (String($scope.sort) === String(col)) ? !$scope.rev : defaultSort;
                $scope.sort = col;
            };

            $scope.toggle = function(stage) {
                stage.$collapsed = !stage.$collapsed;
            };

            $scope.stages = $stages.stages;
            $scope.scoreboard = $scores.scoreboard;
        }
    ]);
});
