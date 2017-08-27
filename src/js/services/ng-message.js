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
        '$http','$settings','$session','$q',
        function($http,$settings,$session,$q) {
            var ws;
            var listeners = [];
            var token = parseInt(Math.floor(0x100000*(Math.random())), 16);

            function init() {
                if (ws) {
                    return $q.when(ws);
                }
                return $session.load().then(() => $settings.init()).then(function(settings) {
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

                        ws.send(JSON.stringify({
                            type: "login",
                            node: settings.node,
                            username: $session.get('passport').user.username,
                            password: $session.get('passport').user.mhubPassword
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
                        var headers = JSON.parse(msg.headers);
                        var topic = data.topic;

                        msg.from = headers["scoring-token"];;
                        msg.fromMe = msg.from === token;

                        listeners.filter((listener) => {
                            return (typeof(listener.topic) === 'string' && topic === listener.topic) ||
                            (listener.topic instanceof RegExp && topic.matches(listener.topic));
                        }).forEach(function(listener) {
                            listener.handler(data, msg);
                        });
                    };
                    return def.promise;
                });
            }


            return {
                send: function(topic,data) {
                    return init().then(function(ws) {
                        data = data || {};
                        ws.send(JSON.stringify({
                            type: "publish",
                            node: ws.node,
                            topic: topic,
                            data: data,
                            headers: { "scoring-token": token }
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
