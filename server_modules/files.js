var fileSystem = require('./file_system');
var log = require('./log').log;
var authorize = require('./auth').authorize;

exports.route = function (app, filename) {

    app.get(`/${filename}`, function (req, res, next) {
        fileSystem.readJsonFile(fileSystem.getDataFilePath(`${filename}.json`)).then(function (result) {
            res.json(result);
            next();
        }).catch(err => {
            res.sendError(err);
            next();
        }).done();
    });

    app.post(`/${filename}/save`,authorize.any, function (req, res, next) {

        var data = JSON.stringify(req.body[`${filename}`]);
        fileSystem.writeFile(fileSystem.getDataFilePath(`${filename}.json`), data)
        .then(function () {
            res.status(200).end();
            next();
        }).catch(function (err) {
            res.sendError({ status: 500, message: `error writing file: ${filename}` });
            next();
        });
    });
}