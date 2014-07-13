var createFsMock = function(mockdata) {
    return {
        read: function() {
            return Q.when(mockdata);
        },
        write: jasmine.createSpy('fsWriteSpy').andCallFake(function() {
            return Q.when('foo');
        })
    };
};
