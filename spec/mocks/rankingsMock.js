var createRankingsMock = function(rankings) {
    return {
        calculate: jasmine.createSpy('calculateRankingsSpy').and.returnValue(new Promise(function(res) { return res(rankings); }))
    };
}
