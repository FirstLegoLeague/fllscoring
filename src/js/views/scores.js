define([
    'services/log',
    'services/ng-scores',
    'angular'
],function(log) {
    var moduleName = 'scores';
    return angular.module(moduleName,[]).controller(moduleName+'Ctrl',[
        '$scope', '$scores',
        function($scope,$scores) {
            log('init scores ctrl');

            $scope.sort = 'score';
            $scope.rev = true;

            $scope.scores = $scores.scores;

            $scope.removeScore = function(index) {
                $scores.remove(index);
            };
            $scope.editScore = function(index) {
                alert("todo");
            };
        }
    ]);
});
