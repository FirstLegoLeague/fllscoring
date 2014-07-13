var scoresMock = {
    scores: [{
        score: 1
    },{
        score: 2
    }],
    remove: jasmine.createSpy('scoreRemoveSpy'),
    getScoreboard: jasmine.createSpy('getScoreboardSpy').andReturn(getDummyScoreboard())
};
