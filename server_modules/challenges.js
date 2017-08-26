var utils = require('./utils');
var fileSystem = require('./file_system');

exports.route = function(app) {

    //get challenges over xhr, for hosted service
    app.get('/challenge/:year', function(req, res) {
        var file = fileSystem.resolve(`challenges/js/${req.params.year}.js`);

        res.header('Content-Type','text/plain');
        res.sendFile(file);
    });

};
