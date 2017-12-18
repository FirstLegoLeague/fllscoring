define('controllers/TeamImportDialogController', [
    'services/ng-handshake',
    'angular'
], function () {
    var moduleName = 'TeamImportDialog';

    return angular.module(moduleName, []).controller('TeamImportDialogController', [
        '$scope', '$handshake',
        function ($scope, $handshake) {
            var defer;

            function parseData(data) {
                //parse raw import, split lines
                var lines = data ? data.split(/[\n\r]/) : [];
                if ($scope.importHeader) {
                    lines.shift();
                }
                lines = lines.map(function (line) {
                    if ($scope.useCustomDelimiter) {
                        return line.split($scope.delimiter);
                    }
                    //split by tab character
                    return line.split(/\t/);
                });
                //try to guess names and number columns
                $scope.importNumberColumn = 1;
                $scope.importNameColumn = 2;

                if (lines[0]) {
                    $scope.importNumberExample = lines[0][$scope.importNumberColumn - 1];
                    $scope.importNameExample = lines[0][$scope.importNameColumn - 1];
                } else {
                    $scope.importNumberExample = '';
                    $scope.importNameExample = '';
                }

                $scope.importLines = lines;
            }

            $scope.$watch('importRaw', function (data) {
                parseData($scope.importRaw);
            });

            $scope.$watch('importHeader', function (data) {
                parseData($scope.importRaw);
            });

            $scope.$watch('useCustomDelimiter', function (data) {
                parseData($scope.importRaw)
            });

            $scope.$watch('delimiter', function (data) {
                parseData($scope.importRaw)
            });


            $handshake.$on('importTeams', function (e) {
                $scope.dialogVisible = true;
                defer = $handshake.defer();
                return defer.promise;
            });

            $scope.ok = function () {
                $scope.dialogVisible = false;
                var teams = $scope.importLines.map(function (line) {
                    return {
                        number: line[$scope.importNumberColumn - 1],
                        name: line[$scope.importNameColumn - 1]
                    };
                });
                defer.resolve({teams: teams});
            };

            $scope.cancel = function () {
                $scope.dialogVisible = false;
                defer.resolve();
            };
        }
    ]);
});
