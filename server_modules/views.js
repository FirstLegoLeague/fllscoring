var fileSystem = require('./file_system');
	
exports.route = function(app) {
	
	app.get('/',function(req,res) {
		req.session.user = 'user';
		console.log(Object.keys(req.session));
	    res.sendFile(fileSystem.resolve('/src/index.html'));
	});

	app.get('/admin',function(req,res) {
	    req.session.user = 'admin';
	    console.log(Object.keys(req.session));
	    res.sendFile(fileSystem.resolve('/src/index.html'));
	});
	
};