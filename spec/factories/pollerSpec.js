describe('poller', function () {
    "use strict";

    var ngFactories = factory('factories/ng-factories');
    var module = factory('factories/poller', {
        'factories/ng-factories': ngFactories
    });

    var Poller;
    var $interval;
    var poller;
    var callback;
    var INTERVAL = 1000;

    beforeEach(function () {
        angular.mock.module(module.name);
        angular.mock.inject(["Poller", "$interval", function (_Poller_, _$interval_) {
            Poller = _Poller_;
            $interval = _$interval_;
            callback = jasmine.createSpy("callback");
            poller = new Poller(INTERVAL, callback);
        }]);

    });

    describe('constructor', function () {
        it('should not start poller', function () {
            $interval.flush(1001);
            expect(callback).not.toHaveBeenCalled();
        });
    });

    describe('start', function () {
        it('should be started when someone is interested', function () {
            poller.start();
            $interval.flush(INTERVAL + 1);
            expect(callback).toHaveBeenCalledTimes(1);
        });
        it('should keep running when someone is interested', function () {
            poller.start();
            $interval.flush(INTERVAL);
            expect(callback).toHaveBeenCalledTimes(1);
            $interval.flush(INTERVAL);
            expect(callback).toHaveBeenCalledTimes(2);
        });
    });

    describe('stop', function () {
        it('should stop when no-one is interested, case 1', function () {
            poller.start();
            $interval.flush(INTERVAL);
            expect(callback).toHaveBeenCalledTimes(1);
            poller.stop();
            $interval.flush(INTERVAL);
            expect(callback).toHaveBeenCalledTimes(1);
        });
        it('should stop when no-one is interested, case 2', function () {
            poller.start();
            poller.start();
            $interval.flush(INTERVAL);
            expect(callback).toHaveBeenCalledTimes(1);
            poller.stop();
            poller.stop();
            $interval.flush(INTERVAL);
            expect(callback).toHaveBeenCalledTimes(1);
        });
        it('should not stop when at least one user is interested', function () {
            poller.start();
            poller.start();
            $interval.flush(INTERVAL);
            expect(callback).toHaveBeenCalledTimes(1);
            poller.stop();
            $interval.flush(INTERVAL);
            expect(callback).toHaveBeenCalledTimes(2);
        });
        it('should throw when stopping more then starting', function () {
            poller.start();
            poller.stop();
            expect(function () {
                poller.stop();
            }).toThrowError();
        })
    });

    describe('reset', function () {
        it('should not start timer when no-one interested', function () {
            $interval.flush(INTERVAL / 2);
            poller.reset();
            $interval.flush(2 * INTERVAL);
            expect(callback).not.toHaveBeenCalled();
        });
        it('should restart timer when someone interested', function () {
            poller.start();
            $interval.flush(INTERVAL / 2);
            expect(callback).not.toHaveBeenCalled();
            poller.reset();
            $interval.flush(INTERVAL / 2);
            expect(callback).not.toHaveBeenCalled();
            $interval.flush(INTERVAL / 2);
            expect(callback).toHaveBeenCalledTimes(1);
        });
    });
});
