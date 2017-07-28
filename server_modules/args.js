var argv = require('minimist')(process.argv.slice(2));

exports.port = argv.p || 1390;
exports.basicAuthCreds = argv.u;
exports.datadir = argv.d || 'data';
exports.slaveMode = argv.s || false;
