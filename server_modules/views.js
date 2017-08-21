var fileSystem = require('./file_system');
var autorize = require('./auth').authorize;

exports.route = function(app) {

    app.get('/',function(req,res) {
        res.sendFile(fileSystem.resolve('index.html'));
    });

};
