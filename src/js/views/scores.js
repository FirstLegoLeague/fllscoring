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

            $scope.editing = {}; // Keep state of currently-editing scores
            $scope.original = {}; // Keep original score when edit started

            var editableProperties = ["stageId", "round", "table", "teamNumber", "score", "published"];

            /**
             * Pick only the properties of a score that we need while editing
             * and for determining whether a score is modified (on the server)
             * while we were editing it (i.e. to cancel the edit if needed).
             * @param score A single score object from ng-scores
             * @return A new object with only properties specified in `editableProperties`
             *         copied from `score`
             */
            function scoreToEditState(score) {
                // Note that we don't use e.g. angular.copy(), because scores
                // may have subtle changes in sub-objects (e.g. $$-stuff in a
                // stage), that we don't care about for checking whether we want
                // to cancel the edit.
                // Also, scores are often 'polluted' with an extra `index`
                // property, which typically doesn't exist yet on 'fresh' scores
                // from the server.
                var editState = {};
                editableProperties.forEach(function (prop) {
                    editState[prop] = score[prop];
                });
                return editState;
            }

            // Watch for new scores. If they change, keep any edit mode
            // as long as the score didn't change since the edit was started.
            // Otherwise, cancel the edit.
            $scope.$watch("scores", function (newScores) {
                var indexes = Object.keys($scope.editing);
                indexes.forEach(function(index) {
                    // Cancel edit mode if the new server value is different
                    // than what we had before we started editing.
                    // Note that this also cancels the edit when the item is
                    // now deleted.
                    var ourOriginal = $scope.original[index];
                    var newScore = scoreToEditState(newScores[index]);
                    if (!angular.equals(ourOriginal, newScore)) {
                        delete $scope.editing[index];
                        delete $scope.original[index];
                    }
                });
            }, true);

            $scope.doSort = function(col, defaultSort) {
                $scope.rev = (String($scope.sort) === String(col)) ? !$scope.rev : !!defaultSort;
                $scope.sort = col;
            };

            $scope.removeScore = function(index) {
                $scores.remove(index);
                return $scores.save();
            };

            $scope.editScore = function(index) {
                var score = $scores.scores[index];
                // Create two copies of the score: one to store the unsaved edit,
                // and another one to compare whether a new version of the
                // server scores changed compare to what we have.
                $scope.editing[index] = angular.copy(score);
                $scope.original[index] = scoreToEditState(score);
            };

            $scope.finishEditScore = function(index) {
                // Merge our edit state back into the current
                // score entry (in case the entry was recently
                // updated on the server).
                // Prevents accidentally 'resetting' a property
                // that isn't listed in scoreToEditState().
                var merged = angular.extend({}, $scores.scores[index], $scope.editing[index]);
                delete $scope.editing[index];
                delete $scope.original[index];
                saveScore(merged);
            };

            $scope.cancelEditScore = function(index) {
                delete $scope.editing[index];
                delete $scope.original[index];
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

            function saveScore(score) {
                try {
                    $scores.update(score.index, score);
                    $scores.save();
                } catch(e) {
                    $window.alert("Error updating score: " + e);
                }
            }

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
