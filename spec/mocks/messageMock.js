var createMessageMock = function() {
	return {
        send: jasmine.createSpy('messageSendSpy'),
        on: jasmine.createSpy('messageOnSpy')
    };
}
