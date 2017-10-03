var argv = require('minimist')(process.argv.slice(2));

exports.port = argv.p || 1390;
exports.datadir = argv.d || 'data';
exports.slaveMode = argv.s || false;
exports.configFile = argv.c || '../encloseConfig.js'
