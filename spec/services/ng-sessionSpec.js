describe('ng-session',function() {
    var ngServices = factory('services/ng-services');
    var module = factory('services/ng-session',{
        'services/ng-services': ngServices
    });

    var mockSessionData = {
        data: {
            property1: 'value1',
            property2: undefined
        }
    };
    var httpMock = createHttpMock({
        get: {
            '/session': mockSessionData
        }
    });

    var $session;

    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.module(function($provide) {
            $provide.value('$http', httpMock);
        });
        angular.mock.inject(["$session", function(_$session_) {
            $session = _$session_;
        }]);
    });

    describe('load', function() {

        it('calls http get with /session', function() {
            $session.load();
            expect(httpMock.get).toHaveBeenCalledWith('/session');
        });

        it('returns a promise with an object', function() {
            $session.load().then(function(session) {
                expect(typeof(session)).toBe("object");
            });
        });

        it('returns a promise with an obejct containing the session properties', function() {
            $session.load().then(function(session) {
                expect(session.property1).toBeDefined();
            });
        });

    });

    describe('get', function() {

        it('returns property\'s value when it exists', function() {
            $session.load().then(function(session) {
                expect($session.get('property1')).toBe('value1');
            });
        });

        it('returns undefined when the property does\'nt exists', function() {
            $session.load().then(function(session) {
                expect($session.get('property3')).toBe(undefined);
            });
        });

    });

    describe('keys', function() {

        it('contains key with defined value after load', function() {
            $session.load().then(function(session) {
                // expect($session.keys()).toEqual(['property1']);
                expect($session.keys().includes('property1')).toBe(true);
            });
        });

        it('contains key with undefined value after load', function() {
            $session.load().then(function(session) {
                expect($session.keys().includes('property2')).toBe(true);
            });
        });

        it('does\'t contain undefined keys', function() {
            $session.load().then(function(session) {
                expect($session.keys().includes('property3')).toBe(false);
            });
        });

    });

});
