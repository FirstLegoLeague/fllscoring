describe('teams', function() {

    var module = factory('views/teams', {
        'services/log': logMock
    });

    var $scope, controller, $httpBackend, $teams;
    var mockTeam = {
        name: 'foo',
        number: 123,
        affiliation: 'bar',
        cityState: 'baz',
        country: 'kux',
        coach1: 'poo',
        coach2: 'mux',
        judgingGroup: 'bear',
        pitLocation: 'moo',
        translationNeeded: false
    };
    //resource returned from teams server
    var mockRemoteTeam = {
        id: 123,
        name: 'foo',
        affiliation: 'bar',
        cityState: 'baz',
        country: 'kux',
        coach1: 'poo',
        coach2: 'mux',
        judgingGroup: 'bear',
        pitLocation: 'moo',
        translationNeeded: false
    };

    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.inject(function($controller, $rootScope, _$httpBackend_) {
            $scope = $rootScope.$new();
            $httpBackend = _$httpBackend_;
            $httpBackend.when('GET','http://fll.mobilesorcery.nl/api/public/teams/')
            .respond([
                mockRemoteTeam
            ]);
            $teams = createTeamsMock([mockTeam]);
            controller = $controller('teamsCtrl', {
                '$scope': $scope,
                '$teams': $teams
            });
        });
        return $scope.init();
    });

    beforeEach(function() {
        //spy setPage method;
        $scope.setPage = jasmine.createSpy('setPage');
    })

    describe('initialization', function() {
        it('should initialize', function() {
            expect($scope.teams).toEqual([mockTeam]);
            expect($scope.newTeam).toEqual({});
            expect($scope.editMode).toBe(false);
        });

    });

    xdescribe('missing teams.json on storage',function() {
        beforeEach(function() {
            // TODO: this test is broken, because $scope.init() is already called
            // before this test starts, as construction of the controller has
            // been done by an earlier beforeEach() call.
            // So, the teams have already been loaded.
            $teams.teams = [];
        })
        it('should initialize in editmode when no teams found on storage', function() {
            expect($scope.teams).toEqual([]);
            expect($scope.newTeam).toEqual({});
            expect($scope.editMode).toBe(true);
        });
    });

    describe('load', function() {
        it('should call the web service for new teams',function() {
            $scope.load();
            $scope.saveTeams = jasmine.createSpy('saveTeamsSpy').andReturn(Q.when());
            $httpBackend.flush();
            expect($scope.saveTeams).toHaveBeenCalled();
            expect($scope.teams).toEqual([mockTeam])
        });
    });

    describe('selectTeam', function() {
        it('shoud select the scoresheet page', function() {
            var team = mockTeam;
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
        it('should add the newTeam from scope to the teams list and blank the new team and save it', function() {
            $scope.saveTeams = jasmine.createSpy('saveTeams').andReturn(Q.when());
            $scope.newTeam = mockTeam;
            $scope.addTeam();
            expect($teams.add).toHaveBeenCalledWith(mockTeam);
            expect($scope.newTeam).toEqual({});
            expect($scope.saveTeams).toHaveBeenCalled();
        });
        it('should not add a team when data is incomplete', function() {
            $scope.saveTeams = jasmine.createSpy('saveTeams').andReturn(Q.when());
            $scope.newTeam = {foo:'bar'};
            $scope.addTeam();
            expect($teams.add).not.toHaveBeenCalled();
            expect($scope.newTeam).toEqual({foo:'bar'});
            expect($scope.saveTeams).not.toHaveBeenCalled();
        });
    });

    describe('removeTeam', function() {
        it('should remove the team with the given index', function() {
            $scope.saveTeams = jasmine.createSpy('saveTeams').andReturn(Q.when());
            $scope.removeTeam(123);
            expect($teams.remove).toHaveBeenCalledWith(123);
            expect($scope.saveTeams).toHaveBeenCalled();
        });
    });

    describe('saveTeams', function() {
        it('should call $teams.save', function() {
            $scope.teams = [mockTeam];
            $scope.saveTeams();
            expect($teams.save).toHaveBeenCalled();
        });
    });

    describe('toggleExtended',function() {
        it('should not toggle when in edit mode',function() {
            $scope.editMode = true;
            expect($scope.toggleExtended(true)).toBe(true);
            expect($scope.toggleExtended(false)).toBe(false);
        });
        it('should toggle when not in edit mode',function() {
            $scope.editMode = false;
            expect($scope.toggleExtended(true)).toBe(false);
            expect($scope.toggleExtended(false)).toBe(true);
        });
    });
});
