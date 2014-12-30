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
    var settingsMock, handshakeMock, challengeMock;

    beforeEach(function() {
        angular.mock.module('DescriptionDialog');
        angular.mock.module('TeamDialog');
        angular.mock.module('RoundDialog');
        angular.mock.module(module.name);
        angular.mock.inject(function($controller,$rootScope,$q) {
            settingsMock = createSettingsMock($q,'settings');
            handshakeMock = createHandshakeMock($q);
            challengeMock = createChallengeMock();
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
            expect($scope.settings).toEqual({});
            expect($scope.missions).toEqual([]);
            $scope.$digest();
            expect($scope.settings).toEqual('settings');
        });
    });

    describe('load',function() {
        describe('processing',function() {
            var field = 'foo';
            var mission = {
                score: [
                    function() {return 1;},
                    function() {return 2;}
                ]
            };
            var objective = {
                value: 4
            };
            var missions = [mission];
            var objectiveIndex = {
                'foo': objective
            };
            beforeEach(function() {
                challengeMock.load.andReturn(Q.when({
                    field: field,
                    missions: missions,
                    objectiveIndex: objectiveIndex
                }));
                challengeMock.getDependencies.andReturn(['foo']);
            });
            it('should set the field, missions and index',function() {
                return $scope.load().then(function() {
                    expect($scope.field).toBe(field);
                    expect($scope.missions).toBe(missions);
                    expect($scope.objectiveIndex).toBe(objectiveIndex);
                });
            });
            it('should process the missions',function() {
                return $scope.load().then(function() {
                    expect(mission.errors).toEqual([]);
                    expect(mission.percentages).toEqual([]);
                });
            });
            it('should set a watcher to mission dependencies',function() {
                return $scope.load().then(function() {
                    expect(mission.result).toBe(3);
                });
            });
            it('should not count an error, but log it to mission errors',function() {
                var err = new Error('squeek');
                mission.score = [
                        function() {return 1;},
                        function() {return err;}
                ];
                return $scope.load().then(function() {
                    expect(mission.result).toBe(1);
                    expect(mission.errors).toEqual([err]);
                });
            });
            it('should not count a fraction, but treat as percentage',function() {
                mission.score = [
                        function() {return 1;},
                        function() {return 0.5;}
                ];
                return $scope.load().then(function() {
                    expect(mission.result).toBe(1);
                    expect(mission.percentages).toEqual([0.5]);
                });
            });
            it('should count undefined as 0',function() {
                mission.score = [
                        function() {return 1;},
                        function() {return;}
                ];
                return $scope.load().then(function() {
                    expect(mission.result).toBe(1);
                });
            });
        });
        it('should set an error message when loading fails',function() {
            challengeMock.load.andReturn(Q.reject('squeek'));

            return $scope.load().then(function() {
                expect($scope.errorMessage).toBe('Could not load field, please configure host in settings');
                expect($window.alert).toHaveBeenCalledWith('Could not load field, please configure host in settings');
            });
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

    describe('preventSaveErrors',function() {
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

        it('should return empty in the happy situation',function() {
            expect($scope.preventSaveErrors()).toEqual([]);
        });

        it('should return empty if missions not present',function() {
            delete $scope.missions;
            expect($scope.preventSaveErrors()).toEqual([]);
        });

        it('should return error if stage is undefined',function() {
            $scope.stage = undefined;
            expect($scope.preventSaveErrors()).toEqual(['No stage selected']);
        });

        it('should return error if stage is null',function() {
            $scope.stage = null;
            expect($scope.preventSaveErrors()).toEqual(['No stage selected']);
        });

        it('should return error if round is undefined',function() {
            $scope.round = undefined;
            expect($scope.preventSaveErrors()).toEqual(['No round selected']);
        });

        it('should return error if round is null',function() {
            $scope.round = null;
            expect($scope.preventSaveErrors()).toEqual(['No round selected']);
        });

        it('should return error if team is undefined',function() {
            $scope.team = undefined;
            expect($scope.preventSaveErrors()).toEqual(['No team selected']);
        });

        it('should return error if team is null',function() {
            $scope.team = null;
            expect($scope.preventSaveErrors()).toEqual(['No team selected']);
        });

        it('should return error when some missions have errors',function() {
            $scope.missions[0].errors=['foo'];
            expect($scope.preventSaveErrors()).toEqual(['Some missions have errors']);
        });

        it('should return error when some missions have some objectives with undefined value',function() {
            $scope.missions[0].objectives[0].value = undefined;
            expect($scope.preventSaveErrors()).toEqual(['Some missions are incomplete']);
        });

        it('should return error when some missions have some objectives with null value',function() {
            $scope.missions[0].objectives[0].value = null;
            expect($scope.preventSaveErrors()).toEqual(['Some missions are incomplete']);
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
