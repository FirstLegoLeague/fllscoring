var utils = require('./utils');
var fileSystem = require('./file_system');

exports.route = function(app) {
	
	//get challenges over xhr, for hosted service
	app.get('/challenge/:year', function(req, res) {
	    var file = '/challenges/js/{0}.js'.format(req.params.year);

	    fileSystem.readFile(file).then(function(data) {
	        res.header('Content-Type','text/plain');
	        res.send(data);
	    }).catch(utils.sendError(res)).done();
	});

};