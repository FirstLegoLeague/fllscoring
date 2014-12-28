define('controllers/TeamDialogController',[
    'services/ng-handshake',
    'angular'
], function() {
    var moduleName = 'TeamDialog';

    return angular.module(moduleName, []).controller('TeamDialogController',[
        '$scope', '$handshake',
        function ($scope, $handshake) {
            var defer;

            $handshake.$on('chooseTeam',function(e,teams) {
                $scope.teams = teams;
                $scope.dialogVisible = true;
                defer = $handshake.defer();
                return defer.promise;
            });

            $scope.selectTeamPop = function(team) {
                $scope.dialogVisible = false;
                defer.resolve({team:team});
            };

            $scope.cancel = function () {
                $scope.dialogVisible = false;
                defer.resolve();
            };
        }
    ]);
});
