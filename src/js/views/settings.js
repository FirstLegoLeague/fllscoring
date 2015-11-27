define('views/settings',[
    'services/log',
    'services/ng-stages',
    'services/ng-settings',
    'services/ng-handshake',
    'controllers/NewStageDialogController',
    'angular'
],function(log) {
    var moduleName = 'settings';
    return angular.module(moduleName,[
        'NewStageDialog'
    ]).controller(moduleName+'Ctrl',[
        '$scope', '$stages','$settings','$q','$handshake',
        function($scope, $stages, $settings, $q, $handshake) {
            log('init settings ctrl');
            $scope.log = log.get();
            // initialize first tab
            $scope.tab = 1;

            $settings.init().then(function(res) {
                $scope.settings = res;
                $scope.settings.tables = res.tables||[];
                $scope.settings.referees = res.referees||[];
            });

            $scope.addItem = function(collection) {
                collection.push({});
            };
            $scope.removeItem = function(collection,index) {
                collection.splice(index,1);
            };

            $scope.save = function() {
                return $q.all($settings.save(), saveStages());
            };

            function saveStages() {
                //update all stages
                var stages = angular.copy($scope.allStages);
                $stages.clear();
                stages.forEach($scope.addStage);
                return $stages.save();
            };

            $scope.addStage = function(stage) {
                return $stages.add(stage);
            }

            $scope.removeStage = function(stage) {
                return $stages.remove(stage.id);
            };

            $scope.moveDown = function(stage) {
                return $stages.moveStage(stage,1);
            };

            $scope.moveUp = function(stage) {
                return $stages.moveStage(stage,-1);
            };

            //new stage
            $scope.createStage = function() {
                return $handshake.$emit('newStage').then(function(result) {
                    if (result) {
                        return $stages.add(result.stage);
                    }
                });
            };

            $scope.allStages = $stages.allStages;
        }
    ]);
});
