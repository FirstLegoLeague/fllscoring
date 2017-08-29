define('views/scores',[
    'services/log',
    'services/ng-scores',
    'directives/really',
    'angular'
],function(log) {
    var moduleName = 'scores';
    return angular.module(moduleName,['filters']).controller(moduleName+'Ctrl',[
        '$scope', '$scores','$teams','$stages','$window',
        function($scope,$scores,$teams,$stages,$window) {
            log('init scores ctrl');

            $scope.sort = 'index';
            $scope.rev = true;

            function enrich(scores) {
                return scores.map(score => {
                    score.team = $teams.get(score.teamNumber);
                    score.stage = $stages.get(score.stageId);
                    return score;
                });
            }

            $scores.init().then(function() {
                $scope.scores = enrich($scores.scores);
                $scope.stages = $stages.stages;
            })

            $scope.$watch(function() {
                return $scores.scores;
            }, function() {
                $scope.scores = enrich($scores.scores);
            });

            $scope.doSort = function(col, defaultSort) {
                $scope.rev = (String($scope.sort) === String(col)) ? !$scope.rev : !!defaultSort;
                $scope.sort = col;
            };
            $scope.deleteScore = function(score) {
                $scores.delete(score);
            };
            $scope.editScore = function(score) {
                score.$editing = true;
            };

            $scope.publishScore = function(score) {
                var wasPublished = score.published;
                score.published = true;
                saveScore(score, wasPublished);
            };

            $scope.unpublishScore = function(score) {
                var wasPublished = score.published;
                score.published = false;
                saveScore(score, wasPublished);
            };

            $scope.finishEditScore = function(score) {
                // The score entry is edited 'inline', then used to
                // replace the entry in the scores list and its storage.
                // Because scores are always 'sanitized' before storing,
                // the $editing flag is automatically discarded.
                score.$editing = false;
                saveScore(score);
            };

            function saveScore(score, forceAutoBroadcast) {
                try {
                    $scores.update(score, forceAutoBroadcast);
                } catch(e) {
                    $window.alert("Error updating score: " + e);
                }
            }

            $scope.cancelEditScore = function(score) {
                score.$editing = false;
            };

            $scope.refresh = function() {
                $scores.load();
            };
        }
    ]);
});
