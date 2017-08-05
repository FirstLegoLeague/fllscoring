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
    return path.resolve(path.dirname(process.argv[1]), file);
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

exports.writeFile = function(file, contents) {
    file = exports.resolve(file);

    return Q.promise(function(resolve, reject) {
        var dir = path.dirname(file);
        mkdirp(dir, function(err) {
            if (err) return reject(err);
            fs.writeFile(file, contents, function(err) {
                if(err) return reject(err);
                resolve();
            });
        });
    });
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
