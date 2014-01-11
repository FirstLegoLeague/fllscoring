define([
    'services/log',
    'services/ng-fs',
    'angular'
], function(log) {
    var moduleName = 'teams';

    return angular.module(moduleName, []).config(['$httpProvider', function($httpProvider) {
            delete $httpProvider.defaults.headers.common["X-Requested-With"];
        }]).controller(moduleName + 'Ctrl', [
        '$scope','$fs','$http',
        function($scope,$fs,$http) {
            console.log($fs);

            log('init teams ctrl');
            $scope.log = log.get();
            $scope.teams = [];
            $scope.newTeam = {};
            $scope.editMode = false;
            $scope.teamNumberPattern = /\d+/;

            $fs.read('teams.json').then(function(teams) {
                $scope.status = '';
                $scope.teams = teams;
            },function() {
                log('error getting teams');
                $scope.status = 'No stored teams found, you may add them by hand';
                $scope.editMode = true;
            });

            $scope.load = function() {
                var url = 'http://fll.mobilesorcery.nl/api/public/teams/';
                $http.get(url).success(function(res) {
                    $scope.teams = res.map(function(team) {
                        return {
                            number: team.id,
                            name: team.name
                        };
                    });
                    $scope.saveTeams();
                }).error(function() {
                    log('failed retrieving teams');
                });
            };

            $scope.addTeam = function() {
                $scope.teams.push(angular.copy($scope.newTeam));
                $scope.newTeam = {};
                $scope.saveTeams();
            };

            $scope.removeTeam = function(index) {
                $scope.teams.splice(index, 1);
                $scope.saveTeams();
            };

            $scope.saveTeams = function() {
                $scope.saving = true;
                return $fs.write('teams.json', $scope.teams).then(function() {
                    log('saved teams');
                },function() {
                    log('error writing teams');
                }).then(function() {
                    $scope.saving = false;
                });
            };
        }
    ]);
});
