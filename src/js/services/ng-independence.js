/**
 * Independence storage: backup for when the server is down. Save the actions now -
 * use them later when the server's back up.
 */
define('services/ng-independence',[
    'services/ng-services'
],function(module) {
    "use strict";

    return module.service('$independence', ['$localStorage', function($localStorage) {
        function IndependentActionStroage() {}


        IndependentActionStroage.prototype.actAheadOfServer = function(key, action) {
            $localStorage[`action_${key}_${Date.now()}`] = JSON.stringify(action);
        };

        IndependentActionStroage.prototype.sendSavedActionsToServer = function(target, key) {
            if(this._sendingSavedActionsToServer) return;
            this._sendingSavedActionsToServer = true;

            var self = this;
            let promises = [];

            for(let key in $localStorage) {
                var _break = false;

                if(key.startsWith(`action_${key}`)) {
                    let action = JSON.parse($localStorage[key]);

                    let promise = target[action.type].call(target, action.params).then(function() {
                        delete $localStorage[key];
                    }, function() {
                        _break = true;
                    });

                    promises.push(promise);
                }
                if(_break)  break;
            }
            $q.all(promises).then(function() {
                self._sendingSavedActionsToServer = false;
            });
        };

        IndependentActionStroage.prototype.pendingActions = function(key) {
            return Object.keys($localStorage).filter((k) => k.startsWith(`action_${key}`)).length
        };

        return new IndependentActionStroage();
    }]);
});
