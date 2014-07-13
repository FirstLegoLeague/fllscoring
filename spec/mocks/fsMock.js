var createFsMock = function(mockdata) {
    return {
        read: jasmine.createSpy('fsReadSpy').andCallFake(function() {
            return Q.when(angular.copy(mockdata));
        }),
        write: jasmine.createSpy('fsWriteSpy').andCallFake(function() {
            return Q.when(true);
        }),
        remove: jasmine.createSpy('fsRemoveSpy').andCallFake(function() {
            return Q.when(true);
        })
    };
};
