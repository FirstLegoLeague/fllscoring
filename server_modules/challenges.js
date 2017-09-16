var utils = require('./utils');
var fileSystem = require('./file_system');
var fs = require("fs");
var path = require('path');

exports.route = function(app) {

    //get challenges over xhr, for hosted service
    app.get('/challenge/:year', function(req, res) {
        var file = fileSystem.resolve('challenges/js/{0}.js'.format(req.params.year));
        res.header('Content-Type','text/plain');
        res.sendFile(file);
    });

    app.get('/challenges/', function(req, res) {
        fs.readdir('challenges/js', function(err, files) { 
            if (err) {
                res.status(404).send(err.message);
                return;
            }
            var challenges = files.filter(function(file){
                return file.indexOf('.js') !== -1;
            }).map(function(fileName){
                return path.basename(fileName, path.extname(fileName));
            });
            res.json(challenges);
        });
    });
};
