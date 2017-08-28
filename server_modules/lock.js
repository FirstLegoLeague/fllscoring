//This module wraps lockfile with promises.
var lockfile = require('lockfile');

module.exports = function(filename, options) {
    this.filename = filename;
    this.options = options || {};

    this.lock = function() {
        return new Promise(function(resolve, reject) {
            lockfile.lock('scores.json.lock', this.options, function(err) {
                if(err) {
                    rej(err);
                }

                res();
            });
        });
    };

    this.unlock = function() {
        return new Promise(function(resolve, reject) {
            lockfile.unlock('scores.json.lock', this.options, function(err) {
                if(err){
                    rej(err);
                }

                res();
            });
        });
    };
}
