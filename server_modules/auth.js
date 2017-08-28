var args = require('./args');
var basicAuthCreds = args.basicAuthCreds;

exports.basic = function() {
    if(!basicAuthCreds) {
        return function(req, res, next) {
            next();
        };
    }

    var basicAuth = require('basic-auth-connect');
    var pair = basicAuthCreds.split(':');
    var user = pair[0];
    var pass = pair[1];
    return basicAuth(user, pass);
};
