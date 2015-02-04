/**
 * sets up services for a message bus
 */
define('services/ng-message',[
    'services/ng-services',
    'services/log',
    'services/ng-settings'
],function(module,log) {
    "use strict";

    return module.service('$message',[
        '$http','$settings',
        function($http,$settings) {

            return {
                send: function(msg) {
                    return $settings.init().then(function(settings) {
                        if (settings.messageBus) {
                            var url = settings.messageBus;
                            return $http.post(url,msg);
                        }
                    });
                }
            };
        }
    ]);
});
