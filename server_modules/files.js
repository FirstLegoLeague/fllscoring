var utils = require('./utils');
var fileSystem = require('./file_system');
var log = require('./log').log;
var authorize = require('./auth').authorize;

exports.route = function (app, filename) {

    app.get(`/${filename}`, function (req, res) {
        fileSystem.readJsonFile(fileSystem.getDataFilePath(`${filename}.json`)).then(function (result) {
            res.json(result);
        }).catch(err => utils.sendError(res, err)).done();
    });

    app.post(`/${filename}/save`,authorize.any, function (req, res, next) {

        var data = JSON.stringify(req.body[`${filename}`]);
        fileSystem.writeFile(fileSystem.getDataFilePath(`${filename}.json`), data).then(function () {
            res.status(200).end();
        }).catch(function (err) {
            utils.sendError(res, { status: 500, message: `error writing file: ${filename}` })
        });
    });
}