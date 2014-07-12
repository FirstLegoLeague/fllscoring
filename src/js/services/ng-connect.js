/**
 * stub for communication module
 */
define('services/ng-connect',[
    'services/ng-services',
    'services/log',
],function(module,log) {
    return module.factory('$connect',['$http','$q','$timeout',function($http,$q,$timeout) {
        return {
            send: function() {
                return $timeout(function() {
                    log('data sent to server eventually');
                    return 'send result';
                },100);
            },
            get: function() {
                return $timeout(function() {
                    log('data retrieved from server eventually');
                    return 'get result';
                },100);
            }
        };
    }]);
});
