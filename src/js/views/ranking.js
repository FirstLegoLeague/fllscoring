"use strict";

define('views/ranking',[
    'services/log',
    'services/ng-scores',
    'services/ng-handshake',
    'services/ng-message',
    'controllers/ExportRankingDialogController',
    'angular'
],function(log) {
    var moduleName = 'ranking';
    return angular.module(moduleName,['ExportRankingDialog']).controller(moduleName+'Ctrl', [
        '$scope', '$scores', '$stages','$handshake','$message',
        function($scope, $scores, $stages, $handshake, $message) {
            log('init ranking ctrl');

            $scope.scores = $scores;

            function format(scoreboard) {
                let result = {};
                for(let stageId in scoreboard) {
                    let stage = scoreboard[stageId];
                    result[stageId] = stage.filter(rank => rank.scores.filter(score => score !== undefined).length);
                }
                return result;
            }

            $stages.init().then(function () {
                $scope.stages = $stages.stages;
                $scope.stages.forEach(function (stage) {
                    stage.sort = 'rank';
                    stage.rev = false;
                });
            });

            $scores.init().then(function() {
                return $scores.getRankings();
            }).then(function(scoreboard) {
                $scope.scoreboard = format(scoreboard);
            });

            $scope.exportRanking = function() {
                $handshake.$emit('exportRanking',{
                    scores: $scope.scores,
                    stages: $scope.stages
                });
            };

            //TODO: this is a very specific message tailored to display system.
            //we want less contract here
            $scope.broadcastRanking = function(stage) {
                // Send generic ranking info on bus, but filter it down a bit
                // to not include Angular-injected stuff (yuk), but also omit
                // the full scoresheets and their validation results etc.
                // Having it spelled out exactly also helps to have some kind of
                // 'interface' defined to the outside world.
                var rankingMessage = {
                    stage: {
                        id: stage.id,
                        name: stage.name,
                        rounds: stage.rounds,
                    },
                    ranking: $scope.scoreboard[stage.id].map(function (item) {
                        return {
                            rank: item.rank, // Note: there can be multiple rows with same (shared) rank!
                            team: {
                                number: item.team.number,
                                name: item.team.name,
                            },
                            scores: item.scores,
                            highest: item.highest,
                        };
                    }),
                };
                $message.send('scores:ranking', rankingMessage);
            };

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
                            entry.highest ? entry.highest.score : undefined,
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

            $scope.getRoundLabel = function(round){
                return "Round " + round;
            };


        }
    ]);
});
