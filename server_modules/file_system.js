var fs = require('fs');
var Q = require('q');
var mkdirp = require('mkdirp');
var path = require('path')
var utils = require('./utils');
var args = require('./args');
var log = require('./log').log;

function parseData(data) {
    return jsonParsingPromise = Q.promise(function(resolve,reject) {
        try {
            var res = JSON.parse(data);
            resolve(res);
        } catch(e) {
            reject(e);
        }
    });
}

exports.getDataFilePath = function(file) {
    return exports.resolve(path.join(args.datadir, file));
};

exports.resolve = function(file) {
    return path.resolve(args.rootdir, file);
};

/**
 * @typedef {Object} Hook
 * @property {RegExp | string} pattern
 * @property {(data: string, filename: string) => string | Promise<string>} callback
 */

/**
 * Registry of filesystem hooks.
 * @type {{ [type: string]: Hook[] }}
 */
var hooksRegistry;

/**
 * Clear all register hooks, returns function to restore them.
 * Useful for testing.
 */
exports.clearHooks = function () {
    var oldHooks = hooksRegistry;
    hooksRegistry = {
        write: [],
    };
    return () => { hooksRegistry = oldHooks; };
};

// Initialize hooks
exports.clearHooks();

/**
 * Call any hooks of the specified type (e.g. "write"), in order of registration,
 * when they match the filename. First hook is called with data, subsequent hooks
 * are called with result of previous hook.
 * If no hooks match, the data is returned as-is (in a Promise).
 *
 * Filename is first made relative to args.rootdir, to make matching independent
 * of location of this package.
 *
 * @param type {string} Type of hook (e.g. "write")
 * @param filename {string} Filename to match against
 * @param data {string} Data to be passed to hook
 * @return {Promise<string>} Transformed data
 */
exports.callHooks = function (type, filename, data) {
    const hooks = hooksRegistry[type];
    if (!hooks) {
        throw new Error("unknown hook type " + type);
    }

    // Make filename a relative path with forward slashes, e.g. "data/scores.json"
    filename = path.relative(args.rootdir, filename).replace(/\\/g, '/');

    // Start with source data
    const initial = Promise.resolve(data);

    // Run each hook consecutively
    return hooks.reduce((intermediate, hook) => {
        const pattern = hook.pattern;
        const isMatch = typeof pattern === "string" ? pattern === filename : pattern.test(filename);
        if (!isMatch) {
            return intermediate;
        }
        // It matches: add another transform to the chain
        return intermediate.then((data) => {
            const transformed = hook.callback(data, filename);
            if (typeof transformed !== "string" && (typeof transformed !== "object" || typeof transformed.then !== "function")) {
                throw new Error("hook for pattern " + hook.pattern.toString() + " returned invalid data");
            }
            return transformed;
        });
    }, initial);
}

/**
 * Register a hook to be called when operating on a file.
 *
 * Usage example:
 *   registerHook('write', /^foo\.txt$/, (data) => data.toUpperCase());
 * or
 *   registerHook('write', 'foo.txt', (data) => data.toUpperCase());
 *
 * Then, writeFile('foo.txt', 'something') will write SOMETHING instead.
 *
 * Hooks are called in order of registration, and subsequent hooks will
 * receive the output of the previous hook(s).
 *
 * Before matching and calling hooks, any filename is first made relative
 * to the package's root dir (i.e. `args.rootdir`).
 *
 * @param type {string} Type of hook (e.g. "write")
 * @param pattern {RegExp | string} Matched against filename relative to root dir (e.g. /^data\/scores\.json$/)
 * @param callback {(data: string, filename: string) => string | Promise<string>}
 *            Called when pattern matches filename.
 *            Receives the data to be written (utf-8) and filename, is expected to return (promise for) optionally
 *            modified file data. It is an error to return nothing.
 * @return void
 */
exports.registerHook = function (type, pattern, callback) {
    const hooks = hooksRegistry[type];
    if (!hooks) {
        throw new Error("unknown hook type " + type);
    }
    hooks.push({
        pattern,
        callback
    });
};

exports.readFile = function(file) {
    file = exports.resolve(file);

    return Q.promise(function(resolve,reject) {
        fs.exists(file,function(exists) {
            if (exists) {
                resolve(exists);
            } else {
                log.error("file not found {0}".format(file));
                reject({
                    status: 404,
                    message: 'file not found'
                });
            }
        });
    }).then(function() {
        return Q.nfcall(fs.readFile, file, "utf-8").catch(function(e) {
            log.error("error reading file {0}".format(file));
            throw new Error({
                status: 500,
                message: 'error reading file'
            });
        });
    });
};

exports.writeFile = function (file, contents) {
    file = exports.resolve(file);
    var dir = path.dirname(file);
    return Q.nfcall(mkdirp, dir)
        .then(() => exports.callHooks("write", file, contents))
        .then((transformed) => Q.nfcall(fs.writeFile, file, transformed));
};

exports.readJsonFile = function(file) {
    return exports.readFile(file).then(parseData);
};

exports.route = function(app) {

    //reading the "file system"
    app.get(/^\/fs\/(.*)$/, function(req, res) {
        var file = exports.getDataFilePath(req.params[0]);
        fs.stat(file, function(err, stat) {
            if (err) {
                log.error("file not found {0}".format(file));
                res.status(404).send('file not found');
                return;
            }
            if (stat.isFile()) {
                fs.readFile(file, function(err, data) {
                    if (err) {
                        log.error("error reading file {0}".format(file));
                        res.status(500).send('error reading file');
                        return;
                    }
                    res.send(data);
                });
            } else if (stat.isDirectory()) {
                fs.readdir(file, function(err, filenames) {
                    if (err) {
                        log.error("error reading dir {0}".format(file));
                        res.status(500).send('error reading dir');
                        return;
                    }
                    // FIXME: this doesn't work for filenames containing
                    // newlines. Probably not likely, but stil...
                    var hasNewline = filenames.some(function(name) {
                        return name.indexOf("\n") >= 0;
                    });
                    if (hasNewline) {
                        log.error("invalid filename(s) {0}".format(filenames.join(', ')));
                        res.status(500).send('invalid filename(s)');
                        return;
                    }
                    res.send(filenames.join('\n'));
                });
            } else {
                log.error("error reading file {0}".format(file));
                res.status(500).send('error reading file');
                return;
            }
        });
    });

    // writing the "file system"
    app.post(/^\/fs\/(.*)$/, function(req, res) {
        var file = exports.getDataFilePath(req.params[0]);
        exports.writeFile(file, req.body).then(function() {
            res.status(200).end();
        }).catch(function(err) {
            log.error("error writing file {0}".format(err));
            res.status(500).send('error writing file');
        });
    });

    // deleting in the "file system"
    app.delete(/^\/fs\/(.*)$/, function(req, res) {
        var file = exports.getDataFilePath(req.params[0]);
        fs.unlink(file, function(err) {
            if (err) {
                log.error("error removing file {0}".format(err));
                res.status(500).send('error removing file');
            }
            res.status(200).end();
        });
    });

};
