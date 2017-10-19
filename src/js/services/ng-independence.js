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

        IndependentActionStroage.prototype.act = function (token, url, data, fallback) {
            var self = this;
            queueAction(token, url, data);
            var promise = self.sendSavedActionsToServer();
            promise.catch(fallback);
            return promise;
        };

        IndependentActionStroage.prototype.sendSavedActionsToServer = function () {
            var self = this;
            var queue = angular.copy($localStorage);
            angular.forEach(queue, (value, key) => {
                if(key.startsWith("action")){
                    queue[key] = JSON.parse(value);
                    queue[key].originalKey = key;
                } else {
                    delete queue[key];
                }
            });
            queue = Object.values(queue);
            queue.sort((p, f) => p.index - f.index);
            return queue.reduce((promise, action) => promise.then(() => actionToPromise(action)), $q.when()) //And people said learning haskell is a waste of time. BEHOLD THE GLORY OF ~A NEW SUN~ FUNCTIONAL PROGRAMMING
        };

        function actionToPromise(action) {
            const promise = $http.post(action.url, action.data);
            promise.then(() => delete $localStorage[action.originalKey]);
            return promise;
        }

        IndependentActionStroage.prototype.pendingActions = function(key) {
            return Object.keys($localStorage).filter((k) => k.startsWith(`action_${key}`)).length
        };

        return new IndependentActionStroage();
    }]);
});
