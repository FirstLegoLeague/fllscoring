var args = require('./args');

var session = require('express-session');
var MemoryStore = session.MemoryStore;

var config = {
	store: new MemoryStore, 
	secret: 'some-kind-of-secret-g492p8j2498gnqe9n92-8fj-938f',
	resave: true,
	saveUninitialized: true
};

exports.middleware = session(config); 

exports.route = function(app) {

	app.get('/session', function(req, res) {
		res.json(req.session);
	})

};