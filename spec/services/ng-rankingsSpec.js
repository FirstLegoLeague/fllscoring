describe('ng-rankings',function() {
    var ngServices = factory('services/ng-services');
    var module = factory('services/ng-rankings',{
        'services/ng-services': ngServices,
        'services/log': logMock
    });

    var $rankings;
    var stagesMock = createStagesMock();
    var teamsMock = createTeamsMock([
        { number: 123 },
        { number: 546 },
        { number: 1123 },
        { number: 222 }
        ]);
    var mockScores;
    var mockRankings;
    var fsMock;

    //initialize
    beforeEach(function() {
        mockScores = [{
            stageId: stagesMock.stages[0].id,
            teamNumber: teamsMock.teams[0].number,
            round: 1,
            score: 150
        },{
            stageId: stagesMock.stages[0].id,
            teamNumber: teamsMock.teams[1].number,
            round: 2,
            score: 132
        },{
            stageId: stagesMock.stages[0].id,
            teamNumber: teamsMock.teams[1].number,
            round: 1,
            score: 100
        },{
            stageId: stagesMock.stages[0].id,
            teamNumber: teamsMock.teams[2].number,
            round: 1,
            score: 0
        },{
            stageId: stagesMock.stages[1].id,
            teamNumber: teamsMock.teams[0].number,
            round: 1,
            score: 254
        },{
            stageId: stagesMock.stages[1].id,
            teamNumber: teamsMock.teams[1].number,
            round: 1,
            score: 221
        },{
            stageId: stagesMock.stages[1].id,
            teamNumber: teamsMock.teams[2].number,
            round: 1,
            score: 198
        },{
            stageId: stagesMock.stages[1].id,
            teamNumber: teamsMock.teams[2].number,
            round: 2,
            score: 75
        }];
        mockRankings = {};
        mockRankings[stagesMock.stages[0].id] = [{
            stage: stagesMock.stages[0],
            team: teamsMock.teams[0],
            scores: [{
                stageId: stagesMock.stages[0].id,
                teamNumber: teamsMock.teams[0].number,
                round: 1,
                score: 150
            }, undefined],
            ordered: [{
                stageId: stagesMock.stages[0].id,
                teamNumber: teamsMock.teams[0].number,
                round: 1,
                score: 150
            }],
            highest: {
                stageId: stagesMock.stages[0].id,
                teamNumber: teamsMock.teams[0].number,
                round: 1,
                score: 150
            }
        },{
            stage: stagesMock.stages[0],
            team: teamsMock.teams[1],
            scores: [{
                stageId: stagesMock.stages[0].id,
                teamNumber: teamsMock.teams[1].number,
                round: 1,
                score: 100
            },{
                stageId: stagesMock.stages[0].id,
                teamNumber: teamsMock.teams[1].number,
                round: 2,
                score: 132
            }],
            ordered: [{
                stageId: stagesMock.stages[0].id,
                teamNumber: teamsMock.teams[1].number,
                round: 2,
                score: 132
            },{
                stageId: stagesMock.stages[0].id,
                teamNumber: teamsMock.teams[1].number,
                round: 1,
                score: 100
            }],
            highest: {
                stageId: stagesMock.stages[0].id,
                teamNumber: teamsMock.teams[1].number,
                round: 2,
                score: 132
            }
        },{
            stage: stagesMock.stages[0],
            team: teamsMock.teams[2],
            scores: [{
                stageId: stagesMock.stages[0].id,
                teamNumber: teamsMock.teams[2].number,
                round: 1,
                score: 0
            }, undefined],
            ordered: [{
                stageId: stagesMock.stages[0].id,
                teamNumber: teamsMock.teams[2].number,
                round: 1,
                score: 0
            }],
            highest: {
                stageId: stagesMock.stages[0].id,
                teamNumber: teamsMock.teams[2].number,
                round: 1,
                score: 0
            }
        }];
        mockRankings[stagesMock.stages[1].id] = [{
            stage: stagesMock.stages[1],
            team: teamsMock.teams[0],
            scores: [{
                stageId: stagesMock.stages[1].id,
                teamNumber: teamsMock.teams[0].number,
                round: 1,
                score: 254
            }, undefined, undefined],
            ordered: [{
                stageId: stagesMock.stages[1].id,
                teamNumber: teamsMock.teams[0].number,
                round: 1,
                score: 254
            }],
            highest: {
                stageId: stagesMock.stages[1].id,
                teamNumber: teamsMock.teams[0].number,
                round: 1,
                score: 254
            }
        },{
            stage: stagesMock.stages[1],
            team: teamsMock.teams[1],
            scores: [{
                stageId: stagesMock.stages[1].id,
                teamNumber: teamsMock.teams[1].number,
                round: 1,
                score: 221
            }, undefined, undefined],
            ordered: [{
                stageId: stagesMock.stages[1].id,
                teamNumber: teamsMock.teams[1].number,
                round: 1,
                score: 221
            }],
            highest: {
                stageId: stagesMock.stages[1].id,
                teamNumber: teamsMock.teams[1].number,
                round: 1,
                score: 221
            }
        },{
            stage: stagesMock.stages[1],
            team: teamsMock.teams[2],
            scores: [{
                stageId: stagesMock.stages[1].id,
                teamNumber: teamsMock.teams[2].number,
                round: 1,
                score: 198
            },{
                stageId: stagesMock.stages[1].id,
                teamNumber: teamsMock.teams[2].number,
                round: 2,
                score: 75
            }, undefined],
            ordered: [{
                stageId: stagesMock.stages[1].id,
                teamNumber: teamsMock.teams[2].number,
                round: 1,
                score: 198
            },{
                stageId: stagesMock.stages[1].id,
                teamNumber: teamsMock.teams[2].number,
                round: 2,
                score: 75
            }],
            highest: {
                stageId: stagesMock.stages[1].id,
                teamNumber: teamsMock.teams[2].number,
                round: 1,
                score: 198
            }
        }];
    });

    beforeEach(function() {
        fsMock = createFsMock({
            'stages.json': stagesMock.stages,
            'teams.json': teamsMock.teams
        });
        angular.mock.module(module.name);
        angular.mock.module(function($provide) {
            $provide.value('$fs', fsMock);
        });
        angular.mock.inject(["$rankings", function(_$rankings_) {
            $rankings = _$rankings_;
        }]);
    });

    describe('calculate', function() {

        it('shuold calculate ranks correctly', function() {
            $rankings.calculate(mockScores).then(function(rankings) {
                for(var stageId in rankings) {
                    for(var rank in rankings[stageId]) {
                        for(var property in mockRankings[stageId][rank]) {
                            expect(rankings[stageId][rank][property]).toEqual(jasmine.objectContaining(mockRankings[stageId][rank][property]));
                        }
                    }
                }
            });
        });

    })

});
