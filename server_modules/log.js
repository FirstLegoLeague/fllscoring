exports.log = function(level, message) {
    console.log(level + ' - ' + Date.now().toLocaleString() + ': ' + message);
};

['debug', 'info', 'warn', 'error', 'fatal'].forEach(function(level) {
    exports.log[level] = function(message) {
        exports.log(level.toUpperCase(), message);
    }
});

exports.middleware = function(req, res, next) {

    req.log = exports.log;

    req.log.debug(`Starting ${req.method} ${req.originalUrl}`);

    next();

};
