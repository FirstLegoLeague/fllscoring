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

            $scope.removeScore = function(index) {
                $scores.remove(index);
                return $scores.save();
            };
            $scope.editScore = function(index) {
                alert("todo edit team/round/score " + $scores.scores[index].score);
            };
        }
    ]);
});
