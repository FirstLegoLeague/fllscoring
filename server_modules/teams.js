var fileSystem = require('./file_system');
var file = require('./files');

exports.route = function (app) {

    app.get('/teams/:nr', function (req, res) {
        fileSystem.readJsonFile(fileSystem.getDataFilePath('teams.json')).then(function (result) {
            var team = result.filter(function (team) {
                return team.number == req.params.nr;
            })[0];
            res.json(team);
            next();
        }).catch(err => {
            res.sendError(err);
            next();
        }).done();
    });
    file.route(app, 'teams');
};
