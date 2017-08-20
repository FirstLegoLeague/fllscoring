var os = require('os');
var args = require('./args')

//shamelessly copied from StackOverflow with only minor changes
var interfaces = os.networkInterfaces();
var serverAddress = "";
for (var i in interfaces) {
    for (var j in interfaces[i]) {
        var address = interfaces[i][j];//we basically parse over all the addresses for every network interface
        if (address.family === 'IPv4' && !address.internal) {//if that address is an IPv4 address, and it is not an internal one, that's the address we are looking for
            serverAddress = address.address;
            break;
        }
    }
}

exports.middleware = function (req, res, next) {
    req.session.serverAddress = serverAddress + ':' + args.port;
    next();
};
