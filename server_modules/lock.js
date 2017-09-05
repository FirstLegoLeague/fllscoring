//This module wraps lockfile with promises.
var lockfile = require('lockfile');

module.exports = function(filename, options) {
    this.filename = filename;
    this.options = options || {};

    this.lock = function() {
        var self = this;

        return new Promise(function(resolve, reject) {
                lockfile.lock('scores.json.lock', self.options, function(err) {
                if(err && err.code !== 'EEXIST') {
                    reject(err);
                }

                resolve();
            });
        });
    };

    this.unlock = function() {
        return new Promise(function(resolve, reject) {
            lockfile.unlock('scores.json.lock', function(err) {
                if(err && err.code !== 'EEXIST') {
                    reject(err);
                }

                resolve();
            });
        });
    };
}
