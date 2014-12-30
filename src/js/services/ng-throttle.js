/**
 * throttle service
 * basically copied from underscore,
 * adapted to angular
 */
define('services/ng-throttle', [
    'services/ng-services'
], function(module) {
    return module.factory('$throttle', [
        '$timeout',
        function($timeout) {

            //istanbul ignore next
            var _now = Date.now || function() {
                return new Date().getTime();
            };

            return function(func, wait, options) {
                var context, args, result;
                var timeout = null;
                var previous = 0;
                if (!options) options = {};
                var later = function() {
                    previous = options.leading === false ? 0 : _now();
                    timeout = null;
                    result = func.apply(context, args);
                    if (!timeout) context = args = null;
                };
                return function() {
                    var now = _now();
                    if (!previous && options.leading === false) previous = now;
                    var remaining = wait - (now - previous);
                    context = this;
                    args = arguments;
                    if (remaining <= 0 || remaining > wait) {
                        $timeout.cancel();
                        timeout = null;
                        previous = now;
                        result = func.apply(context, args);
                        if (!timeout) context = args = null;
                    } else if (!timeout && options.trailing !== false) {
                        timeout = $timeout(later, remaining);
                    }
                    return result;
                };
            };
        }
    ]);
});
