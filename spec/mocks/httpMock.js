var createHttpMock = function(responses) {
    var mock = {
        addResponse: function (method, url, data) {
            responses[method][url] = data;
        },

        resetResponses: function () {
            responses = originalResponses;
        }
    };

    if(!responses) {
        responses = {};
    }
    var originalResponses = angular.copy(responses);


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
