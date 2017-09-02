var Lock = require('./lock');
var utils = require('./utils');
var fileSystem = require('./file_system');
var log = require('./log');
var Q = require('q');
var id = require('uuid/v4');

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

/**
 * Atomically change scores file.
 * Action callback is called with the current contents of the scores file, and is expected
 * to return the new contents (or a Promise for it).
 * A lock is acquired and held during the entire operation.
 * @param action Callback that receives current scores.json object, must return new contents (or Promise for it)
 * @return Promise for updated scores object
 */
function changeScores(action) {
    var path = fileSystem.getDataFilePath('scores.json');
    var lock = new Lock('scores.json.lock', { retries: 5, retryWait: 100 });

    console.log(lock.options);

    return lock.lock()
    .then(() => fileSystem.readJsonFile(path))
    .catch((err) => { //Ignoring all file not found errors, and just returning empty scores.json
        console.log("catching");
        if(err.message === 'file not found') {
            console.log("hells yeah!");
            return { version:3, scores: [], sheets: [] };
        } else {
            console.log("ho no! " + err.message);
            throw err;
        }
    })
    .then(action)
    .then(scores => {
        return fileSystem.writeFile(path, JSON.stringify(scores))
        .then(() => {
            return lock.unlock();
        }).catch((err) => {
            return lock.unlock();
        }).then(function() {
            return scores;
        });
    });
}

exports.route = function(app) {

    //get all, grouped by round
    app.get('/scores/',function(req,res) {
        Q.all([
            fileSystem.readJsonFile(fileSystem.getDataFilePath('scores.json')),
            fileSystem.readJsonFile(fileSystem.getDataFilePath('teams.json')).then(reduceToMap('number'))
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
        }).catch(utils.sendError(res)).done();
    });

    //get scores by round
    app.get('/scores/:round',function(req,res) {
        var round = parseInt(req.params.round,10);

        fileSystem.readJsonFile(fileSystem.getDataFilePath('scores.json')).then(function(result) {
            var scoresForRound = result.scores.filter(filterPublished).filter(function(score) {
                return score.published && score.round === round;
            });
            res.json(scoresForRound);
        }).catch(utils.sendError(res)).done();
    });

    //save a new score
    app.post('/scores/create',function(req,res) {
        var body = JSON.parse(req.body);
        var scoresheet = body.scoresheet;
        var score = body.score;

        fileSystem.writeFile(fileSystem.getDataFilePath("scoresheets/" + score.file), req.body)
        .then(changeScores(function(result) {
            if(typeof(score.id) === 'undefined') {
                score.id = id();
            }
            result.scores.push(score);
            result.sheets.push(score.file)
            return result;
        }))
        .then(function(scores) {
            res.json(scores).end();
        }).catch(utils.sendError(res)).done();

    });

    //delete a score at an id
    app.post('/scores/delete/:id',function(req,res) {
        changeScores(function(result) {
            var index = result.scores.findIndex((score) => score.id === req.params.id);
            if(index === -1) {
                throw new Error(`Could not find score with id ${req.params.id}`);
            }
            result.scores.splice(index, 1);
            return result;
        }).then(function(scores) {
            res.json(scores).end();
        }).catch(utils.sendError(res)).done();
    });

    //edit a score at an id
    app.post('/scores/update/:id',function(req,res) {
        var score = JSON.parse(req.body);
        changeScores(function(result) {
            var index = result.scores.findIndex((score) => score.id === req.params.id);
            if(index === -1) {
                throw new Error(`Could not find score with id ${req.params.id}`);
            }
            result.scores[index] = score;
            return result;
        }).then(function(scores) {
            res.json(scores).end();
        }).catch(utils.sendError(res)).done();
    });


};

// For backward compatibility

changeScores(function(scores) {
    if(typeof(scores.version) === 'undefined') {
        scores.forEach(score => score.id = id())
        return {
            version: 3,
            scores: scores,
            sheets: []
        }

    } else if(scores.version === 3) {
        return scores;

    } else if(scores.version === 2) {
        scores.scores.forEach(score => score.id = id())
        scores.version = 3;
        return scores;

    } else {
        throw new Error('Unkown scores version');
    }

});

// Polling for sheets automatically on server load

function sanitizeScore(score) {
    // Passthrough for already valid inputs
    if (typeof score === "number")
        return score;
    switch (score) {
        case "dnc":
        case "dsq":
        case null:
            return score;
    }
    // Accept numbers stored as strings
    var n = parseInt(score, 10);
    if (String(n) === score)
        return n;
    // Try to convert some spellings of accepted strings
    if (typeof score === "string") {
        var s = score.toLowerCase();
        switch (s) {
            case "dnc":
            case "dsq":
                return s;
            case "":
                return null;
        }
    }
    // Pass through the rest
    log("Warning: invalid score " + score);
    return score;
}

function loadScoresheetScore(filename) {
    return fs.readJsonFile(fileSystem.getDataFilePath("scoresheets/" + score.file)).then(function(scoresheet) {
        return {
            file: (entry.file !== undefined && entry.file !== null) ? String(entry.file) : "",
            teamNumber: parseInt((entry.teamNumber !== undefined) ? entry.teamNumber : entry.team.number, 10),
            stageId: String((entry.stageId !== undefined) ? entry.stageId : entry.stage.id),
            round: parseInt(entry.round, 10),
            score: sanitizeScore(entry.score), // can be Number, null, "dnc", etc.
            originalScore: parseInt(entry.originalScore !== undefined ? entry.originalScore : entry.score, 10),
            edited: entry.edited !== undefined ? String(entry.edited) : undefined, // timestamp, e.g. "Wed Nov 26 2014 21:11:43 GMT+0100 (CET)"
            published: !!entry.published,
            table: entry.table
        };
    });
}

changeScores(function(scores) {
    return fileSystem.filesInDir('data/scoresheet').then(function(files) {
        var promises = []

        for(var i = 0; i < files.length; i++) {
            if(!scores.sheets.includes(files[i])) {
                var promise = loadScoresheetScore(files[i]).then(function(score) {
                    scores.scores.push(score);
                    scores.sheets.push(files[i]);
                }).catch(function(err) {
                    log.error(`Error reading scoresheet ${files[i]}: ${err}`);
                });
                promises.push(promise);
            }
        }

        return Q.all(promises).spread(function() {
            return scores;
        });
    });
});
