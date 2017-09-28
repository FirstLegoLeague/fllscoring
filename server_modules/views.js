var fileSystem = require('./file_system');

exports.route = function(app) {

    app.get('/',function(req,res) {
        res.sendFile(fileSystem.resolve('index.html'));
    });

};
