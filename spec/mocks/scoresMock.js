function createScoresMock(scoreboard) {
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
        load: jasmine.createSpy('scoreLoadSpy'),
        clear: jasmine.createSpy('scoreClearSpy'),
        create: jasmine.createSpy('scoreCreateSpy').and.returnValue(Promise.resolve()),
        delete: jasmine.createSpy('scoreDeleteSpy'),
        update: jasmine.createSpy('scoreUpdateSpy').and.returnValue(Promise.resolve()),
        _update: jasmine.createSpy('score_UpdateSpy'),
        getRankings: jasmine.createSpy('getRankings').and.returnValue({
            scoreboard: scoreboard
        })
    };
}
