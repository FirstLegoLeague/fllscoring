var fs = require('fs');
var path = require('path');

const LOG_PATH = path.resolve(__dirname, '..', 'log', 'log.log');

exports.log = function(level, message) {
    let line = `${level.toUpperCase()} - ${Date.now().toLocaleString()}: ${message}`;

    console.log(line);
    fs.appendFileSync(LOG_PATH, line + '\n');
};

['debug', 'info', 'warn', 'error', 'fatal'].forEach(function(level) {
    exports.log[level] = function(message) {
        exports.log(level.toUpperCase(), message);
    }
});

exports.beforeLayer = function(req, res, next) {
    req.log = exports.log;
    req.log.debug(`Starting ${req.method} ${req.originalUrl}`);
    next();
};

exports.afterLayer = function(req, res, next) {
    req.log.debug(`Complete error status ${res.statusCode}`);
    next();
};

exports.route = function(app) {

    app.post('/log/:level', function(req, res, next) {
        exports.log(req.params.level, req.body.message);
        res.sendStatus(200);
        next();
    });

};
