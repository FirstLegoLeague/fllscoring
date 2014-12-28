define('controllers/RoundDialogController',[
    'services/log',
    'services/ng-handshake',
    'angular'
], function(log) {
    var moduleName = 'RoundDialog';

    return angular.module(moduleName, []).controller('RoundDialogController',[
        '$scope', '$handshake',
        function ($scope, $handshake) {
            var defer;

            $handshake.$on('chooseRound',function(e,stages) {
                $scope.stages = stages;
                $scope.dialogVisible = true;
                defer = $handshake.defer();
                return defer.promise;
            });

            // function that should be in the lib:
            $scope.getNumber = function(num) {
                return new Array(num);
            };

            $scope.selectRoundPop = function(stage, round) {
                log("after OK: " + $scope.round);
                $scope.dialogVisible = false;
                defer.resolve({stage:stage, round:round});
            };

            $scope.cancel = function () {
                $scope.dialogVisible = false;
                defer.resolve();
            };
        }
    ]);
});
