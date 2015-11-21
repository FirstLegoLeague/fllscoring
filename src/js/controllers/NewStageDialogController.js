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
                $scope.generateId = true; // automatically generate ID from name?
                $scope.stage = {
                    rounds: 1
                };
                defer = $handshake.defer();
                return defer.promise;
            });

            $scope.nameChanged = function() {
                if ($scope.generateId && typeof $scope.stage.name === 'string') {
                    var name = $scope.stage.name;
                    // Convert e.g. 'Some - Text' to 'some_text'
                    var id = name.toLowerCase().replace(' ', '_').replace(/[^a-z0-9_]/g, '').replace(/_+/g, '_');
                    $scope.stage.id = id;
                }
            };

            $scope.idChanged = function() {
                $scope.generateId = false;
            };

            $scope.ok = function() {
                $scope.dialogVisible = false;
                defer.resolve({stage:$scope.stage});
            };

            $scope.cancel = function () {
                $scope.dialogVisible = false;
                defer.resolve();
            };

            $scope.stageDefValid = function() {
                return !!($scope.stage.id && $scope.stage.name);
            };
        }
    ]);
});
