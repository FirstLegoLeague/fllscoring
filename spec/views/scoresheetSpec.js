describe('scoresheet',function() {

    var module = factory('views/scoresheet',{
        'services/log': logMock,
        'controllers/DescriptionDialogController': factory('controllers/DescriptionDialogController'),
        'controllers/TeamDialogController': factory('controllers/TeamDialogController'),
        'controllers/RoundDialogController': factory('controllers/RoundDialogController')
    });

    var $scope, controller;
    var dummyTeam =  {
        number: '123',
        name: 'foo'
    };
    var dummyStage = { id: "qualifying", name: "Voorrondes", rounds: 3 };
    var fsMock = createFsMock({"settings.json": []});
    var settingsMock, handshakeMock;

    beforeEach(function() {
        angular.mock.module('DescriptionDialog');
        angular.mock.module('TeamDialog');
        angular.mock.module('RoundDialog');
        angular.mock.module(module.name);
        angular.mock.inject(function($controller,$rootScope,$q) {
            settingsMock = createSettingsMock($q,{});
            handshakeMock = createHandshakeMock($q);
            $scope = $rootScope.$new();
            controller = $controller('scoresheetCtrl', {
                '$scope': $scope,
                '$fs': fsMock,
                '$settings': settingsMock,
                '$stages': {},
                '$handshake': handshakeMock,
                '$teams': {},
                '$challenge': challengeMock,
                '$window': {
                    Date: function() {
                        this.valueOf = function() {
                            return 42;
                        };
                    }
                }
            });
        });
    });

    beforeEach(function() {
        //spy setPage method;
        $scope.setPage = jasmine.createSpy('setPage');
    });

    describe('initialization',function() {
        it('should initialize',function() {

        });
    });

    describe('isSaveable',function() {
        beforeEach(function() {
            //setup happy situation
            $scope.missions = [
                {
                    objectives: [
                        {value: 1},
                        {value: 2}
                    ],
                    errors: []
                },{
                    objectives: [],
                    errors: []
                }
            ];
            $scope.stage = 1;
            $scope.round = 1;
            $scope.team = 1;
        });

        it('should return true in the happy situation',function() {
            expect($scope.isSaveable()).toBe(true);
        });

        it('should return false if missions not present',function() {
            delete $scope.missions;
            expect($scope.isSaveable()).toBe(false);
        });

        it('should return false if stage is undefined',function() {
            $scope.stage = undefined;
            expect($scope.isSaveable()).toBe(false);
        });

        it('should return false if stage is null',function() {
            $scope.stage = null;
            expect($scope.isSaveable()).toBe(false);
        });

        it('should return false if round is undefined',function() {
            $scope.round = undefined;
            expect($scope.isSaveable()).toBe(false);
        });

        it('should return false if round is null',function() {
            $scope.round = null;
            expect($scope.isSaveable()).toBe(false);
        });

        it('should return false if team is undefined',function() {
            $scope.team = undefined;
            expect($scope.isSaveable()).toBe(false);
        });

        it('should return false if team is null',function() {
            $scope.team = null;
            expect($scope.isSaveable()).toBe(false);
        });

        it('should return false when some missions have errors',function() {
            $scope.missions[0].errors=['foo'];
            expect($scope.isSaveable()).toBe(false);
        });

        it('should return false when some missions have some objectives with undefined value',function() {
            $scope.missions[0].objectives[0].value = undefined;
            expect($scope.isSaveable()).toBe(false);
        });

        it('should return false when some missions have some objectives with null value',function() {
            $scope.missions[0].objectives[0].value = null;
            expect($scope.isSaveable()).toBe(false);
        });
    });

    describe('discard', function() {
        it('should discard form', function() {
            $scope.signature = "dummy";
            $scope.discard();
            expect($scope.signature).toEqual(null);
        });
    });

    describe('saving',function() {
        it('should not save when no team, stage or round is selected',function() {
            return $scope.save().catch(function() {
                expect(fsMock.write).not.toHaveBeenCalled();
            });
        });
        it('should save',function() {
            $scope.team = dummyTeam;
            $scope.field = {};
            $scope.stage = dummyStage;
            $scope.round = 1;
            $scope.settings = {
                table: 3
            };
            spyOn(Date,'valueOf').andReturn(42);
            $scope.signature = [1,2,3,4];
            return $scope.save().then(function() {
                expect(fsMock.write.mostRecentCall.args[0]).toEqual('scoresheets/score_3_123_42.json');
                expect(fsMock.write.mostRecentCall.args[1]).toEqual({
                    team: dummyTeam,
                    stage: dummyStage,
                    round: 1,
                    table: 3,
                    signature: [1,2,3,4],
                    score: 0
                });
            });
        });
    });

    describe('openDesciptionModal',function() {
        it('should emit a showDescription handshake',function() {
            $scope.openDescriptionModal('foo');
            expect(handshakeMock.$emit).toHaveBeenCalledWith('showDescription','foo');
        });
    });

    describe('openTeamModal',function() {
        it('should emit a chooseTeam handshake and return a team',function() {
            var team = {};
            handshakeMock.respond({
                team: team
            });
            $scope.openTeamModal('foo');
            expect(handshakeMock.$emit).toHaveBeenCalledWith('chooseTeam','foo');
            $scope.$digest();
            expect($scope.team).toEqual(team);
        });
        it('should be ok when nothing is returned on cancel',function() {
            $scope.openTeamModal('foo');
            expect(handshakeMock.$emit).toHaveBeenCalledWith('chooseTeam','foo');
            $scope.$digest();
            expect($scope.team).toEqual(undefined);
        });
    });

    describe('openRoundModal',function() {
        it('should emit a chooseRound handshake and return a stage and round',function() {
            handshakeMock.respond({
                stage: 'foo',
                round: 'bar'
            });
            $scope.openRoundModal('foo');
            expect(handshakeMock.$emit).toHaveBeenCalledWith('chooseRound','foo');
            $scope.$digest();
            expect($scope.stage).toEqual('foo');
            expect($scope.round).toEqual('bar');
        });
        it('should be ok when nothing is returned on cancel',function() {
            $scope.openRoundModal('foo');
            expect(handshakeMock.$emit).toHaveBeenCalledWith('chooseRound','foo');
            $scope.$digest();
            expect($scope.stage).toEqual(undefined);
            expect($scope.round).toEqual(undefined);
        });
    });
});
