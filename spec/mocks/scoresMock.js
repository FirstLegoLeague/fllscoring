function createScoresMock(scoreboard) {
    scoreboard = scoreboard || {};
    return {
        scores: [{
            score: 1,
            id: 'afg1jkhg'
        },{
            score: 2,
            id: 'g5f23ysu'
        }],
        scoreboard: scoreboard,
        init: jasmine.createSpy('scoresInit').and.returnValue(Promise.resolve()),
        load: jasmine.createSpy('scoreLoadSpy'),
        create: jasmine.createSpy('scoreCreateSpy').and.returnValue(Promise.resolve()),
        delete: jasmine.createSpy('scoreDeleteSpy'),
        update: jasmine.createSpy('scoreUpdateSpy'),
        _update: jasmine.createSpy('score_UpdateSpy'),
        getRankings: jasmine.createSpy('getRankings').and.returnValue(Promise.resolve(scoreboard)),
        pendingActions: jasmine.createSpy('scorePendingActionsSpy').and.returnValue(1)
    };
}
