var lockfile = require('lockfile');
var utils = require('./utils');
var fileSystem = require('./file_system');
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

function changeScores(action) {
    var path = fileSystem.getDataFilePath('scores.json');
    return new Promise(function(res, rej) {
        lockfile.lock('scores.json.lock', { retries: 5, retryWait: 100 }, function (err) {
            if(err) rej(err);

            promise = fileSystem.readJsonFile(path)
            .then(function(data) {
                return data;
            })
            .catch(function() {
                return { version:3, scores: [] };
            })
            .then(action)
            .then(function(scores) {
                fileSystem.writeFile(path, JSON.stringify(scores));

                lockfile.unlock('scores.json.lock', function(err) {
                    if(err) rej(err);
                });
                return scores;
            }).then(res).catch(rej);
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
            result.scores.push(score);
            return result;
        }))
        .then(function(scores) {
            res.json(scores).end();
        }).catch(err => utils.sendError(res, err));

    });

    //delete a score at an id
    app.post('/scores/delete/:id',function(req,res) {
        changeScores(function(result) {
            var index = result.scores.findIndex((score) => score.id === req.params.id);
            if(index === -1) {
                throw new Exception(`Could not find score with id ${req.params.id}`);
            }
            result.scores.splice(index, 1);
            return result;
        }).then(function(scores) {
            res.json(scores).end();
        }).catch(err => utils.sendError(res, err));
    });

    //edit a score at an id
    app.post('/scores/update/:id',function(req,res) {
        var score = JSON.parse(req.body);
        changeScores(function(result) {
            var index = result.scores.findIndex((score) => score.id === req.params.id);
            if(index === -1) {
                throw new Exception(`Could not find score with id ${req.params.id}`);
            }
            result.scores[index] = score;
            return result;
        }).then(function(scores) {
            res.json(scores).end();
        }).catch(err => utils.sendError(res, err));
    });


};
