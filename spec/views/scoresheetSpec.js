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
    var dummySettings = {bla: 'blu'};
    var fsMock = createFsMock({"settings.json": []});
    var settingsMock, handshakeMock, challengeMock;

    beforeEach(function() {
        angular.mock.module('DescriptionDialog');
        angular.mock.module('TeamDialog');
        angular.mock.module('RoundDialog');
        angular.mock.module(module.name);
        angular.mock.inject(function($controller,$rootScope,$q) {
            settingsMock = createSettingsMock($q, dummySettings);
            handshakeMock = createHandshakeMock($q);
            challengeMock = createChallengeMock();
            scoresMock = createScoresMock();
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
                '$scores': scoresMock,
                '$score': jasmine.createSpy('$score').and.returnValue(scoresMock.scores[0]),
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
            expect($scope.settings).toEqual(dummySettings);
            expect($scope.referee).toEqual(null);
            expect($scope.scoreEntry.table).toEqual(7);
        });
    });

    describe('getString',function() {
        beforeEach(function() {
            $scope.strings = {
                foo:'bar'
            };
        });
        it('should get a string from defined strings',function() {
            expect($scope.getString('foo')).toBe('bar');
        });
        it('should return the key if string not found',function() {
            expect($scope.getString('baz')).toBe('baz');
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

//     describe('preventSaveErrors',function() {
//         beforeEach(function() {
//             //setup happy situation
//             $scope.missions = [
//                 {
//                     objectives: [
//                         {value: 1},
//                         {value: 2}
//                     ],
//                     errors: []
//                 },{
//                     objectives: [],
//                     errors: []
//                 }
//             ];
//             $scope.scoreEntry = {
//                 stage: 1,
//                 round: 2,
//                 table: 7,
//                 team: 3
//             };
//             $scope.referee = 6;
//         });

//         it('should return empty in the happy situation',function() {
//             expect($scope.preventSaveErrors()).toEqual([]);
//         });

//         it('should return empty if missions not present',function() {
//             delete $scope.missions;
//             expect($scope.preventSaveErrors()).toEqual([]);
//         });

//         it('should return error if stage is undefined',function() {
//             $scope.scoreEntry.stage = undefined;
//             expect($scope.preventSaveErrors()).toEqual(['No stage selected']);
//         });

//         it('should return error if stage is null',function() {
//             $scope.scoreEntry.stage = null;
//             expect($scope.preventSaveErrors()).toEqual(['No stage selected']);
//         });

//         it('should return error if table is undefined and asked for',function() {
//             $scope.scoreEntry.table = undefined;
//             $scope.settings.askTable = true;
//             expect($scope.preventSaveErrors()).toEqual(['No table number entered']);
//         });

//         it('should return error if table is null and asked for',function() {
//             $scope.scoreEntry.table = null;
//             $scope.settings.askTable = true;
//             expect($scope.preventSaveErrors()).toEqual(['No table number entered']);
//         });

//         it('should return error if referee is undefined and asked for',function() {
//             $scope.referee = undefined;
//             $scope.settings.askReferee = true;
//             expect($scope.preventSaveErrors()).toEqual(['No referee entered']);
//         });

//         it('should return error if referee is null and asked for',function() {
//             $scope.referee = null;
//             $scope.settings.askReferee = true;
//             expect($scope.preventSaveErrors()).toEqual(['No referee entered']);
//         });

//         it('should return error if round is undefined',function() {
//             $scope.scoreEntry.round = undefined;
//             expect($scope.preventSaveErrors()).toEqual(['No round selected']);
//         });

//         it('should return error if round is null',function() {
//             $scope.scoreEntry.round = null;
//             expect($scope.preventSaveErrors()).toEqual(['No round selected']);
//         });

//         it('should return error if team is undefined',function() {
//             $scope.scoreEntry.team = undefined;
//             expect($scope.preventSaveErrors()).toEqual(['No team selected']);
//         });

//         it('should return error if team is null',function() {
//             $scope.scoreEntry.team = null;
//             expect($scope.preventSaveErrors()).toEqual(['No team selected']);
//         });

//         it('should return error when some missions have errors',function() {
//             $scope.missions[0].errors=['foo'];
//             expect($scope.preventSaveErrors()).toEqual(['Some missions have errors']);
//         });

//         it('should return error when some missions have some objectives with undefined value',function() {
//             $scope.missions[0].objectives[0].value = undefined;
//             expect($scope.preventSaveErrors()).toEqual(['Some missions are incomplete']);
//         });

//         it('should return error when some missions have some objectives with null value',function() {
//             $scope.missions[0].objectives[0].value = null;
//             expect($scope.preventSaveErrors()).toEqual(['Some missions are incomplete']);
//         });
//     });

    describe('teamRoundOk',function() {
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
            $scope.scoreEntry = {
                stage: 1,
                round: 2,
                table: 7,
                team: 3
            };
            $scope.referee = 6;
        });

        it('should return true in the happy situation',function() {
            expect($scope.teamRoundOk()).toEqual(true);
        });

        it('should return true if missions not present',function() {
            delete $scope.missions;
            expect($scope.teamRoundOk()).toEqual(true);
        });

        it('should return false if stage is undefined',function() {
            $scope.scoreEntry.stage = undefined;
            expect($scope.teamRoundOk()).toEqual(false);
        });

        it('should return false if stage is null',function() {
            $scope.scoreEntry.stage = null;
            expect($scope.teamRoundOk()).toEqual(false);
        });

        it('should return false if table is undefined and asked for',function() {
            $scope.scoreEntry.table = undefined;
            $scope.settings.askTable = true;
            expect($scope.teamRoundOk()).toEqual(false);
        });

        it('should return false if table is null and asked for',function() {
            $scope.scoreEntry.table = null;
            $scope.settings.askTable = true;
            expect($scope.teamRoundOk()).toEqual(false);
        });

        it('should return false if referee is undefined and asked for',function() {
            $scope.referee = undefined;
            $scope.settings.askReferee = true;
            expect($scope.teamRoundOk()).toEqual(false);
        });

        it('should return false if referee is null and asked for',function() {
            $scope.referee = null;
            $scope.settings.askReferee = true;
            expect($scope.teamRoundOk()).toEqual(false);
        });

        it('should return false if round is undefined',function() {
            $scope.scoreEntry.round = undefined;
            expect($scope.teamRoundOk()).toEqual(false);
        });

        it('should return false if round is null',function() {
            $scope.scoreEntry.round = null;
            expect($scope.teamRoundOk()).toEqual(false);
        });

        it('should return false if team is undefined',function() {
            $scope.scoreEntry.team = undefined;
            expect($scope.teamRoundOk()).toEqual(false);
        });

        it('should return false if team is null',function() {
            $scope.scoreEntry.team = null;
            expect($scope.teamRoundOk()).toEqual(false);
        });
    })

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
            $scope.scoreEntry = {
                stage: 1,
                round: 2,
                table: 7,
                team: 3
            };
            $scope.referee = 6;
        });

        it('should return true in the happy situation',function() {
            expect($scope.isSaveable()).toBe(true);
        });

        it('should return false if missions not present',function() {
            delete $scope.missions;
            expect($scope.isSaveable()).toBe(false);
        });

        it('should return false if stage is undefined',function() {
            $scope.scoreEntry.stage = undefined;
            expect($scope.isSaveable()).toBe(false);
        });

        it('should return false if stage is null',function() {
            $scope.scoreEntry.stage = null;
            expect($scope.isSaveable()).toBe(false);
        });

        it('should return false if table is undefined and asked for',function() {
            $scope.scoreEntry.table = undefined;
            $scope.settings.askTable = true;
            expect($scope.isSaveable()).toBe(false);
        });

        it('should return false if table is null and asked for',function() {
            $scope.scoreEntry.table = null;
            $scope.settings.askTable = true;
            expect($scope.isSaveable()).toBe(false);
        });

        it('should return false if referee is undefined and asked for',function() {
            $scope.referee = undefined;
            $scope.settings.askReferee = true;
            expect($scope.isSaveable()).toBe(false);
        });

        it('should return false if referee is null and asked for',function() {
            $scope.referee = null;
            $scope.settings.askReferee = true;
            expect($scope.isSaveable()).toBe(false);
        });

        it('should return false if round is undefined',function() {
            $scope.scoreEntry.round = undefined;
            expect($scope.isSaveable()).toBe(false);
        });

        it('should return false if round is null',function() {
            $scope.scoreEntry.round = null;
            expect($scope.isSaveable()).toBe(false);
        });

        it('should return false if team is undefined',function() {
            $scope.scoreEntry.team = undefined;
            expect($scope.isSaveable()).toBe(false);
        });

        it('should return false if team is null',function() {
            $scope.scoreEntry.team = null;
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

    describe('clear', function() {
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
            $scope.scoreEntry = {
                stage: 1,
                round: 2,
                table: 7,
                team: 3
            };
            $scope.referee = 'piet';
        });

        it('should clear form', function() {
            var oldId = $scope.scoreEntry.id;
            $scope.clear();
            expect($scope.scoreEntry.id).not.toEqual(oldId);
            expect(typeof $scope.scoreEntry.id).toEqual('string');
            expect($scope.scoreEntry.id.length).toEqual(8);
            expect($scope.signature).toEqual(null);
            expect($scope.scoreEntry.team).toEqual(undefined);
            expect($scope.scoreEntry.stage).toEqual(undefined);
            expect($scope.scoreEntry.round).toEqual(undefined);
            expect($scope.missions[0].objectives[0].value).toBeUndefined();
            expect($scope.missions[0].objectives[1].value).toBeUndefined();
            //table should not clear
            expect($scope.scoreEntry.table).toEqual(7);
            expect($scope.referee).toEqual('piet');
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
            $scope.scoreEntry.id = "abcdef01";
            $scope.scoreEntry.team = dummyTeam;
            $scope.field = {};
            $scope.scoreEntry.stage = dummyStage;
            $scope.scoreEntry.round = 1;
            $scope.scoreEntry.table = 7;
            var fileName = () => 'filename.json';
            $scope.scoreEntry.calcFilename = fileName;
            $scope.referee = 'foo';
            $scope.signature = [1,2,3,4];
            $scope.save().then(function () {
                expect(scoresMock.create).toHaveBeenCalledWith(
                     {
                        team: dummyTeam,
                        stage: dummyStage,
                        round: 1,
                        table: 7,
                        referee: 'foo',
                        signature: [1, 2, 3, 4]
                    },
                    {
                        score: 0,
                        id: 'abcdef01',
                        table: 7,
                        team: dummyTeam,
                        stage: dummyStage,
                        round: 1,
                        published: false,
                        calcFilename: fileName
                    });
                expect($window.alert).toHaveBeenCalledWith('Thanks for submitting a score of 0 points for team (123) foo in Voorrondes 1.');
            });
        });

        it('should save the score as published if the settings allow',function() {
            settingsMock.settings.autoPublish = true;
            $scope.scoreEntry.id = "abcdef01";
            $scope.scoreEntry.team = dummyTeam;
            $scope.field = {};
            $scope.scoreEntry.stage = dummyStage;
            $scope.scoreEntry.round = 1;
            $scope.scoreEntry.table = 7;
            var fileName = () => 'filename.json';
            $scope.scoreEntry.calcFilename = fileName;
            $scope.referee = 'foo';
            $scope.signature = [1,2,3,4];
            return $scope.save().then(function() {
                expect(scoresMock.create).toHaveBeenCalledWith(
                    {
                        team: dummyTeam,
                        stage: dummyStage,
                        round: 1,
                        table: 7,
                        referee: 'foo',
                        signature: [ 1, 2, 3, 4 ]
                    },
                    {
                        score: 0,
                        id: 'abcdef01',
                        table: 7,
                        team: dummyTeam,
                        stage: dummyStage,
                        round: 1,
                        calcFilename: fileName,
                        published: true
                    });

                expect($window.alert).toHaveBeenCalledWith(`Thanks for submitting a score of 0 points for team (${dummyTeam.number})` +
                         ` ${dummyTeam.name} in ${dummyStage.name} 1.`);
            });
        });

        it('should alert a message if scoresheet cannot be saved', function() {
            $scope.scoreEntry.team = dummyTeam;
            $scope.field = {};
            $scope.scoreEntry.stage = dummyStage;
            var fileName = () => 'filename.json';
            $scope.scoreEntry.calcFilename = fileName;
            $scope.scoreEntry.round = 1;
            $scope.scoreEntry.table = 7;
            var oldId = $scope.uniqueId;
            scoresMock.create.and.returnValue(Q.reject(new Error('argh')));
            return $scope.save().catch(function() {
                expect($window.alert).toHaveBeenCalledWith(`Thanks for submitting a score of 0 points for team foo (123) in Voorrondes 1.
Notice: the score could not be sent to the server. This might be caused by poor network conditions. The score is thereafore save on your device, and will be sent when it's possible.Current number of scores actions waiting to be sent: 1`);
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
            expect($scope.scoreEntry.team).toEqual(team);
        });
        it('should be ok when nothing is returned on cancel',function() {
            handshakeMock.respond();
            $scope.openTeamModal('foo');
            expect(handshakeMock.$emit).toHaveBeenCalledWith('chooseTeam','foo');
            $scope.$digest();
            expect($scope.scoreEntry.team).toEqual(undefined);
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
            expect($scope.scoreEntry.stage).toEqual('foo');
            expect($scope.scoreEntry.round).toEqual('bar');
        });
        it('should be ok when nothing is returned on cancel',function() {
            handshakeMock.respond();
            $scope.openRoundModal('foo');
            expect(handshakeMock.$emit).toHaveBeenCalledWith('chooseRound','foo');
            $scope.$digest();
            expect($scope.scoreEntry.stage).toEqual(undefined);
            expect($scope.scoreEntry.round).toEqual(undefined);
        });
    });
});
