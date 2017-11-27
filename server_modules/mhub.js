var MClient = require("mhub").MClient;

var args = require("./args");
var log = require("./log").log;

var MHUB_RECONNECT_TIMEOUT = 2000; /* ms */

var client = new MClient(args.mhubHost, {
    noImplicitConnect: true,
});

// Log any connection state issues, and keep
// reconnecting if necessary.
client.on("open", (e) => {
    log.info("mhub: connected to " + client.url);
});
client.on("close", () => {
    log.warn("mhub: disconnected");
    reconnect();
});
client.on("error", (e) => {
    log.error("mhub: error: " + e);
    reconnect();
});

var connectListeners = [];

/**
 * Connect to MHub.
 */
function connect() {
    // Ignore any connect error, because it is already handled
    var connectPromise = client.connect();
    connectPromise.catch((e) => { /* noop */ }); // Prevent Unhandled Rejection, it's already handled elsewhere

    // Login if necessary
    if (args.mhubUser) {
        connectPromise = connectPromise.then(() => {
            // Login, and abort if it fails
            // Note: we don't put the catch on connectPromise's chain,
            // to prevent it catching the connect error too
            client.login(args.mhubUser, args.mhubPass)
                .catch((e) => {
                    log.error("login failed: " + e);
                    client.close();
                });
        });
    }

    // Inform all interested parties about succesful connection
    connectPromise.then(() => {
        connectListeners.forEach((cb) => {
            cb();
        });
    });
}

// Start connecting (and keep it connected), if configured
if (args.mhubHost) {
    connect();
}

var reconnectTimer;

/**
 * Schedule a reconnect, if not already pending.
 */
function reconnect() {
    if (reconnectTimer) {
        return;
    }
    reconnectTimer = setTimeout(() => {
        reconnectTimer = undefined;
        connect();
    }, MHUB_RECONNECT_TIMEOUT);
}

/**
 * Publish message to given topic, with optional
 * data and headers.
 *
 * Publishes to the server and node that are already configured.
 *
 * @param topic {string} Message topic
 * @param [data] {any} Optional message data
 * @param [headers] {{[key: string]: string}} Optional message headers
 * @return {Promise<void>} Promise that resolves when messages is succesfully published
 */
exports.publish = (topic, data, headers) => {
    return client.publish(args.mhubNode, topic, data, headers);
};

var subscribeId = 0;
var subscribers = {};

client.on("message", (message, id) => {
    var cb = subscribers[id];
    if (cb) {
        cb(message);
    }
});

/**
 * Subscribe to given topic pattern, or all messages.
 *
 * Subscribes to the server and node that are already configured.
 * Note: subscription needs a connection and login (if configured).
 * Therefore, register an onConnect listener and call subscribe in it.
 *
 * @param [pattern] {string} Optional topic pattern, or all messages if undefined
 * @param onMessage {(msg: mhub.Message) => void} Callback called for each matching message
 * @return {Promise<void>} Promise that resolves when succesfully subscribed
 */
exports.subscribe = (pattern, onMessage) => {
    if (!onMessage && typeof pattern === "function") {
        onMessage = pattern;
    }
    var id = String(subscribeId++);
    subscribers[id] = onMessage;
    return client.subscribe(args.mhubNode, pattern, id);
};

/**
 * Register callback for when server is connected and logged in.
 * Use it to e.g. subscribe to topics.
 *
 * @param onConnect {() => void} Callback called when connection to MHub server is (re-)established
 * @return {void}
 */
exports.onConnect = (onConnect) => {
    connectListeners.push(onConnect);
};
