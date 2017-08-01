var log = require('./log').log;

exports.root = __dirname + '/../';

exports.sendError = function(res) {
    return function(err) {
        log.error(err.message);
        res.status(err.status).send(err.message);
    }
}
