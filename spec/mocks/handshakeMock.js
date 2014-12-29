var createHandshakeMock = function($q) {
    var handlers = {};
    var promise;
    var result;
    return {
        $on: jasmine.createSpy('handshake.on').andCallFake(function(e,cb) {
            handlers[e] = cb;
        }),
        $emit: jasmine.createSpy('handshake.emit').andCallFake(function() {
            return $q.when(result)
        }),
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
        },
        //sets the response after the emit it resolved
        respond: function(res) {
            result = res;
        }
    };
};
