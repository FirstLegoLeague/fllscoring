var createFsMock = function(mockdata) {
    return {
        read: jasmine.createSpy('fsReadSpy').andCallFake(function() {
            return Q.when(mockdata);
        }),
        write: jasmine.createSpy('fsWriteSpy').andCallFake(function() {
            return Q.when('foo');
        })
    };
};
