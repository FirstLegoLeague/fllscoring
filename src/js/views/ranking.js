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

            $scope.maxRounds = function() {
                return $stages.stages.reduce(function(max,stage) {
                    //log(stage.name + ": " + stage.$rounds.length);
                    //log("maxRounds: " + max);
                    return Math.max(max, stage.$rounds.length);
                },0);
            };

            $scope.emptyCols = function(stage) {
                return new Array($scope.maxRounds() - stage.$rounds.length);
            };

            $scope.stages = $stages.stages;
            $scope.scoreboard = $scores.scoreboard;
        }
    ]);
});
