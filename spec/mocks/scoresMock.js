function createScoresMock($q,scoreboard) {
    scoreboard = scoreboard || {};
    return {
        scores: [{
            stageId: "qualifying",
            round: 2,
            teamNumber: 10,
            table: "table 1",
            score: 1,
            published: false,
            index: 0
        },{
            stageId: "final",
            round: 1,
            teamNumber: 20,
            table: "table 2",
            score: 2,
            published: false,
            index: 1
        }],
        scoreboard: scoreboard,
        remove: jasmine.createSpy('scoreRemoveSpy'),
        load: jasmine.createSpy('scoreLoadSpy'),
        pollSheets: jasmine.createSpy('scorePollSheetsSpy').and.returnValue($q.when()),
        update: jasmine.createSpy('scoreUpdateSpy'),
        _update: jasmine.createSpy('score_UpdateSpy'),
        save: jasmine.createSpy('scoreSaveSpy'),
        enableAutoRefresh: jasmine.createSpy('enableAutoRefresh'),
        disableAutoRefresh: jasmine.createSpy('disableAutoRefresh'),
        getRankings: jasmine.createSpy('getRankings').and.returnValue(scoreboard),
    };
}
