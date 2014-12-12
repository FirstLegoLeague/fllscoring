var express = require('express');
var app = express();
var fs = require('fs');
var mkdirp = require("mkdirp");
var dirname = require('path').dirname;
var argv = require('minimist')(process.argv.slice(2));
var port = argv.p||1390;
var basicAuth = require('basic-auth-connect');
var basicAuthCreds = argv.u;

app.use(express.static('src'));

//set up basic authentication
if (basicAuthCreds) {
    var pair = basicAuthCreds.split(':');
    var user = pair[0];
    var pass = pair[1];
    app.use(basicAuth(user, pass));
}

//allow cors headers
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

    next();
});

//set raw body as data arrives
app.use(function(req, res, next) {
    var data = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) {
        data += chunk;
    });

    req.on('end', function() {
        req.body = data;
        next();
    });
});

//reading the "file system"
app.get(/^\/fs\/(.*)$/, function(req, res) {
    var path = __dirname + '/data/' + req.params[0];
    fs.stat(path, function(err, stat) {
        if (err) {
            res.status(404).send('file not found');
            return;
        }
        if (stat.isFile()) {
            fs.readFile(path, function(err, data) {
                if (err) {
                    res.status(500).send('error reading file');
                    return;
                }
                res.send(data);
            });
        } else if (stat.isDirectory()) {
            fs.readdir(path, function(err, filenames) {
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

//get challenges over xhr, for hosted service
app.get('/challenge/:year', function(req, res) {
    var path = __dirname + '/challenges/js/' + req.params.year + '.js';
    fs.exists(path, function(exists) {
        if (exists) {
            fs.readFile(path, function(err, data) {
                if (err) {
                    res.status(500).send('error reading file');
                }
                res.header('Content-Type','text/plain');
                res.send(data);
            });
        } else {
            res.status(404).send('file not found');
        }
    });
});


function writeFile(path, contents, cb) {
    var dir = dirname(path);
    mkdirp(dir, function(err) {
        if (err) return cb(err);
        fs.writeFile(path, contents, cb);
    });
}

// writing the "file system"
app.post(/^\/fs\/(.*)$/, function(req, res) {
    var path = __dirname + '/data/' + req.params[0];
    writeFile(path, req.body, function(err) {
        if (err) {
            console.log(err);
            res.status(500).send('error writing file');
        }
        res.status(200).end();
    });
});

// deleting in the "file system"
app.delete(/^\/fs\/(.*)$/, function(req, res) {
    var path = __dirname + '/data/' + req.params[0];
    fs.unlink(path, function(err) {
        if (err) {
            res.status(500).send('error removing file');
        }
        res.status(200).end();
    });
});

app.listen(port);
console.log('Listening on port ', port);
