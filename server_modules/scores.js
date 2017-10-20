var lockfile = require('lockfile');
var fileSystem = require('./file_system');
var authorize = require('./auth').authorize;
var Q = require('q');

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

// This function is meant to lock the ability to change the scores.json file, using lockfile and a promise chain
function changeScores(action) {
    return new Promise(function(res, rej) {
        var path = fileSystem.getDataFilePath('scores.json');
        lockfile.lock('scores.json.lock', { retries: 5, retryWait: 100 }, function (err) {
            if(err) rej(err);
            fileSystem.readJsonFile(path)
            .catch(function(err) {
                if(err.message === 'file not found') {
                    return { version:3, scores: [] };
                } else {
                    throw err;
                }
            })
            .then(action)
            .then(function(scores) {
                return fileSystem.writeFile(path, JSON.stringify(scores)).then(function() {
                    lockfile.unlock('scores.json.lock', function(err) {
                        if(err) rej(err);
                    });
                    return scores;
                }).catch(function() {
                    lockfile.unlock('scores.json.lock', function(err) {
                        if(err) rej(err);
                    });
                    return scores;
                });
            }).then(res).catch(rej);
        });
    });
}

exports.route = function(app) {

    //get all, grouped by round
    app.get('/scores/', function(req,res,next) {
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
            next();
        }).catch(err => {
            res.sendError(err);
            next();
        }).done();
    });

    //get scores by round
    app.get('/scores/:round', function(req,res,next) {
        var round = parseInt(req.params.round,10);

        fileSystem.readJsonFile(fileSystem.getDataFilePath('scores.json')).then(function(result) {
            var scoresForRound = result.scores.filter(filterPublished).filter(function(score) {
                return score.published && score.round === round;
            });
            res.json(scoresForRound);
            next();
        }).catch(err => {
            res.sendError(err);
            next();
        }).done();
    });

    //save a new score
    app.post('/scores/create', authorize.any, function(req,res,next) {
        var scoresheet = req.body.scoresheet;
        var score = req.body.score;

        fileSystem.writeFile(fileSystem.getDataFilePath("scoresheets/" + score.file), JSON.stringify(scoresheet))
        .then(changeScores(function(result) {
            result.scores.push(score);
            return result;
        })
        .then(function(scores) {
            res.json(scores).end();
            next();
        }).catch(err => {
            res.sendError(err);
            next();
        });

    });

    //delete a score at an id
    app.post('/scores/delete/:id', authorize.any, function(req,res,next) {
        changeScores(function(result) {
            var index = result.scores.findIndex((score) => score.id === req.params.id);
            if(index === -1) {
                throw new Error(`Could not find score with id ${req.params.id}`);
            }
            result.scores.splice(index, 1);
            return result;
        }).then(function(scores) {
            res.json(scores).end();
            next();
        }).catch(err => {
            res.sendError(err);
            next();
        });
    });

    //edit a score at an id
    app.post('/scores/update/:id', authorize.any, function(req,res,next) {
        var score = req.body;
        changeScores(function(result) {
            var index = result.scores.findIndex((score) => score.id === req.params.id);
            if(index === -1) {
                throw new Error(`Could not find score with id ${req.params.id}`);
            }
            result.scores[index] = score;
            return result;
        }).then(function(scores) {
            res.json(scores).end();
            next();
        }).catch(err => {
            res.sendError(err);
            next();
        });
    });


};
