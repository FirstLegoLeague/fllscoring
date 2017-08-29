var Lock = require('./lock');
var utils = require('./utils');
var fileSystem = require('./file_system');
var log = require('./log').log;
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
            return { version:3, scores: [] };
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
        }).catch(err => utils.sendError(res, err)).done();
    });

    //get scores by round
    app.get('/scores/:round',function(req,res) {
        var round = parseInt(req.params.round,10);

        fileSystem.readJsonFile(fileSystem.getDataFilePath('scores.json')).then(function(result) {
            var scoresForRound = result.scores.filter(filterPublished).filter(function(score) {
                return score.published && score.round === round;
            });
            res.json(scoresForRound);
        }).catch(err => utils.sendError(res, err)).done();
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
            return result;
        }))
        .then(function(scores) {
            res.json(scores).end();
        }).catch(err => utils.sendError(res, err)).done();

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
        }).catch(err => utils.sendError(res, err)).done();
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
        }).catch(err => utils.sendError(res, err)).done();
    });


};


// For backward compatibility

changeScores(function(scores) {
    if(typeof(scores.version) === 'undefined') {
        log.warn('Deprecated scores version. Updating to version 3.')
        scores.forEach(score => score.id = id())
        return {
            version: 3,
            scores: scores
        }

    } else if(scores.version === 3) {
        return scores;

    } else if(scores.version === 2) {
        log.warn('Deprecated scores version. Updating to version 3.');
        scores.scores.forEach(score => score.id = id())
        scores.version = 3;
        return scores;

    } else {
        throw new Error('Unkown scores version');
    }

});
