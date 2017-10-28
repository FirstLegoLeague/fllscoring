/**
 * Variant of $interval() which only starts the interval
 * when at least one user is interested.
 */
define('factories/poller', [
    'factories/ng-factories',
], function (module) {
    "use strict";

    return module.factory('Poller', [
        '$interval',
        function($interval) {

            /**
             * Ref-counted $interval.
             * Starts calling `callback` every `interval` milliseconds when
             * number of calls to `start()` is bigger than number of calls to `stop()`.
             *
             * Usage example:
             * const p = new Poller(10000, () => { console.log("tick"); });
             * // when instantiating controller:
             * p.start();
             * // when destroying controller:
             * p.stop();
             */
            function Poller(interval, callback) {
                this._interval = interval;
                this._callback = callback;
                this._refs = 0;
                this._handle = undefined; // $interval handle
            }

            /**
             * Enable polling.
             * Multiple calls to start() can be made. As long as the number of
             * stop() calls is smaller than the number of start() calls, the
             * poller keeps running.
             */
            Poller.prototype.start = function () {
                this._refs++;
                this.reset();
            };

            /**
             * Disable polling when the number of stop calls is equal to
             * the number of start calls.
             * It is an error to call stop more often than start.
             */
            Poller.prototype.stop = function () {
                if (this._refs <= 0) {
                    throw new Error("start/stop calls mismatched");
                }
                this._refs--;
                if (this._refs === 0) {
                    // Keep timer running if others are still interested
                    this.reset();
                }
            };

            /**
             * Restart poller, if it is currently running.
             */
            Poller.prototype.reset = function() {
                var self = this;
                if (this._handle !== undefined) {
                    $interval.cancel(this._handle);
                    this._handle = undefined;
                }
                if (this._refs > 0) {
                    this._handle = $interval(function () {
                        self._callback();
                    }, this._interval);
                }
            };

            return Poller;
        }
    ]);
});
