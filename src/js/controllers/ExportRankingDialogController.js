define('controllers/ExportRankingDialogController',[
    'services/log',
    'services/ng-handshake',
    'services/ng-scores',
    'angular'
], function(log) {
    var moduleName = 'ExportRankingDialog';

    return angular.module(moduleName, []).controller('ExportRankingDialogController',[
        '$scope', '$handshake','$scores','$timeout','$document',
        function ($scope, $handshake, $scores, $timeout, $document) {
            var defer;

            // export settings
            $scope.export = {};
            $scope.export.prevRounds = true; // enable highscore
            $scope.export.flowAmount = 10;         // The amount of rows shown at the same time
            $scope.export.fixedShownTop = 3;      // The amount of scores always visible at top
            $scope.export.timeForFrame1 = 10;      // Amount of seconds that the first page shows
            $scope.export.timeThroughFrames = 10;  // Amount of seconds that each scroll takes
            $scope.export.fadeAtOneGo = 7;        // Amount of scores that move away and appear


            $handshake.$on('exportRanking',function(e,data) {
                $scope.scores = data.scores;
                $scope.stages = data.stages;
                $scope.dialogVisible = true;
                defer = $handshake.defer();
                return defer.promise;
            });

            // Generate new table and download page to wished location
            $scope.exportScore = function(params){
                $scope.stageselected = params.stage;
                $scope.export.rounds = Array.apply(null, Array(params.round)).map(function (_, i) {return i+1;});
                var stageFilter = {};
                stageFilter[params.stage.id] = params.round;
                $scores.getRankings().then(function(rankings) {
                    $scope.filterscoreboard = rankings;

                    $timeout(function () {
                        var htmloutput = "<!DOCTYPE html><html><head><title>"+ params.stage.name + " " + params.round + "</title></head><body id=\"bodyranking\">";
                        htmloutput += $document[0].getElementById("scoreexport").innerHTML;
                        htmloutput += "<script>runThroughHighscore("+$scope.filterscoreboard[$scope.stageselected.id].length+");</script>";
                        htmloutput += "</body></html>";
                        $scope.exportname = encodeURIComponent("RoundResults.html");
                        $scope.exportdata = "data:text/html;charset=utf-8," + encodeURIComponent(htmloutput);
                        $scope.exportvisible = true;

                    });
                });
            };

            $scope.getRoundLabel = function(round){
                return "Round " + round;
            };

            $scope.cancel = function () {
                $scope.dialogVisible = false;
                defer.resolve();
            };
        }
    ]);
});
