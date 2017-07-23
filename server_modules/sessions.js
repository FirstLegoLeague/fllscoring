var args = require('./args');

var session = require('express-session');
var MemoryStore = session.MemoryStore;

var config = {
	store: new MemoryStore, 
	secret: 'secret-' + require('uuid/v4')(),
	resave: true,
	saveUninitialized: true
};

exports.middleware = session(config); 

exports.route = function(app) {

	app.get('/session', function(req, res) {
		res.json(req.session);
	})

};