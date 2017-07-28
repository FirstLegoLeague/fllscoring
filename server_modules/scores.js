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

};
