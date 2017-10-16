describe('teams', function() {

    var module = factory('views/teams', {
        'services/log': logMock,
        'services/ng-throttle': factory('services/ng-throttle'),
        'controllers/TeamImportDialogController': factory('controllers/TeamImportDialogController')
    });

    var $scope, controller, $httpBackend, $teams, handshakeMock;
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

    describe('missing teams.json on storage',function() {
        beforeEach(function() {
            angular.mock.module('services');
            angular.mock.module(module.name);
            angular.mock.inject(function($controller, $rootScope, $q) {
                $scope = $rootScope.$new();
                $teams = createTeamsMock([]);
                handshakeMock = createHandshakeMock($q);
                controller = $controller('teamsCtrl', {
                    '$scope': $scope,
                    '$teams': $teams,
                    '$handshake': handshakeMock
                });
            });
            return $scope.init();
        });

        it('should initialize in editmode when no teams found on storage', function() {
            expect($scope.teams).toEqual([]);
            expect($scope.newTeam).toEqual({});
            expect($scope.editMode).toBe(true);
            expect($scope.status).toBe('No stored teams found, you may add them by hand');
        });
    });

    describe('stored teams',function() {
        beforeEach(function() {
            angular.mock.module('TeamImportDialog');
            angular.mock.module('services');
            angular.mock.module(module.name);
            angular.mock.inject(function($controller, $rootScope, _$httpBackend_,$q) {
                $scope = $rootScope.$new();
                $httpBackend = _$httpBackend_;
                $teams = createTeamsMock([mockTeam]);
                handshakeMock = createHandshakeMock($q);
                controller = $controller('teamsCtrl', {
                    '$scope': $scope,
                    '$teams': $teams,
                    '$handshake': handshakeMock
                });
            });
            return $scope.init().then(function() {
                // Let initialization finish completely, in order to start with a
                // clean slate of the spies
                $scope.$digest();
                $teams.add.calls.reset();
                $teams.clear.calls.reset();
                // NOTE: don't clear $teams.save here or the init test becomes useless!
            });
        });

        beforeEach(function() {
            //spy setPage method;
            $scope.setPage = jasmine.createSpy('setPage');
        });

        describe('initialization', function() {
            it('should initialize', function() {
                expect($scope.teams).toEqual([mockTeam]);
                expect($scope.newTeam).toEqual({});
                expect($scope.editMode).toBe(false);
            });
            it('should not unnecessarily save teams', function() {
                $scope.$digest();
                expect($teams.save).not.toHaveBeenCalled();
            });
        });

        describe('load', function() {
            it('should call the web service for new teams',function() {
                $httpBackend.when('GET','http://fll.mobilesorcery.nl/api/public/teams/')
                    .respond([
                        mockRemoteTeam
                    ]);
                $scope.load();
                $scope.saveTeams = jasmine.createSpy('saveTeamsSpy').and.returnValue(Q.when());
                $httpBackend.flush();
                expect($teams.clear).toHaveBeenCalled();
                expect($scope.saveTeams).toHaveBeenCalled();
                expect($scope.teams).toEqual([mockTeam]);
            });
            it('should log failing get when teams cannot be found',function() {
                $httpBackend.when('GET','http://fll.mobilesorcery.nl/api/public/teams/')
                    .respond(404);
                $scope.load();
                $httpBackend.flush();
                expect(logMock).toHaveBeenCalledWith('failed retrieving teams');
            });
        });

        describe('import',function() {
            it('should emit the importTeams handshake and add teams on result',function() {
                handshakeMock.respond({
                    teams: [{number:42,name:'foo'}]
                });
                $scope.import();
                expect(handshakeMock.$emit).toHaveBeenCalledWith('importTeams');
                $scope.$digest();
                expect($teams.add).toHaveBeenCalledWith({number:42,name:'foo'});
            });

            it('should be ok when no result is returned',function() {
                $scope.import();
                expect(handshakeMock.$emit).toHaveBeenCalledWith('importTeams');
                $scope.$digest();
                expect($teams.add).not.toHaveBeenCalled();
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
                expect(eventSpy.calls.mostRecent().args[1]).toBe(team);
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
                $scope.saveTeams = jasmine.createSpy('saveTeams').and.returnValue(Q.when());
                $scope.newTeam = mockTeam;
                return $scope.addTeam().then(function() {
                    expect($teams.add).toHaveBeenCalledWith(mockTeam);
                    expect($scope.newTeam).toEqual({});
                    expect($scope.saveTeams).toHaveBeenCalled();
                });
            });
            it('should not add a team when data is incomplete', function() {
                $scope.saveTeams = jasmine.createSpy('saveTeams').and.returnValue(Q.when());
                $scope.newTeam = {foo:'bar'};
                return $scope.addTeam().catch(function(err) {
                    expect(err).toEqual(jasmine.any(Error));
                    expect($teams.add).not.toHaveBeenCalled();
                    expect($scope.newTeam).toEqual({foo:'bar'});
                    expect($scope.saveTeams).not.toHaveBeenCalled();
                });
            });
        });

        describe('removeTeam', function() {
            it('should remove the team with the given index', function() {
                $scope.saveTeams = jasmine.createSpy('saveTeams').and.returnValue(Q.when());
                return $scope.removeTeam(123).then(function() {
                    expect($teams.remove).toHaveBeenCalledWith(123);
                    expect($scope.saveTeams).toHaveBeenCalled();
                });
            });
        });

        describe('saveTeams', function() {
            it('should call $teams.save', function() {
                $scope.teams = [mockTeam];
                return $scope.saveTeams().then(function() {
                    expect($teams.save).toHaveBeenCalled();
                });
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
});
