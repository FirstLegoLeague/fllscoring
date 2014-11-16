define('views/settings',[
    'services/log',
    'services/ng-stages',
    'services/ng-settings',
    'angular'
],function(log) {
    var moduleName = 'settings';
    return angular.module(moduleName,[]).controller(moduleName+'Ctrl',[
        '$scope', '$stages','$settings',
        function($scope, $stages, $settings) {
            log('init settings ctrl');
            $scope.log = log.get();

            $settings.init().then(function(res) {
                $scope.settings = res;
            });

            $scope.save = function() {
                return $settings.save();
            };

            $scope.stages = $stages.stages;
        }
    ]);
});
