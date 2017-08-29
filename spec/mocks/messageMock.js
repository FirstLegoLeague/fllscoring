var createMessageMock = function() {
	var listeners = {};
    return {
        send: jasmine.createSpy('sendMessageSpy').and.returnValue(Q.when()),
        on: jasmine.createSpy('onMessageSpy').and.callFake(function(topic, listener){
            listeners[topic] = listeners[topic] || [];
            listeners[topic].push(listener)
        }),
        mockSend: function(topic) {
            listeners[topic].forEach(function(listener) {
                listener({}, { fromMe: false });
            });
        }
    };
}
