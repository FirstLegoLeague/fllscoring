var config = {
	secret: 'some-kind-of-secret-g492p8j2498gnqe9n92-8fj-938f',
	resave: false,
	saveUninitialized: true
};
var session = require('express-session');

exports.middleware = session(config); 