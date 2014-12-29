define('views/teams',[
    'services/log',
    'services/ng-teams',
    'services/ng-handshake',
    'controllers/TeamImportDialogController',
    'angular'
], function(log) {
    var moduleName = 'teams';

    return angular.module(moduleName, [
            'TeamImportDialog'
        ]).config(['$httpProvider', function($httpProvider) {
            delete $httpProvider.defaults.headers.common["X-Requested-With"];
        }]).controller(moduleName + 'Ctrl', [
        '$scope','$http','$q','$teams','$handshake',
        function($scope,$http,$q,$teams,$handshake) {

            log('init teams ctrl');
            $scope.log = log.get();
            $scope.teams = $teams.teams;
            $scope.newTeam = {};
            $scope.editMode = false;
            $scope.teamNumberPattern = /^\d+$/;
            $scope.status = "Initializing...";
            $scope.importMode = false;

            var initialized = null;

            $scope.init = function() {
                if (!initialized) {
                    initialized = $teams.init().then(function() {
                        if ($teams.teams.length === 0) {
                            $scope.status = 'No stored teams found, you may add them by hand';
                            $scope.editMode = true;
                        } else {
                            $scope.status = '';
                        }
                    });
                }
                return initialized;
            };
            $scope.init();

            $scope.load = function() {
                var url = 'http://fll.mobilesorcery.nl/api/public/teams/';
                return $http.get(url).success(function(res) {
                    $teams.clear();
                    res.forEach(function(team) {
                        $teams.add({
                            number: team.id,
                            name: team.name,
                            affiliation: team.affiliation,
                            cityState: team.cityState,
                            country: team.country,
                            coach1: team.coach1,
                            coach2: team.coach2,
                            judgingGroup: team.judgingGroup,
                            pitLocation: team.pitLocation,
                            translationNeeded: team.translationNeeded
                        });
                    });
                    return $scope.saveTeams().then(function() {
                        log('successfully retrieved and saved teams');
                    });
                }).error(function() {
                    log('failed retrieving teams');
                });
            };

            $scope.import = function() {
                $handshake.$emit('importTeams').then(function(result) {
                    if (result) {
                        $teams.clear();
                        result.teams.forEach(function(team) {
                            $teams.add({
                                number: team.number,
                                name: team.name
                            });
                        });
                    }
                });
            };

            $scope.selectTeam = function(team) {
                $scope.setPage('scoresheet');
                $scope.$root.$emit('selectTeam',team);
            };

            $scope.canAddTeam = function() {
                return !!($scope.newTeam.name && $scope.newTeam.number);
            };

            $scope.addTeam = function() {
                if (!$scope.canAddTeam()) {
                    return $q.reject(new Error("cannot add team"));
                }
                $teams.add($scope.newTeam);
                $scope.newTeam = {};
                return $scope.saveTeams();
            };

            $scope.removeTeam = function(number) {
                $teams.remove(number);
                return $scope.saveTeams();
            };

            $scope.saveTeams = function() {
                $scope.saving = true;
                // Teams used to be managed by the scope, but
                // that's now moved to a service.
                // However, most of the logic still assumes
                // being able to directly edit the team's properties.
                // To make transition to the service smooth and quick,
                // we simply copy the desired-teams-list, and (re-)add
                // these to the teams service.
                var newTeams = $scope.teams.slice();
                $teams.clear();
                newTeams.forEach(function(team) {
                    $teams.add(team);
                });
                return $teams.save().finally(function() {
                    $scope.saving = false;
                });
            };

            $scope.toggleExtended = function(isCollapsed) {
                if ($scope.editMode) {
                    return isCollapsed;
                } else {
                    return !isCollapsed;
                }
            };
        }
    ]);
});
