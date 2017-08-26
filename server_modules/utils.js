var log = require('./log').log;

exports.root = __dirname + '/../';

exports.sendError = function(res, err) {
    if(!err.message) {
        err.message = "500 Internal server error";
    }

    if(!err.status) {
        err.status = 500;
    }

    log.error(err.message);
    res.status(err.status).send(err.message);
}
