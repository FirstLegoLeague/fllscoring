"use strict";

define('views/ranking',[
    'services/log',
    'services/ng-scores',
    'services/ng-handshake',
    'services/ng-message',
    'services/ng-settings',
    'angular'
],function(log) {
    var moduleName = 'ranking';
    return angular.module(moduleName,[]).controller(moduleName+'Ctrl', [
        '$scope', '$scores', '$stages','$handshake','$message', '$settings',
        function($scope, $scores, $stages, $handshake, $message, $settings) {
            log('init ranking ctrl');

            $scope.scores = $scores;

            function removeEmptyRanks(scoreboard) {
                let result = {};
                for(let stageId in scoreboard) {
                    let stage = scoreboard[stageId];
                    result[stageId] = stage.filter(rank => rank.scores.filter(score => score !== undefined).length);
                }
                return result;
            }

          $settings.init();

          $scope.$watch(function() {
                return $scores.scoreboard;
            }, function () {
                $scope.scoreboard = removeEmptyRanks($scores.scoreboard)
            }, true);

            $stages.init().then(function () {
                $scope.stages = $stages.stages;
                $scope.stages.forEach(function (stage) {
                    stage.sort = 'rank';
                    stage.rev = false;
                });
            });

            $scores.init().then(function() {
                return $scores.getRankings();
            });

            $scope.exportRanking = function() {
                $handshake.$emit('exportRanking',{
                    scores: $scope.scores,
                    stages: $scope.stages
                });
            };
            //TODO: this is a very specific message tailored to display system.
            //we want less contract here
            $scope.broadcastRanking = (stage) =>  $scores.broadcastRanking(stage);

            $scope.doSort = function(stage, col, defaultSort) {
                if (stage.sort === undefined) {
                    stage.sort = $scope.sort;
                    stage.rev = $scope.rev;
                }
                stage.rev = (String(stage.sort) === String(col)) ? !stage.rev : defaultSort;
                stage.sort = col;
            };

            $scope.sortIcon = function(stage, col){
                if(!angular.equals(stage.sort, col)){
                    return '';
                }
                if (stage.rev) {
                    return 'arrow_drop_down';
                } else {
                    return 'arrow_drop_up';
                }
            };

            $scope.toggle = function(stage) {
                stage.$collapsed = !stage.$collapsed;
            };

            $scope.maxRounds = function() {
                return $stages.stages.reduce(function(max,stage) {
                    return Math.max(max, stage.$rounds.length);
                },0);
            };

            //return an array with the number of empty columns to render for a stage
            //max rounds minus stage rounds
            $scope.emptyCols = function(stage) {
                return new Array($scope.maxRounds() - stage.$rounds.length);
            };

            /**
             * encodes a two dimensional array as a string according to the settings
             * specified by the user as reported by the ng-settings.$settings service
             *
             * @param array the array to be encoded
             * @returns {string} the encoded string form of the array
             */
            $scope.encodeArray = function (array) {
                var string = "";
                var settings = $settings.settings;
                array.forEach(function (row) {
                    row = row.map((elem) => elem || elem === 0 ? String(elem) : "");
                    string = string.concat(settings.lineStartString ? String(settings.lineStartString) : "");
                    string = string.concat(row.join(settings.separatorString ? String(settings.separatorString) : ""));
                    string = string.concat((settings.lineEndString ? String(settings.lineEndString) : "") + "\r\n");
                });
                return string;
            };

            $scope.exportFiles = {};

            /**
             * Builds the .csv file for exporting score for each stage and assigns it
             * to exportFiles in the field corresponding to that stage's id
             */
            $scope.buildExportFiles= function () {
                Object.keys($scope.scoreboard).forEach(function (stageID) {
                    var teams = $scope.scoreboard[stageID];
                    teams = teams.map(function (teamEntry) {
                        return [teamEntry.rank, teamEntry.team.number,
                            teamEntry.team.name, teamEntry.highest.score].concat(teamEntry.scores);
                    });
                    $scope.exportFiles[stageID] = "data:text/csv;charset=utf-8,"+encodeURIComponent($scope.encodeArray(teams));
                });
            };

            $scope.$watch("scoreboard", function () {
               $scope.buildExportFiles();
            }, true);

            $scope.$watch(() => $scores.scoreboard, function () {
                $scope.scoreboard = removeEmptyRanks($scores.scoreboard)
            }, true);

            $scope.$watch(() => $settings.settings.lineStartString, () => $scope.buildExportFiles());
            $scope.$watch(() => $settings.settings.separatorString, () => $scope.buildExportFiles());
            $scope.$watch(() => $settings.settings.lineEndString, () => $scope.buildExportFiles());

            $settings.init().then(function () {//we have to wait for settings to initialize otherwise $scope.settings gets set to undefined
               $scope.settings = $settings.settings;
            });
            $scope.stages = $stages.stages;
            $scope.scoreboard = $scores.scoreboard;

            $scope.getRoundLabel = function(round){
                return "Round " + round;
            };


        }
    ]);
});
