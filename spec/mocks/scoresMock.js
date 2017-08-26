function createScoresMock(scoreboard) {
    scoreboard = scoreboard || {};
    return {
        scores: [{
            score: 1,
            id: 'afg1jkhg',
            table: 7
        },{
            score: 2,
            id: 'g5f23ysu'
        }],
        init: jasmine.createSpy('scoreInitSpy').and.returnValue($q.when()),
        scoreboard: scoreboard,
        init: jasmine.createSpy('scoresInit').and.returnValue(new Promise(function(res, rej) {
            res();
        })),
        load: jasmine.createSpy('scoreLoadSpy'),
        create: jasmine.createSpy('scoreCreateSpy').and.returnValue(new Promise(function(res, rej) {
            res();
        })),
        delete: jasmine.createSpy('scoreDeleteSpy'),
        update: jasmine.createSpy('scoreUpdateSpy'),
        _update: jasmine.createSpy('score_UpdateSpy'),
        getRankings: jasmine.createSpy('getRankings').and.returnValue(new Promise(function(res, rej) {
            res(scoreboard);
        })),
        pendingActions: jasmine.createSpy('scorePendingActionsSpy').and.returnValue(1)
    };
}
