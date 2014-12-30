describe('scoresheet',function() {

    var module = factory('views/scoresheet',{
        'services/log': logMock,
        'controllers/DescriptionDialogController': factory('controllers/DescriptionDialogController'),
        'controllers/TeamDialogController': factory('controllers/TeamDialogController'),
        'controllers/RoundDialogController': factory('controllers/RoundDialogController')
    });

    var $scope, controller, $window;
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
            $window = {
                Date: function() {
                    this.valueOf = function() {
                        return 42;
                    };
                },
                alert: jasmine.createSpy('alertSpy')
            };
            controller = $controller('scoresheetCtrl', {
                '$scope': $scope,
                '$fs': fsMock,
                '$settings': settingsMock,
                '$stages': {},
                '$handshake': handshakeMock,
                '$teams': {},
                '$challenge': challengeMock,
                '$window': $window
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

    describe('score',function() {
        it('should return undefined if there are no missions',function() {
            $scope.missions = undefined;
            expect($scope.score()).toBe(undefined);
        });
        it('should return the total result and add percentages to non percentage missions',function() {
            $scope.missions = [
                {
                    result: 10,
                    percentages: []
                },{
                    result: 40,
                    percentages: [0.1,0.2]  //30% in total
                }
            ];
            expect($scope.score()).toBe(53);
        });
        it('should round percentages up',function() {
            $scope.missions = [
                {
                    result: 1,
                    percentages: []
                },{
                    result: 4,
                    percentages: [0.1,0.2]  //30% in total
                }
            ];
            expect($scope.score()).toBe(6);
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
            $scope.round = 2;
            $scope.team = 3;
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
        beforeEach(function() {
            //setup some values
            $scope.signature = "dummy";
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
            $scope.round = 2;
            $scope.team = 3;
        });

        it('should discard form signature', function() {
            $scope.discard();
            expect($scope.signature).toEqual(null);
            expect($scope.team).toEqual(null);
            expect($scope.stage).toEqual(null);
            expect($scope.round).toEqual(null);
            expect($scope.missions[0].objectives[0].value).toEqual(null);
            expect($scope.missions[0].objectives[1].value).toEqual(null);
        });
    });

    describe('saving',function() {
        it('should not save when no team, stage or round is selected',function() {
            return $scope.save().catch(function() {
                expect(fsMock.write).not.toHaveBeenCalled();
                expect($window.alert).toHaveBeenCalledWith('no team selected, do so first');
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
                expect($window.alert).toHaveBeenCalledWith('Thanks for submitting a score of 0 points for team (123) foo in Voorrondes 1.');
            });
        });
        it('should alert a message if scoresheet cannot be saved', function() {
            $scope.team = dummyTeam;
            $scope.field = {};
            $scope.stage = dummyStage;
            $scope.round = 1;
            $scope.settings = {
                table: 3
            };
            fsMock.write.andReturn(Q.reject('argh'));
            return $scope.save().then(function() {
                expect($window.alert).toHaveBeenCalledWith('unable to write result');
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
