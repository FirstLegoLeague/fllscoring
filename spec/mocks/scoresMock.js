function createScoresMock($q,scoreboard) {
    scoreboard = scoreboard || {};
    return {
        scores: [{
            score: 1,
            index: 0
        },{
            score: 2,
            index: 1
        }],
        scoreboard: scoreboard,
        remove: jasmine.createSpy('scoreRemoveSpy'),
        load: jasmine.createSpy('scoreLoadSpy'),
        pollSheets: jasmine.createSpy('scorePollSheetsSpy').andReturn($q.when()),
        update: jasmine.createSpy('scoreUpdateSpy'),
        _update: jasmine.createSpy('score_UpdateSpy'),
        save: jasmine.createSpy('scoreSaveSpy'),
        getRankings: jasmine.createSpy('getRankings').andReturn({
            scoreboard: scoreboard
        })
    };
}
