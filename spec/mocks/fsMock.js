var createFsMock = function(mockfiles) {
    if (typeof mockfiles !== "object") {
        throw new TypeError("createFsMock expects a map of filename -> contents");
    }
    return {
        read: jasmine.createSpy('fsReadSpy').andCallFake(function(filename) {
            if (!(filename in mockfiles)) {
                return Q.reject(new Error("unknown file: " + filename));
            }
            return Q.when(angular.copy(mockfiles[filename]));
        }),
        write: jasmine.createSpy('fsWriteSpy').andCallFake(function() {
            return Q.when(true);
        }),
        remove: jasmine.createSpy('fsRemoveSpy').andCallFake(function() {
            return Q.when(true);
        })
    };
};
