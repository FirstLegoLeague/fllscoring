define('views/scores',[
    'services/log',
    'services/ng-scores',
    'directives/really',
    'angular'
],function(log) {
    var moduleName = 'scores';
    return angular.module(moduleName,[]).controller(moduleName+'Ctrl',[
        '$scope', '$scores','$teams','$stages','$window',
        function($scope,$scores,$teams,$stages,$window) {
            log('init scores ctrl');

            $scope.sort = 'index';
            $scope.rev = true;

            $scope.scores = $scores.scores;
            $scope.stages = $stages.stages;

            $scope.doSort = function(col, defaultSort) {
                $scope.rev = (String($scope.sort) === String(col)) ? !$scope.rev : !!defaultSort;
                $scope.sort = col;
            };
            $scope.removeScore = function(scoreId) {
                return $scores.remove(scoreId);
            };
            $scope.editScore = function(score) {
                score.$editing = true;
            };

            $scope.publishScore = function(score) {
                score.published = true;
                saveScore(score);
            };

            $scope.unpublishScore = function(score) {
                score.published = false;
                saveScore(score);
            };

            $scope.finishEditScore = function(score) {
                // The score entry is edited 'inline', then used to
                // replace the entry in the scores list and its storage.
                // Because scores are always 'sanitized' before storing,
                // the $editing flag is automatically discarded.
                saveScore(score);
            };

            function saveScore(score) {
                $scores.update(score).catch(function(err) {
                    $window.alert("Error updating score: " + err);
                });
            }

            $scope.cancelEditScore = function() {
                score.$editing = false;
                $scores._update();
            };

            $scope.pollSheets = function() {
                return $scores.pollSheets().catch(function(err) {
                    log("pollSheets() failed", err);
                    $window.alert("failed to poll sheets: " + err);
                });
            };

            $scope.refresh = function() {
                $scores.load();
            };
        }
    ]);
});
