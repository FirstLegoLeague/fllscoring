function createScoresMock() {
    return {
        scores: [{
            score: 1
        },{
            score: 2
        }],
        scoreboard: {},
        remove: jasmine.createSpy('scoreRemoveSpy'),
        save: jasmine.createSpy('scoreSaveSpy')
    };
}
