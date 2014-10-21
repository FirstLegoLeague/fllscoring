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

            $scope.doSort = function(col,defaultSort) {
                $scope.rev = ($scope.sort === col)? !$scope.rev : defaultSort;
                $scope.sort = col;
            };

            $scope.stages = $stages.stages;
            $scope.scoreboard = $scores.scoreboard;
        }
    ]);
});
