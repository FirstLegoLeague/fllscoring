var utils = require('./utils');
var fileSystem = require('./file_system');

exports.route = function(app) {

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

};
