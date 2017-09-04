define('views/scores', [
    'services/log',
    'services/ng-scores',
    'directives/really',
    'angular'
], function (log) {
    var moduleName = 'scores';
    return angular.module(moduleName, ['filters']).controller(moduleName + 'Ctrl', [
        '$scope', '$scores', '$teams', '$stages', '$window',
        function ($scope, $scores, $teams, $stages, $window) {
            log('init scores ctrl');

            $scope.sort = 'index';
            $scope.rev = true;

            function enrich(scores) {
                return scores.map(score => {
                    var enrichedScore = {};
                    for(var key in score) enrichedScore[key] = score[key];
                    enrichedScore.team = $teams.get(score.teamNumber);
                    enrichedScore.stage = $stages.get(score.stageId);
                    return enrichedScore;
                });
            }

            $scope.$watch(function () {
                return $scores.scores;
            }, function () {
                $scope.scores = enrich($scores.scores);
            });

            $scores.init().then(function() {
                $scope.stages = $stages.stages;
            });

            $scope.doSort = function(col, defaultSort) {
                $scope.rev = (String($scope.sort) === String(col)) ? !$scope.rev : !!defaultSort;
                $scope.sort = col;
            };

            $scope.sortIcon = function (col) {
                if (!angular.equals($scope.sort, col)) {
                    return '';
                }
                if ($scope.rev) {
                    return 'arrow_drop_down';
                } else {
                    return 'arrow_drop_up';
                }
            };

            $scope.deleteScore = function (score) {
                $scores.delete(score);
            };

            $scope.editScore = function (score) {
                score.$editing = true;
            };

            $scope.publishScore = function (score) {
                score.published = true;
                saveScore(score);
            };

            $scope.unpublishScore = function (score) {
                score.published = false;
                saveScore(score);
            };

            $scope.finishEditScore = function (score) {
                // The score entry is edited 'inline', then used to
                // replace the entry in the scores list and its storage.
                // Because scores are always 'sanitized' before storing,
                // the $editing flag is automatically discarded.
                score.$editing = false;
                saveScore(score);
            };

            function saveScore(score) {
                try {
                    $scores.update(score);
                } catch (e) {
                    $window.alert("Error updating score: " + e);
                }
            }

            $scope.cancelEditScore = function (score) {
                score.$editing = false;
            };

            $scope.refresh = function () {
                $scores.load();
            };
        }]);
});
