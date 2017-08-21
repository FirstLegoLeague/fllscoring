define('views/scores',[
    'services/log',
    'services/ng-scores',
    'directives/really',
    'angular'
],function(log) {
    var moduleName = 'scores';
    return angular.module(moduleName,[]).controller(moduleName+'Ctrl',[
        '$scope', '$scores','$teams','$stages','$window', '$rootScope',
        function($scope,$scores,$teams,$stages,$window, $rootScope) {
            log('init scores ctrl');

            $scope.sort = 'index';
            $scope.rev = true;

            $scope.scores = $scores.scores;
            $scope.stages = $stages.stages;

            $scope.doSort = function(col, defaultSort) {
                $scope.rev = (String($scope.sort) === String(col)) ? !$scope.rev : !!defaultSort;
                $scope.sort = col;
            };

            $scope.sortIcon = function(col){
                if(String($scope.sort)!== String(col)){//col and $scope.sort can be arrays, and so this is a quick and dirty way to check for equality
                    return '';
                }
                if ($scope.rev) {
                    return 'arrow_drop_down';
                } else {
                    return 'arrow_drop_up';
                }
            };

            $scope.removeScore = function(index) {
                $scores.remove(index);
                return $scores.save();
            };
            $scope.editScore = function(index) {
                var score = $scores.scores[index];
                score.$editing = true;
            };

            $scope.publishScore = function(index) {
                var score = $scores.scores[index];
                score.published = true;
                saveScore(score);
            };

            $scope.unpublishScore = function(index) {
                var score = $scores.scores[index];
                score.published = false;
                saveScore(score);
            };

            $scope.finishEditScore = function(index) {
                // The score entry is edited 'inline', then used to
                // replace the entry in the scores list and its storage.
                // Because scores are always 'sanitized' before storing,
                // the $editing flag is automatically discarded.
                var score = $scores.scores[index];
                saveScore(score);
            };

            function saveScore(score) {
                try {
                    $scores.update(score.index, score);
                    $scores.save();
                } catch(e) {
                    $window.alert("Error updating score: " + e);
                }
            }

            $scope.cancelEditScore = function() {
                $scores._update();
            };

            $scope.pollSheets = function() {
                return $scores.pollSheets().catch(function(err) {
                    log("pollSheets() failed", err);
                    $window.alert("failed to poll sheets: " + err);
                });
            };

            $scope.editScoresheet = function (score) {
                $scope.setPage($scope.pages.find(function (p) {return p.name === "scoresheet"}));
                $rootScope.$broadcast("editScoresheet", score)
            };

            $scope.refresh = function() {
                $scores.load();
            };
        }
    ]);
});

