var express = require('express');
var app = express();
var fs = require('fs');
var Q = require('q');
var mkdirp = require("mkdirp");
var dirname = require('path').dirname;
var resolve = require('path').resolve;
var argv = require('minimist')(process.argv.slice(2));
var port = argv.p||1390;
var basicAuth = require('basic-auth-connect');
var basicAuthCreds = argv.u;
var datadir = argv.d||'data';
var slaveMode = argv.s||false;

if (slaveMode) {
    // Shut down this process when we detect that the parent is gone.
    // This is useful when being spawned through e.g. `fllproxy`.
    // Note that this also works when the parent is killed by e.g. SIGKILL.
    process.stdin.resume();
    process.stdin.on('end', function() {
        process.exit();
    });
}

app.use(express.static(resolve(__dirname,'src')));

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

app.use(function(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
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

function getDataFilePath(path) {
    var fullpath = resolve(dirname(process.argv[1]),datadir,path);
    return fullpath;
}

function readFile(path) {
    return Q.promise(function(resolve,reject) {
        fs.exists(path,function(exists) {
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
        return Q.nfcall(fs.readFile, path, "utf-8").catch(function(e) {
            throw new Error({
                status: 500,
                message: 'error reading file'
            });
        });
    });
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

function sendError(res) {
    return function(err) {
        res.status(err.status).send(err.message);
    }
}

//reading the "file system"
app.get(/^\/fs\/(.*)$/, function(req, res) {
    var path = getDataFilePath(req.params[0]);
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

    readFile(path).then(function(data) {
        res.header('Content-Type','text/plain');
        res.send(data);
    }).catch(sendError(res)).done();
});


function filterPublished(score) {
    return score.published;
}

function reduceToMap(key) {
    return function(arr) {
        return arr.reduce(function(map,record) {
            map[record[key]] = record;
            return map;
        },{});
    }
}

//get all, grouped by round
app.get('/scores/',function(req,res) {
    Q.all([
        readFile(getDataFilePath('scores.json')).then(parseFile),
        readFile(getDataFilePath('teams.json')).then(parseFile).then(reduceToMap('number'))
    ]).spread(function(result,teams) {
        var published = result.scores.filter(filterPublished).reduce(function(rounds,score) {
            if (!rounds[score.round]) {
                rounds[score.round] = [];
            }
            score.team = teams[score.teamNumber];
            rounds[score.round].push(score);
            return rounds;
        },{});
        res.json(published);
    }).catch(sendError(res)).done();
});

//get scores by round
app.get('/scores/:round',function(req,res) {
    var path = getDataFilePath('scores.json');
    var round = parseInt(req.params.round,10);

    readFile(path).then(parseFile).then(function(result) {
        var scoresForRound = result.scores.filter(filterPublished).filter(function(score) {
            return score.published && score.round === round;
        });
        res.json(scoresForRound);
    }).catch(sendError(res)).done();
});

//serve admin page
app.get('/admin',function(req,res) {
    res.sendFile(resolve(__dirname+'/src/admin.html'));
});

//get the teams info
app.get('/teams',function(req,res) {
    var path = getDataFilePath('teams.json');

    readFile(path).then(parseFile).then(function(result) {
        res.json(result);
    }).catch(sendError(res)).done();
});

app.get('/teams/:nr',function(req,res) {
    var path = getDataFilePath('teams.json');

    readFile(path).then(parseFile).then(function(result) {
        var team = result.filter(function(team) {
            return team.number == req.params.nr;
        })[0];
        res.json(team);
    }).catch(sendError(res)).done();
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
    var path = getDataFilePath(req.params[0]);
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
    var path = getDataFilePath(req.params[0]);
    fs.unlink(path, function(err) {
        if (err) {
            res.status(500).send('error removing file');
        }
        res.status(200).end();
    });
});

app.listen(port, function() {
    console.log('Listening on port ', port);
    console.log('open browser to http://localhost:'+port+'/');
});
