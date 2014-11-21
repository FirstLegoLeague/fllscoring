define('views/scores',[
    'services/log',
    'services/ng-scores',
    'directives/really',
    'angular'
],function(log) {
    var moduleName = 'scores';
    return angular.module(moduleName,[]).controller(moduleName+'Ctrl',[
        '$scope', '$scores','$teams',
        function($scope,$scores,$teams) {
            log('init scores ctrl');

            $scope.sort = 'index';
            $scope.rev = true;

            $scope.scores = $scores.scores;

            $scope.doSort = function(col, defaultSort) {
                $scope.rev = (String($scope.sort) === String(col)) ? !$scope.rev : defaultSort;
                $scope.sort = col;
            };
            $scope.removeScore = function(index) {
                $scores.remove(index);
                return $scores.save();
            };
            $scope.editScore = function(index) {
                var score = $scores.scores[index];
                score.teamNumber = score.team.number;
                score.$editing = true;
            };

            $scope.finishEditScore = function(index) {
                var score = $scores.scores[index];
                score.team = $teams.get(score.teamNumber);
                if (!score.team) {
                    alert('Team number not found');
                    return;
                }
                score.round = parseInt(score.round,10);
                score.score = parseInt(score.score,10);
                delete score.$editing;
                $scores.update(score.index,score);
                $scores.save();
            };

            $scope.cancelEditScore = function() {
                $scores._update();
            };

            $scope.pollSheets = function() {
                return $scores.pollSheets().catch(function(err) {
                    console.log("pollSheets() failed", err);
                    alert("failed to poll sheets: " + err);
                });
            };

            $scope.refresh = function() {
                $scores.load();
            };
        }
    ]);
});
