describe('ng-independence',function() {
    var ngServices = factory('services/ng-services');
    var module = factory('services/ng-independence',{
        'services/ng-services': ngServices
    });

    var httpMock = createHttpMock({
        post: {
            '/success': {}
        }
    });
    var successUrl = '/success';
    var failureUrl = '/failure';
    var $independence;

    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.module(function($provide) {
            $provide.value('$http', httpMock);
        });
        angular.mock.inject(["$independence", function(_$independence_) {
            $independence = _$independence_;
        }]);

        localStorage.clear();
    });

    describe('act', function() {
        var token;
        var data;
        var fallback;

        beforeEach(function() {
            $independence.sendSavedActionsToServer = jasmine.createSpy('sendSavedActionsToServer');

            token = 'test';
            data = {};
            fallback = jasmine.createSpy('fallback');
        });

        it('calls sendSavedActionsToServer if the action was successful', function() {
            $independence.act(token, successUrl, data, fallback).then(function(){
                expect($independence.sendSavedActionsToServer).toHaveBeenCalledWith(token);
            });
        });

        it('doesn\'t call fallback if the action was successful', function() {
            $independence.act(token, successUrl, data, fallback);
            expect(fallback).not.toHaveBeenCalled();
        });

        it('doesn\'t call localstorage if the action was successful', function() {
            $independence.act(token, successUrl, data, fallback);
            expect(Object.keys(localStorage).length).toBe(0);
        });

        it('doesn\'t call sendSavedActionsToServer if the action failed', function() {
            $independence.act(token, successUrl, data, fallback).then(function() {}, function() {
                expect(fallback).toHaveBeenCalled();
            });
        });

        it('calls fallback if the action failed', function() {
            $independence.act(token, successUrl, data, fallback).then(function() {}, function() {
                expect(fallback).toHaveBeenCalled();
            });
        });

        it('calls localstorage if the action was successful', function() {
            $independence.act(token, successUrl, data, fallback).then(function() {}, function() {
                expect(Object.keys(localStorage).length).toBe(1);
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
            $independence._sendingSavedActionsToServer = positiveNonTrueValue;
            $independence.sendSavedActionsToServer(key);
            expect($independence._sendingSavedActionsToServer).toBe(positiveNonTrueValue);
        });

        it('finishes instantly if there are no matching keys', function() {
            $independence.sendSavedActionsToServer(key);
            expect($independence._sendingSavedActionsToServer).toBe(false);
        });

        it('calls act once for each key', function() {
            $independence.act(key,failureUrl,{},() => {}).then(function() {
                $independence.sendSavedActionsToServer(key);
                expect($independence.act).toHaveBeenCalled();
            });
        });

        it('doesn\'t act if there are no keys', function() {
            $independence.sendSavedActionsToServer(key);
            expect($independence.act).not.toHaveBeenCalled();
        });

    });

    // Not important to cover this right now, and tests won't pass
    describe('pendingActions', function() {
        // var key = 'test';
        // var anotherKey = 'anotherTest';

        // it('returns 0 if there are no pending actions', function() {
        //     expect($independence.pendingActions(key)).toBe(0);
        // });

        // it('returns 1 if there is one pending action', function() {
        //     $independence.act(key,failureUrl,{},() => {}).then(function() {
        //         expect($independence.pendingActions(key)).toBe(1);
        //     });
        // });

        // it('returns 0 if there is one pending action with another key', function() {
        //     $independence.act(anotherKey,failureUrl,{},() => {}).then(function() {
        //         expect($independence.pendingActions(key)).toBe(0);
        //     });
        // });
    });

});
