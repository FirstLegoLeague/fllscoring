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

        function queueAction(url, data) {
            $localStorage[`action_${Date.now()}`] = JSON.stringify({ url: url, data: data, index: Object.keys($localStorage).length});
        }

        IndependentActionStroage.prototype.act = function (url, data, fallback) {
            var self = this;
            queueAction(url, data);
            var promise = self.sendSavedActionsToServer();
            promise.catch(fallback);
            return promise;
        };

        IndependentActionStroage.prototype.sendSavedActionsToServer = function () {
            var self = this;
            if(self._sendingActions){
                throw new Error("Already sending actions to server");
            }
            self._sendingActions = true;
            var queue = Object.keys($localStorage).filter(k => k.startsWith("action")).map(key => {
                var action = JSON.parse($localStorage[key]);
                action.originalKey = key;
                return action;
            }).sort((p, f) => p.index - f.index);
            var promise = queue.reduce((promise, action) => promise.then(() => actionToPromise(action)), $q.when());
            promise.then(() => self._sendingActions = false, () => self._sendingActions = false);
            return promise;
        };

        function actionToPromise(action) {
            const promise = $http.post(action.url, action.data);
            promise.then(() => delete $localStorage[action.originalKey]);
            return promise;
        }

        IndependentActionStroage.prototype.pendingActions = function() {
            return Object.keys($localStorage).filter((k) => k.startsWith(`action`)).length
        };

        return new IndependentActionStroage();
    }]);
});
