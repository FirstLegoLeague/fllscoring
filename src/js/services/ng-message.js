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
            var isInitializedPromise;
            var listeners = [];
            var token = parseInt(Math.floor(0x100000*(Math.random())), 16);

            function init() {
                if (isInitializedPromise) {
                    return isInitializedPromise;
                }
                var def = $q.defer();
                isInitializedPromise = def.promise;
                return $settings.init().then(function(settings) {
                    if (!(settings.mhub && settings.node)) {
                        throw new Error('no message bus configured');
                    }

                    var ws = new WebSocket(settings.mhub);
                    ws.node = settings.node;
                    ws.onopen = function() {
                        ws.send(JSON.stringify({
                            type: "subscribe",
                            node: settings.node
                        }));
                        def.resolve(ws);
                    };
                    ws.onerror = function(e){
                        log("socket error", e);
                    };
                    ws.onclose = function() {
                        log("socket close");
                    };
                    ws.onmessage = function(msg) {
                        var data = JSON.parse(msg.data);
                        var topic = data.topic;

                        msg.from = data.data._token;
                        msg.fromMe = data.data._token === token;
                        delete data.data._token;
                        if(Object.keys(data).length === 0)
                            delete data.data;

                        listeners.filter((listener) => {
                            return (typeof(listener.topic) === 'string' && topic === listener.topic) ||
                            (listener.topic instanceof RegExp && topic.matches(listener.topic));
                        }).forEach(function(listener) {
                            listener.handler(data, msg);
                        });
                    };
                    return isInitializedPromise;
                });
            }


            return {
                send: function(topic,data) {
                    return init().then(function(ws) {
                        data = data || {};
                        data._token = token;
                        ws.send(JSON.stringify({
                            type: "publish",
                            node: ws.node,
                            topic: topic,
                            data: data
                        }));
                    });
                },
                on: function(topic, handler) {
                    listeners.push({ topic: topic, handler: handler });
                }
            };
        }
    ]);
});
