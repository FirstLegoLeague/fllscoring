define([
    'services/log',
    'services/fs',
    'angular'
],function(log,fs) {
    var moduleName = 'teams';
    angular.module(moduleName,[]).controller(moduleName+'Ctrl',[
        '$scope',
        function($scope) {
            log('init teams ctrl');
            $scope.log = log.get();
            $scope.status = 'loading teams';
            $scope.teams = [];
            $scope.newTeam = {};

            fs.read('teams.json').then(function(teams) {
                $scope.status = '';
                $scope.teams = JSON.parse(teams);
            }).fail(function() {
                log('error getting teams');
                $scope.status = 'no stored teams found, you may add them by hand';
            }).then(function() {
                $scope.$apply();
            });

            $scope.addTeam = function() {
                $scope.teams.push(angular.copy($scope.newTeam));
                $scope.newTeam = {};
                $scope.saving = true;
                fs.write('teams.json',JSON.stringify($scope.teams)).then(function() {
                    log('saved teams');
                }).fail(function() {
                    log('error writing teams');
                }).then(function() {
                    $scope.saving = false;
                    $scope.$apply();
                });
            };
        }
    ]);
    return moduleName;
});
