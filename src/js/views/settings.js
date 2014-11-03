define('views/settings',[
    'services/log',
    'services/ng-fs',
    'angular'
],function(log) {
    var moduleName = 'settings';
    return angular.module(moduleName,[]).controller(moduleName+'Ctrl',[
        '$scope', '$fs', '$stages',
        function($scope,$fs, $stages) {
            log('init settings ctrl');
            $scope.log = log.get();

            $fs.read('settings.json').then(function(res) {
                $scope.settings = res;
            },function() {
                $scope.settings = {};
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
