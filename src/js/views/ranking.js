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

            // temporary default sort values
            $scope.sort = 'rank';
            $scope.rev = false;

            $scope.doSort = function(stage, col, defaultSort) {
                if (stage.sort === undefined) {
                    stage.sort = $scope.sort;
                    stage.rev = $scope.rev;
                }
                stage.rev = (String(stage.sort) === String(col)) ? !stage.rev : defaultSort;
                stage.sort = col;
            };

            $scope.sortIcon = function(stage, col){
                // got into trouble with a default sort order here...
                var icon = '';
                if (stage.sort == col) {
                    if (stage.rev){
                        icon = 'icon-sort-down';
                    } else {
                        icon = 'icon-sort-up';
                    }
                } else if (stage.sort == null && col == $scope.sort) {
                    if (stage.rev == null && $scope.rev) {
                        icon = 'icon-sort-down';
                    } else {
                        icon = 'icon-sort-up';
                    }
                } else {
                    icon = ''; // no icon if column is not sorted
                }
                return icon;
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

            $scope.csvdata = {};
            $scope.csvname = {};

            function toCSV(rows) {
                return rows.map(function(row) {
                    return row.map(function(col) {
                        // Escape quotes, and wrap in quotes
                        if (col === undefined || col === null) {
                            col = "";
                        }
                        return '"' + String(col).replace(/"/gi, '""') + '"';
                    }).join(",");
                }).join("\r\n");
            }

            $scope.$watch("scoreboard", function() {
                $scope.csvdata = {};
                $scope.csvname = {};
                Object.keys($scores.scoreboard).forEach(function(stageId) {
                    var ranking = $scores.scoreboard[stageId];
                    var rows = ranking.map(function(entry) {
                        return [
                            entry.rank,
                            entry.team.number,
                            entry.team.name,
                            entry.highest,
                        ].concat(entry.scores);
                    });
                    var header = ["Rank", "Team Number", "Team Name", "Highest"];
                    var stage = $stages.get(stageId);
                    header = header.concat(stage.$rounds.map(function(round) { return "Round " + round; }));
                    rows.unshift(header);
                    $scope.csvname[stageId] = encodeURIComponent("ranking_" + stageId + ".csv");
                    $scope.csvdata[stageId] = "data:text/csv;charset=utf-8," + encodeURIComponent(toCSV(rows));
                });
            }, true);

            $scope.stages = $stages.stages;
            $scope.scoreboard = $scores.scoreboard;
        }
    ]);
});
