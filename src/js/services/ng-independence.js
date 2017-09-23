/**
 * Independence storage: backup for when the server is down. Save the actions now -
 * use them later when the server's back up.
 */
define('services/ng-independence',[
    'services/ng-services'
],function(module) {
    "use strict";

    return module.service('$independence', ['$q','$localStorage', '$http',
    function($q,$localStorage,$http) {
        function IndependentActionStroage() {}

        function queueAction(token, url, data) {
            $localStorage[`action_${token}_${Date.now()}`] = JSON.stringify({ url: url, data: data, index: Object.keys($localStorage).length});
        }

        IndependentActionStroage.prototype.act = function(token, url, data, fallback) {
            var self = this;
            queueAction(token, url, data);
            const promise = self.sendSavedActionsToServer(token);
            promise.catch(function () {
                if (fallback) fallback();
            });
            return promise;
        };

        IndependentActionStroage.prototype.sendSavedActionsToServer = function (token) {
            var self = this;
            var promises = [];
            angular.forEach($localStorage, function (actionString, key) {
                if (key.startsWith(`action_${token}`)) {
                    let action = JSON.parse(actionString);
                    const promise = $http.post(action.url, action.data);
                    promise.then(() => delete $localStorage[key]);
                    promises.push(promise);
                }
            });
            return $q.all(promises);
        };

        IndependentActionStroage.prototype.pendingActions = function(key) {
            return Object.keys($localStorage).filter((k) => k.startsWith(`action_${key}`)).length
        };

        return new IndependentActionStroage();
    }]);
});
