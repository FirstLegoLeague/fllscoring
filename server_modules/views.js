var fileSystem = require('./file_system');

exports.route = function(app) {

    app.get('/',function(req,res) {
        req.session.user = 'user';
        res.sendFile(fileSystem.resolve('/index.html'));
    });

    app.get('/admin',function(req,res) {
        req.session.user = 'admin';
        res.sendFile(fileSystem.resolve('/index.html'));
    });

};
