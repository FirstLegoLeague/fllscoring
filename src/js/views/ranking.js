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
                } else if (stage.sort === null && col == $scope.sort) {
                    if (stage.rev === null && $scope.rev) {
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

            // Data for CSV export links, indexed by stage ID
            $scope.csvdata = {}; // CSV data itself
            $scope.csvname = {}; // Filenames suggested to user

            // Convert a 2D matrix to a CSV string.
            // All cells are converted to strings and fully quoted,
            // except null or undefined cells, which are passed as empty
            // values (without quotes).
            function toCSV(rows) {
                return rows.map(function(row) {
                    return row.map(function(col) {
                        // Escape quotes, and wrap in quotes
                        if (col === undefined || col === null) {
                            col = "";
                        }
                        return '"' + String(col).replace(/"/gi, '""') + '"';
                    }).join(",");
                }).join("\r\n"); // Use Windows line-endings, to make it Notepad-friendly
            }

            /**
             * Rebuild CSV data (contents and filenames) of given scoreboard.
             * @param scoreboard Per-stage ranking as present in e.g. $scores.scoreboard.
             */
            $scope.rebuildCSV = function(scoreboard) {
                $scope.csvdata = {};
                $scope.csvname = {};
                Object.keys(scoreboard).forEach(function(stageId) {
                    var ranking = scoreboard[stageId];
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
            };

            // Rebuild CSV data and filenames when scoreboard is updated
            $scope.$watch("scoreboard", function() {
                $scope.rebuildCSV($scores.scoreboard);
            }, true);

            $scope.stages = $stages.stages;
            $scope.scoreboard = $scores.scoreboard;
        }
    ]);
});
