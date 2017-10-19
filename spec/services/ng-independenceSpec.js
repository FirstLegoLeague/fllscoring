describe('ng-independence',function() {
    var ngServices = factory('services/ng-services');
    var module = factory('services/ng-independence',{
        'services/ng-services': ngServices
    });

    var httpMock;
    var localstorageMock;

    var $independence;

    beforeEach(function() {
        angular.mock.module(module.name);
        localstorageMock = {};
        httpMock = createHttpMock({
            post: {
                '/success': {}
            }
        });
        angular.mock.module(function($provide) {
            $provide.value('$http', httpMock);
            $provide.value('$localStorage', localstorageMock);
        });
        angular.mock.inject(["$independence", function(_$independence_) {
            $independence = _$independence_;
        }]);

        localStorage.clear()
    });

    describe('act', function() {
        var token;
        var successUrl;
        var failureUrl;
        var data;
        var fallback;

        beforeEach(function() {
            $independence.sendSavedActionsToServer = jasmine.createSpy('sendSavedActionsToServer').and.callFake($independence.sendSavedActionsToServer);
            token = 'test';
            successUrl = '/success';
            failureUrl = '/failure';
            data = {};
            fallback = jasmine.createSpy('fallback');
        });


        it('doesn\'t call fallback if the action was successful', function() {
            $independence.act(token, successUrl, data, fallback);
            expect(fallback).not.toHaveBeenCalled();
        });

        it('saves action to localstorage if it failed', function (done) {
            var checkFunction = function () {
                expect(Object.keys(localstorageMock).length).toBe(1);
                done();
            };
            $independence.act(token, failureUrl, data, fallback).catch(checkFunction);
        });

        it('clears localStorage on a successful requests', function (done) {
            $independence.act(token, failureUrl, data, fallback).catch(function () {
                expect(Object.keys(localstorageMock).length).toBe(1);
                httpMock.addResponse("post", failureUrl, {});
                $independence.act(token, successUrl, data, fallback).then(function () {
                    expect(Object.keys(localstorageMock).length).toBe(0);
                    httpMock.resetResponses();
                    done();
                });
            });
        });

        it('calls fallback if the action failed', function(done) {
            $independence.act(token, failureUrl, data, fallback).catch(function() {
                expect(fallback).toHaveBeenCalled();
                done()
            });
        });

    });

    describe('sendSavedActionsToServer', function() {
        var key = 'test';
        var positiveNonTrueValue = 'a positive non-true value';

        beforeEach(function() {
            $independence.act = jasmine.createSpy('act').and.callFake($independence.act);
        });

        it('can run only one instance at once', function() {
            $independence._sendingActions = positiveNonTrueValue;
            expect($independence.sendSavedActionsToServer).toThrowError();
        });

        it('doesn\'t send a request if there are no actions', function() {
            $independence.sendSavedActionsToServer();
            expect(httpMock.post).not.toHaveBeenCalled();
        });

    });

    describe('pendingActions', function() {
        var key = 'test';
        var anotherKey = 'anotherTest';
        beforeEach(function () {
           localstorageMock = {};
        });

        it('returns 0 if there are not pending actions', function(done) {
            expect($independence.pendingActions(key)).toBe(0);
            done()
        });

        it('returns 1 if there is one pending action', function(done) {
            $independence.act(key,'/failure',{},() => {}).catch(function() {
                expect($independence.pendingActions(key)).toBe(1);
                done()
            });
        });

        it('returns 0 if there is one pending action with another key', function(done) {
            $independence.act(anotherKey,'/failure',{},() => {}).catch(function() {
                expect($independence.pendingActions(key)).toBe(0);
                done()
            });
        });
    });

});
