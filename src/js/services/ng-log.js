define('services/ng-session',[
    'services/ng-services',
], function(module) {

    return module.service('$session', [
        '$http',
        function($http) {

            let log = {};

            ['debug', 'info', 'warn', 'error', 'fatal'].forEach(level => {
                log[level] = function(message) {
                    return $http.post(`/log/${level}`, { message: message });
                }
            });

    }]);
});
