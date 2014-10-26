describe('teams', function() {

    var module = factory('views/teams', {
        'services/log': logMock
    });

    var $scope, controller, $httpBackend;
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
    var fsMock = createFsMock({'teams.json': [mockTeam]});

    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.inject(function($controller, $rootScope,_$httpBackend_) {
            $scope = $rootScope.$new();
            $httpBackend = _$httpBackend_;
            $httpBackend.when('GET','http://fll.mobilesorcery.nl/api/public/teams/')
            .respond([
                mockRemoteTeam
            ]);
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
            expect(fsMock.read).toHaveBeenCalled();
            //TODO: check state after reading
        });

    });

    describe('missing teams.json on storage',function() {
        beforeEach(function() {
            fsMock.read = jasmine.createSpy('fsReadSpy').andCallFake(function() {
                return Q.reject('no file found');
            });
        })
        it('should initialize in editmode when no teams found on storage', function() {
            expect($scope.teams).toEqual([]);
            expect($scope.newTeam).toEqual({});
            expect($scope.editMode).toBe(false);
            //TODO: check state after reading
        });
    });

    describe('load', function() {
        it('should call the web service for new teams',function() {
            $scope.load();
            $scope.saveTeams = jasmine.createSpy('saveTeamsSpy');
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
            $scope.saveTeams = jasmine.createSpy('saveTeams');
            $scope.newTeam = mockTeam;
            $scope.addTeam();
            expect($scope.teams).toEqual([mockTeam]);
            expect($scope.newTeam).toEqual({});
            expect($scope.saveTeams).toHaveBeenCalled();
        });
        it('should not add a team when data is incomplete', function() {
            $scope.saveTeams = jasmine.createSpy('saveTeams');
            $scope.newTeam = {foo:'bar'};
            $scope.addTeam();
            expect($scope.teams).toEqual([]);
            expect($scope.newTeam).toEqual({foo:'bar'});
            expect($scope.saveTeams).not.toHaveBeenCalled();
        });
    });

    describe('removeTeam', function() {
        it('should remove the team with the given index', function() {
            $scope.saveTeams = jasmine.createSpy('saveTeams');
            $scope.teams = [mockTeam];
            $scope.removeTeam(0);
            expect($scope.teams).toEqual([]);
            expect($scope.saveTeams).toHaveBeenCalled();
        });
    });

    describe('saveTeams', function() {
        it('should call the fs write with the teams', function() {
            $scope.teams = [mockTeam];
            $scope.saveTeams();
            expect(fsMock.write).toHaveBeenCalledWith('teams.json', [mockTeam]);
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
