define('services/ng-serverlog',[
    'services/ng-services',
], function(module) {

    return module.service('$serverlog', [
        '$http',
        function($http) {

            let log = {};

            ['debug', 'info', 'warn', 'error', 'fatal'].forEach(level => {
                log[level] = function(message) {
                    return $http.post(`/log/${level}`, { message: message });
                }
            });

            return log;

    }]);
});
