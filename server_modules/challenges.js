var utils = require('./utils');
var fileSystem = require('./file_system');

exports.route = function(app) {

    //get challenges over xhr, for hosted service
    app.get('/challenge/:year', function(req, res) {
        var file = fileSystem.resolve('challenges/js/{0}.js'.format(req.params.year));

        res.header('Content-Type','text/plain');
        res.sendFile(file);
    });

};
