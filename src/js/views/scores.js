define('views/scores',[
    'services/log',
    'services/ng-scores',
    'directives/really',
    'angular'
],function(log) {
    var moduleName = 'scores';
    return angular.module(moduleName,[]).controller(moduleName+'Ctrl',[
        '$scope', '$scores',
        function($scope,$scores) {
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
                alert("todo edit team/round/score " + $scores.scores[index].score);
            };
            $scope.pollSheets = function(index) {
                return $scores.pollSheets().catch(function(err) {
                    console.log("pollSheets() failed", err);
                    alert("failed to poll sheets: " + err);
                });
            }
        }
    ]);
});
