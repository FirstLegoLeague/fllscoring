define('controllers/NewStageDialogController',[
    'services/ng-handshake',
    'angular'
], function() {
    var moduleName = 'NewStageDialog';

    return angular.module(moduleName, []).controller('NewStageDialogController',[
        '$scope', '$handshake',
        function ($scope, $handshake) {
            var defer;
            $scope.stage = {};

            $handshake.$on('newStage',function(e) {
                $scope.dialogVisible = true;
                $scope.stage = {
                    rounds: 1
                };
                defer = $handshake.defer();
                return defer.promise;
            });

            $scope.ok = function() {
                $scope.dialogVisible = false;
                defer.resolve({stage:$scope.stage});
            };

            $scope.cancel = function () {
                $scope.dialogVisible = false;
                defer.resolve();
            };
        }
    ]);
});
