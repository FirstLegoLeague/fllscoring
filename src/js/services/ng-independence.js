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

        function actAheadOfServer(key, url, data) {
            $localStorage[`action_${key}_${Date.now()}`] = JSON.stringify({ url: url, data: data });
        }

        IndependentActionStroage.prototype.act = function(token, url, data, fallback) {
            var self = this;
            return $http.post(url, data).then(function(res) {
                self.sendSavedActionsToServer(token);
                return res;
            }).catch(function(err) {
                actAheadOfServer(token, url, data);
                if(fallback) {
                    fallback();
                }
            });
        };

        IndependentActionStroage.prototype.sendSavedActionsToServer = function(token) {
            if(this._sendingSavedActionsToServer) return;
            this._sendingSavedActionsToServer = true;

            var self = this;
            let promises = [];

            for(let key in $localStorage) {
                var _break = false;

                if(key.startsWith(`action_${token}`)) {
                    let action = JSON.parse($localStorage[key]);

                    let promise = self.act(key, action.url, action.data).then(function() {
                        delete $localStorage[key];
                    }, function() {
                        _break = true;
                    });

                    promises.push(promise);
                }
                if(_break)  break;
            }
            if(promises.length === 0) {
                self._sendingSavedActionsToServer = false;
                return;
            }

            $q.all(promises).then(function() {
                self._sendingSavedActionsToServer = false;
            });
        };

        IndependentActionStroage.prototype.pendingActions = function(token) {
            return Object.keys($localStorage).filter((k) => k.startsWith(`action_${token}`)).length;
        };

        return new IndependentActionStroage();
    }]);
});
