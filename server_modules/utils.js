var log = require('./log').log;

exports.root = __dirname + '/../';

exports.sendError = function(res, err) {
    var status = err.status || 500;
    var message = err.message || "Internal server error"

    log.error(message);
    res.status(status).send(message);
}

