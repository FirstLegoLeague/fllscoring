exports.middleware = function(req, res, next) {

    req.log = function(level, message) {
        console.log(level + ' - ' + Date.now().toLocaleString() + ': ' + message);
    };

    ['debug', 'info', 'warn', 'error', 'fatal'].forEach(function(level) {
        req.log[level] = function(message) {
            req.log(level.toUpperCase(), message);
        }
    });

    req.log.debug('Starting {0} {1}'.format(req.method, req.originalUrl));

    next();

};
