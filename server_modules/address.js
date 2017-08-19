var os = require('os');
var args = require('./args')

//shamelessly copied from StackOverflow with only minor changes
var interfaces = os.networkInterfaces();
var addresses = [];
for (var i in interfaces) {
    for (var j in interfaces[i]) {
        var address = interfaces[i][j];//we basically parse over all the addresses for every network interface
        if (address.family === 'IPv4' && !address.internal) {//if that address is an IPv4 address, and it is not an internal one, we add it
            addresses.push(address.address);
        }
    }
}

exports.middleware = function (req, res, next) {
    req.session.serverAddress = addresses[0] + ':' + args.port; //we set the server address to the first one. In reality, any of them would work
    next();
};
