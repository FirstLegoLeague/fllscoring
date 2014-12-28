var createHandshakeMock = function($q) {
    var handlers = {};
    var promise;
    return {
        $on: jasmine.createSpy('handshake.on').andCallFake(function(e,cb) {
            handlers[e] = cb;
        }),
        $emit: jasmine.createSpy('handshake.emit'),
        defer: jasmine.createSpy('handshake.defer').andCallFake(function() {
            promise = {
                resolve: jasmine.createSpy('promise.resolve'),
                reject: jasmine.createSpy('promise.reject')
            };
            return promise;
        }),
        fire: function(e) {
            if (handlers[e]) {
                var args = $.makeArray(arguments);
                handlers[e].apply(null,args.slice(1));
            }
        },
        getPromise: function() {
            return promise;
        }
    };
};
