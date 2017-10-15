var utils = require('./utils');
var fileSystem = require('./file_system');

exports.route = function(app) {

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

};
