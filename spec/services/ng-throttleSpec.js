describe('ng-throttle',function() {
    var ngServices = factory('services/ng-services');
    var module = factory('services/ng-throttle',{
        'services/ng-services': ngServices
    });

    var $throttle,$timeout;

    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.inject(function(_$throttle_,_$timeout_) {
            $throttle = _$throttle_;
            $timeout = _$timeout_;
        });
    });

    it('should call immediately',function() {
        var spy = jasmine.createSpy('spy');
        var f = $throttle(spy,1000);
        f('foo');
        expect(spy).toHaveBeenCalledWith('foo');
    });

    it('should call only once when multiple invokations',function() {
        var spy = jasmine.createSpy('spy');
        var f = $throttle(spy,1000);
        f('foo');
        f('foo');
        f('foo');
        expect(spy.calls.count()).toBe(1);
        $timeout.flush();
        expect(spy.calls.count()).toBe(2);
    });

    it('should not call the leading edge if that option is given',function() {
        var spy = jasmine.createSpy('spy');
        var f = $throttle(spy,1000,{
            leading: false
        });
        f('foo');
        f('foo');
        f('foo');
        expect(spy.calls.count()).toBe(0);
        $timeout.flush();
        expect(spy.calls.count()).toBe(1);
    });

    it('should even work when the throttled function invokes the throttle again',function() {
        var spy = jasmine.createSpy('spy');
        var f = $throttle(spy,1000);
        spy.and.callFake(f);
        f('foo');
        f('foo');
        f('foo');
        expect(spy.calls.count()).toBe(1);
        $timeout.flush();
        expect(spy.calls.count()).toBe(2);
    });

    it('should even work when the throttled function invokes the throttle again',function() {
        var spy = jasmine.createSpy('spy');
        var f = $throttle(spy,1000,{
            leading: false
        });
        spy.and.callFake(f);
        f('foo');
        f('foo');
        f('foo');
        expect(spy.calls.count()).toBe(0);
        $timeout.flush();
        expect(spy.calls.count()).toBe(1);
    });
});
