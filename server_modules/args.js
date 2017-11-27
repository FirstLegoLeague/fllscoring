var path = require('path');
var argv = require('minimist')(process.argv.slice(2));

exports.port = argv.p || 1390;
exports.basicAuthCreds = argv.u;
exports.rootdir = argv.r || path.resolve(__dirname, "..");
exports.datadir = argv.d || 'data';
exports.slaveMode = argv.s || false;

exports.mhubHost = argv.mhubHost || "ws://localhost:13900";
exports.mhubNode = argv.mhubNode || "default";
exports.mhubUser = argv.mhubUser; // defaults to anonymous
exports.mhubPass = argv.mhubPass;
