define('controllers/DescriptionDialogController',[
    'services/ng-handshake',
    'angular'
], function() {
    var moduleName = 'DescriptionDialog';

    return angular.module(moduleName, []).controller('DescriptionDialogController',[
        '$scope', '$handshake',
        function ($scope, $handshake) {
            var defer;

            $handshake.$on('showDescription',function(e,mission) {
                $scope.mission = mission;
                $scope.dialogVisible = true;
            });

            $scope.ok = function () {
                $scope.dialogVisible = false;
            };

            $scope.cancel = function () {
                $scope.dialogVisible = false;
            };
        }
    ]);
});
