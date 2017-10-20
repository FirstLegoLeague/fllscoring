var utils = require('./utils');
var fileSystem = require('./file_system');
var fs = require('fs');
var path = require('path');

exports.route = function(app) {

    //get challenges over xhr, for hosted service
    app.get('/challenge/:year', function(req, res, next) {
        var file = fileSystem.resolve(`challenges/js/${req.params.year}.js`);
        res.header('Content-Type','text/plain');
        res.sendFile(file);
        next();
    });

    app.get('/challenges/', function(req, res, next) {
        var challengesDir = fileSystem.resolve('challenges/js');
        fs.readdir(challengesDir, function(err, files) {
            if (err) {
                res.status(404).send(err.message);
                next();
                return;
            }
            var challenges = files.filter(function(file){
                return file.indexOf('.js') !== -1;
            }).map(function(fileName){
                return path.basename(fileName, path.extname(fileName));
            });
            res.json(challenges);
            next();
        });
    });
};
