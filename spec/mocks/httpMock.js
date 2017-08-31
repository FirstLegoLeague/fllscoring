var createHttpMock = function(responses) {
    var mock = {};

    if(!responses) {
        responses = {};
    }

    ['get','post','delete','put','patch'].forEach(function(method) {
        mock[method] = jasmine.createSpy(method).and.callFake(function(url) {
            return new Promise(function(res, rej) {
                if(!responses[method][url]) {
                    rej('404 Not Found');
                } else {
                    res(responses[method][url]);
                }
            });
        });
    });

    return mock;
};
