var utils = require('./utils');
var fileSystem = require('./file_system');

exports.route = function(app) {

    //get the teams info
    app.get('/teams',function(req,res) {
        fileSystem.readJsonFile(fileSystem.getDataFilePath('teams.json')).then(function(result) {
            res.json(result);
        }).catch(utils.sendError(res)).done();
    });

    app.get('/teams/:nr',function(req,res) {
        fileSystem.readJsonFile(fileSystem.getDataFilePath('teams.json')).then(function(result) {
            var team = result.filter(function(team) {
                return team.number == req.params.nr;
            })[0];
            res.json(team);
        }).catch(utils.sendError(res)).done();
    });

};
