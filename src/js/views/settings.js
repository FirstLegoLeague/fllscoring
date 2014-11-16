define('views/settings',[
    'services/log',
    'services/ng-fs',
    'services/ng-stages',
    'services/ng-settings',
    'angular'
],function(log) {
    var moduleName = 'settings';
    return angular.module(moduleName,[]).controller(moduleName+'Ctrl',[
        '$scope', '$fs', '$stages','$settings',
        function($scope,$fs, $stages, $settings) {
            log('init settings ctrl');
            $scope.log = log.get();

            $settings.init().then(function(res) {
                $scope.settings = res;
            });

            $scope.save = function() {
                $fs.write('settings.json',$scope.settings).then(function() {
                    log('settings saved');
                },function() {
                    log('unable to write settings');
                });
            };

            $scope.stages = $stages.stages;
        }
    ]);
});
