describe('teams', function() {

    var module = factory('views/teams', {
        'services/log': logMock
    });

    var $scope, controller;
    var dummyTeam = {
        number: '123',
        name: 'foo'
    };
    var fsMock;

    beforeEach(function() {
        fsMock = {
            read: jasmine.createSpy('fsRead').andReturn({
                then: function() {}
            }),
            write: jasmine.createSpy('fsWrite').andReturn({
                then: function() {
                    return {
                        then: function() {}
                    }
                }
            })
        };
        angular.mock.module(module.name);
        angular.mock.inject(function($controller, $rootScope) {
            $scope = $rootScope.$new();
            controller = $controller('teamsCtrl', {
                '$scope': $scope,
                '$fs': fsMock
            });
        });
    });

    beforeEach(function() {
        //spy setPage method;
        $scope.setPage = jasmine.createSpy('setPage');
    })

    describe('initialization', function() {
        it('should initialize', function() {
            expect($scope.teams).toEqual([]);
            expect($scope.newTeam).toEqual({});
            expect($scope.editMode).toBe(false);
        });
    });

    describe('load', function() {

    });

    describe('selectTeam', function() {
        it('shoud select the scoresheet page', function() {
            var team = dummyTeam;
            var eventSpy = jasmine.createSpy('eventSpy');
            $scope.$root.$on('selectTeam', eventSpy);
            $scope.selectTeam(team);
            expect($scope.setPage).toHaveBeenCalledWith('scoresheet');
            expect(eventSpy).toHaveBeenCalled();
            expect(eventSpy.mostRecentCall.args[1]).toBe(team);
        });
    });

    describe('canAddTeam', function() {
        it('should not allow adding when name or number is missing', function() {
            $scope.newTeam = {};
            expect($scope.canAddTeam()).toBe(false);
        });
    });

    describe('addTeam', function() {
        it('should add the newTeam from scope to the teams list and black the new team and save it', function() {
            $scope.saveTeams = jasmine.createSpy('saveTeams');
            $scope.newTeam = dummyTeam;
            $scope.addTeam();
            expect($scope.teams).toEqual([dummyTeam]);
            expect($scope.newTeam).toEqual({});
            expect($scope.saveTeams).toHaveBeenCalled();
        });
    });

    describe('removeTeam', function() {
        it('should remove the team with the given index', function() {
            $scope.saveTeams = jasmine.createSpy('saveTeams');
            $scope.teams = [dummyTeam];
            $scope.removeTeam(0);
            expect($scope.teams).toEqual([]);
            expect($scope.saveTeams).toHaveBeenCalled();
        });
    });

    describe('saveTeams', function() {
        it('should call the fs write with the teams', function() {
            $scope.teams = [dummyTeam];
            $scope.saveTeams();
            expect(fsMock.write).toHaveBeenCalledWith('teams.json', [dummyTeam]);
        });
    });
});
