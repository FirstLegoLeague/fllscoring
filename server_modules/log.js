var fs = require('fs');
var path = require('path');
var rotate = require('rotating-file-stream');

const LOG_PATH = path.resolve(__dirname, '..', 'log', 'log.log');

var stream = rotate(LOG_PATH, {
    size:     '10M',
    interval: '1d'
});

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
