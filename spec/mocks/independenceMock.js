var createIndependenceMock = function() {
    return {
        act: jasmine.createSpy('independenceActSpy').and.returnValue(Promise.resolve()),
        pendingActions: jasmine.createSpy('independencePendingActionsSpy')
    };
};
