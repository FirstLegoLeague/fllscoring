var utils = require('./utils');
var fileSystem = require('./file_system');
var authorize = require('./auth').authorize;
var reduceToMap = require('./scores').reduceToMap;
var changeScores = require('./scores').changeScores;
var filterPublished = require('./scores').filterPublished;

/*this module deals with anything and everything related to saving data into json files. 
 * 
 * This module manages teams, stages, settings and scores.
 * 
 * http post messages in the format of /<teams|settings|stages>/save to save the relevant data to the right file.
 */


exports.route = function(app) {


    //get the teams info
    app.get('/teams',function(req,res) {
        fileSystem.readJsonFile(fileSystem.getDataFilePath('teams.json')).then(function(result) {
            res.json(result);
        }).catch(err => utils.sendError(res, err)).done();
    });

    app.get('/teams/:nr',function(req,res) {
        fileSystem.readJsonFile(fileSystem.getDataFilePath('teams.json')).then(function(result) {
            var team = result.filter(function(team) {
                return team.number == req.params.nr;
            })[0];
            res.json(team);
        }).catch(err => utils.sendError(res, err)).done();
    });
    app.post('/teams/save', function (req, res, next) {
        var teams = JSON.stringify(req.body.teams);
        fileSystem.writeFile(fileSystem.getDataFilePath('teams.json'), teams).then(function () {
            res.status(200).end();
        }).catch(function (err) {
            utils.sendError(res, { status: 500, message: `error writing file` })
        });
    });




    //get the teams info
    app.get('/stages',function(req,res) {
        fileSystem.readJsonFile(fileSystem.getDataFilePath('stages.json')).then(function(result) {
            res.json(result);
        }).catch(err => utils.sendError(res, err)).done();
    });

    app.post('/stages/save', function (req, res, next) {
         var stages = JSON.stringify(req.body.stages);
         fileSystem.writeFile(fileSystem.getDataFilePath('stages.json'), stages).then(function () {
             res.status(200).end();
         }).catch(function (err) {
             utils.sendError(res, { status: 500, message: `error writing file` })
         });
     });




    //get the teams info
    app.get('/settings',function(req,res) {
        fileSystem.readJsonFile(fileSystem.getDataFilePath('settings.json')).then(function(result) {
            res.json(result);
        }).catch(err => utils.sendError(res, err)).done();
    });

    app.post('/settings/save', function (req, res, next) {
         var settings = JSON.stringify(req.body.settings);
         fileSystem.writeFile(fileSystem.getDataFilePath('settings.json'), settings).then(function () {
             res.status(200).end();
         }).catch(function (err) {
             utils.sendError(res, { status: 500, message: `error writing file` })
         });
     });



     //get all, grouped by round
    app.get('/scores/', function(req,res) {
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
    app.get('/scores/:round', function(req,res) {
        var round = parseInt(req.params.round,10);

        fileSystem.readJsonFile(fileSystem.getDataFilePath('scores.json')).then(function(result) {
            var scoresForRound = result.scores.filter(filterPublished).filter(function(score) {
                return score.published && score.round === round;
            });
            res.json(scoresForRound);
        }).catch(err => utils.sendError(res, err)).done();
    });

    //save a new score
    app.post('/scores/create', authorize.any, function(req,res) {
        var scoresheet = req.body.scoresheet;
        var score = req.body.score;

        fileSystem.writeFile(fileSystem.getDataFilePath("scoresheets/" + score.file), JSON.stringify(scoresheet))
        .then(changeScores(function(result) {
            result.scores.push(score);
            return result;
        }))
        .then(function(scores) {
            res.json(scores).end();
        }).catch(err => utils.sendError(res, err));

    });

    //delete a score at an id
    app.post('/scores/delete/:id', authorize.any, function(req,res) {
        changeScores(function(result) {
            var index = result.scores.findIndex((score) => score.id === req.params.id);
            if(index === -1) {
                throw new Error(`Could not find score with id ${req.params.id}`);
            }
            result.scores.splice(index, 1);
            return result;
        }).then(function(scores) {
            res.json(scores).end();
        }).catch(err => utils.sendError(res, err));
    });

    //edit a score at an id
    app.post('/scores/update/:id', authorize.any, function(req,res) {
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
        }).catch(err => utils.sendError(res, err));
    });
};
