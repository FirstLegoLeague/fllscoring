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
        '$http','$settings','$q',
        function($http,$settings,$q) {
            var ws;

            function init() {
                if (ws && ws.readyState === 1) {//the socket has to be open to work
                    return $q.when(ws);
                }
                return $settings.init().then(function(settings) {
                    if (!(settings.mhub && settings.node)) {
                        throw new Error('no message bus configured');
                    }
                    var def = $q.defer();
                    ws = new WebSocket(settings.mhub);
                    ws.node = settings.node;
                    ws.onopen = function() {
                        ws.send(JSON.stringify({
                            type: "subscribe",
                            node: settings.node
                        }));
                        def.resolve(ws);
                    };
                    ws.onerror = function(e){
                        if(e.type === "error"){
                            alert("mhub server is inaccessible!")
                        }
                        log("socket error", e);
                    };
                    ws.onclose = function() {
                        log("socket close");
                    };
                    ws.onmessage = function(msg) {
                        log("socket message",msg);
                        // var data = JSON.parse(msg.data);
                        // handleMessage(data);
                    };
                    return def.promise;
                });
            }


            return {
                send: function(topic,data) {
                    return init().then(function(ws) {
                        ws.send(JSON.stringify({
                            type: "publish",
                            node: ws.node,
                            topic: topic,
                            data: data
                        }));
                    });
                }
            };
        }
    ]);
});
