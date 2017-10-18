var file = require('./files');
exports.route = function (app) {
    file.route(app, 'stages');
}