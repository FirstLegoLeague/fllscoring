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

function summary(scoresheet) {
    var fn = [
        'score',
        scoresheet.stage.id,
        'round' + scoresheet.round,
        'table' + scoresheet.table,
        'team' + scoresheet.team.number,
        scoresheet.uniqueId
    ].join('_')+'.json';

    return {
        id: scoresheet.uniqueId,
        file: fn,
        teamNumber: scoresheet.teamNumber !== undefined ? scoresheet.teamNumber : scoresheet.team.number,
        stageId: scoresheet.stageId !== undefined ? scoresheet.stageId : scoresheet.stage.id,
        round: scoresheet.round,
        score: scoresheet.score,
        table: scoresheet.table
    };
}

function changeScores(callback) {
    var path = fileSystem.getDataFilePath('scores.json');
    return fileSystem.readJsonFile(path)
    .then(function(data) {
        return data;
    }, function() {
        return { version:2, scores: [] };
    })
    .then(callback)
    .then(function(scores) {
        lockfile.lock('scores.json.lock', { retries: 5, retryWait: 100 }, function (err) {
            if(err) throw err;

            fileSystem.writeFile(path, JSON.stringify(scores));

            lockfile.unlock('scores.json.lock', function(err) {
                if(err) throw err;
            });
        });
        return scores;
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
        var scoresheet = JSON.parse(req.body).scoresheet;
        var score = summary(scoresheet);

        changeScores(function(result) {
            result.scores.push(score);
            return result;
        })
        .then(fileSystem.writeFile(fileSystem.getDataFilePath("scoresheets/" + score.file), req.body))
        .then(function(scores) {
            res.json(scores).end();
        }).catch(utils.sendError(res));

    });

    //delete a score at an id
    app.post('/scores/delete/:id',function(req,res) {
        changeScores(function(result) {
            result.scores = result.scores.filter((score) => score.id !== req.params.id);
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
            result.scores[index] = score;
            return result;
        }).then(function(scores) {
            res.json(scores).end();
        }).catch(utils.sendError(res)).done();
    });


};
