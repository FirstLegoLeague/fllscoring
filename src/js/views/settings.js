define('views/settings', [
    'services/log',
    'services/ng-stages',
    'services/ng-settings',
    'services/ng-challenge',
    'services/ng-handshake',
    'controllers/NewStageDialogController',
    'angular'
], function (log) {
    var moduleName = 'settings';
    return angular.module(moduleName, [
        'NewStageDialog'
    ]).controller(moduleName + 'Ctrl', [
        '$scope', '$stages', '$settings', '$q', '$handshake', '$challenge', '$scores',
        function ($scope, $stages, $settings, $q, $handshake, $challenge, $scores) {
            log('init settings ctrl');
            $scope.log = log.get();
            // initialize first tab
            $scope.tab = 1;

            $q.all([$settings.init(), $challenge.getChallenges()]).then(function (res) {
                $scope.settings = res[0];
                $scope.settings.tables = res[0].tables || [];
                $scope.settings.referees = res[0].referees || [];
                $scope.challenges = res[1];
            });

            $scope.addItem = function (collection) {
                collection.push({});
            };
            //specialized adding for tables, finds a number in the name and adds 1 to it
            $scope.addTable = function () {
                var collection = $scope.settings.tables;
                var last = collection[collection.length - 1];
                var number = last && last.name && last.name.match(/\d+/);
                if (number) {
                    collection.push({
                        name: last.name.replace(number, parseInt(number, 10) + 1)
                    });
                } else {
                    collection.push({});
                }
            }
            $scope.removeItem = function (collection, index) {
                collection.splice(index, 1);
            };

            $scope.save = function () {
                // Updating the variable so the watch will work
                $scope.autoBroadcastStage = $settings.settings.autoBroadcastStage;
                return $q.all($settings.save(), saveStages());
            };

            function saveStages() {
                //update all stages
                var stages = angular.copy($scope.allStages);
                $stages.clear();
                stages.forEach(function (stage) {
                    return $stages.add(stage);
                });
                return $stages.save();
            };

            $scope.removeStage = function (stage) {
                return $stages.remove(stage.id);
            };

            $scope.moveDown = function (stage) {
                return $stages.moveStage(stage, 1);
            };

            $scope.moveUp = function (stage) {
                return $stages.moveStage(stage, -1);
            };

            //new stage
            $scope.createStage = function () {
                return $handshake.$emit('newStage').then(function (result) {
                    if (result) {
                        return $stages.add(result.stage);
                    }
                });
            };

            $scope.allStages = $stages.allStages;

            // need a variable on scope to watch.
            $scope.autoBroadcastStage = $settings.settings.autoBroadcastStage;
            // watching for auto broadcast change, if so broadcasting new rankings.
            $scope.$watch('autoBroadcastStage', function () {
                    if($settings.settings.autoBroadcastStage) {
                        $scores.broadcastRanking($stages.get($settings.settings.autoBroadcastStage))
                    }
                }, true)
        }
    ]);
});
