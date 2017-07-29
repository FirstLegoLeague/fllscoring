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

function summery(scoresheet) {
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
    .then(callback)
    .then(function(scores) {
        fileSystem.writeFile(path, JSON.stringify(scores));
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

    //get scores by round
    app.post('/scores/create',function(req,res) {
        var scoresheet = JSON.parse(req.body).scoresheet;
        var score = summery(scoresheet);

        fileSystem.writeFile(fileSystem.getDataFilePath("scoresheets/" + score.file), req.body)
        .then(changeScores(function(result) {
                result.scores[score.id] = score;
                return result;
            }))
        .then(function(scores) {
            res.json(scores).end();
        }).catch(function(err) {
            log.error("error writing score summery {0}".format(err));
            res.status(500).send('error writing score summery');
        });

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
