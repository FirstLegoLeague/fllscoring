var fs = require('fs');
var Q = require('q');
var mkdirp = require('mkdirp');
var path = require('path')
var utils = require('./utils');
var args = require('./args');

function getDataFilePath(file) {
    return path.resolve(path.dirname(process.argv[1]), args.datadir, file);
}

function parseFile(data) {
	return Q.promise(function(resolve,reject) {
        try {
            var res = JSON.parse(data);
            resolve(res);
        } catch(e) {
            reject(e);
        }
    });
}

exports.resolve = function(file) {
	if(file[0] === '/') {
		file = utils.root + file;
	}
	return path.resolve(file);
};

exports.readFile = function(file) {
	if(file[0] === '/') {
		file = utils.root + file;
	}

    return Q.promise(function(resolve,reject) {
        fs.exists(file,function(exists) {
            if (exists) {
                resolve(exists);
            } else {
                reject({
                    status: 404,
                    message: 'file not found'
                });
            }
        });
    }).then(function() {
        return Q.nfcall(fs.readFile, file, "utf-8").catch(function(e) {
            throw new Error({
                status: 500,
                message: 'error reading file'
            });
        });
    });
}

exports.parseDataFile = function(file) {
	return exports.parseFile(getDataFilePath(file));
};

exports.writeFile = function(file, contents, cb) {
    var dir = path.dirname(file);
    mkdirp(dir, function(err) {
        if (err) return cb(err);
        fs.writeFile(file, contents, cb);
    });
}

exports.route = function(app) {

	//reading the "file system"
	app.get(/^\/fs\/(.*)$/, function(req, res) {
	    var file = getDataFilePath(req.params[0]);
	    fs.stat(file, function(err, stat) {
	        if (err) {
	            res.status(404).send('file not found');
	            return;
	        }
	        if (stat.isFile()) {
	            fs.readFile(file, function(err, data) {
	                if (err) {
	                    res.status(500).send('error reading file');
	                    return;
	                }
	                res.send(data);
	            });
	        } else if (stat.isDirectory()) {
	            fs.readdir(file, function(err, filenames) {
	                if (err) {
	                    res.status(500).send('error reading dir');
	                    return;
	                }
	                // FIXME: this doesn't work for filenames containing
	                // newlines. Probably not likely, but stil...
	                var hasNewline = filenames.some(function(name) {
	                    return name.indexOf("\n") >= 0;
	                });
	                if (hasNewline) {
	                    res.status(500).send('invalid filename(s)');
	                    return;
	                }
	                res.send(filenames.join('\n'));
	            });
	        } else {
	            res.status(500).send('error reading file');
	            return;
	        }
	    });
	});

	// writing the "file system"
	app.post(/^\/fs\/(.*)$/, function(req, res) {
	    var file = getDataFilePath(req.params[0]);
	    exports.writeFile(file, req.body, function(err) {
	        if (err) {
	            console.log(err);
	            res.status(500).send('error writing file');
	        }
	        res.status(200).end();
	    });
	});

	// deleting in the "file system"
	app.delete(/^\/fs\/(.*)$/, function(req, res) {
	    var file = getDataFilePath(req.params[0]);
	    fs.unlink(file, function(err) {
	        if (err) {
	            res.status(500).send('error removing file');
	        }
	        res.status(200).end();
	    });
	});

};