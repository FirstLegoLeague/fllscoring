var createIndependenceMock = function() {
    return {
        act: jasmine.createSpy('independenceActMock').and.returnValue(new Promise(function(res, rej) {
            res();
        })),
        sendSavedActionsToServer: jasmine.createSpy('sendSavedActionsToServer'),
        pendingActions: jasmine.createSpy('pendingActions')
    };
};
