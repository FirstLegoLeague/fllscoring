define('controllers/TeamDialogController',[
    'services/ng-settings',
    'services/ng-handshake',
    'angular'
], function() {
    var moduleName = 'TeamDialog';

    return angular.module(moduleName, []).controller('TeamDialogController',[
        '$scope', '$settings', '$handshake',
        function ($scope, $settings, $handshake) {
            $settings.init().then(function(res) {
                $scope.settings = res;
                return $scope.show();
            });

            $scope.show = function() {
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
            };
        }
    ]);
});
