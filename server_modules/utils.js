var log = require('./log').log;

exports.root = __dirname + '/../';

exports.middleware = function(res, res, next) {
    res.sendError = function(err) {
        var status = err.status || 500;
        var message = err.message || "Internal server error"

        log.error(message);
        this.status(status).send(message);
    };

    next();
};
