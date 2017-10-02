var configFile = require('./args').configFile;
var users = require(configFile).users;

if(users) {
    var passport = require('passport');
    var Strategy = require('passport-local').Strategy;

    var fileSystem = require('./file_system');
    var utils = require('./utils');

    passport.use(new Strategy(function(username, password, done) {
        process.nextTick(function() {
            var user = users.filter(user => user.username === username)[0];
            if(!user)   return done(`No such username: ${username}`);
            if(user.password !== password)   return done(`Incorrect password: ${password}`);
            return done(null, user);
        });
    }));

    passport.serializeUser(function(user, done) {
        var serializedUser = {};
        for(var key in user) {
            if(key !== 'password') {
                serializedUser[key] = user[key];
            }
        }
        done(null, serializedUser);
    });

    passport.deserializeUser(function(user, done) {
        var deserializedUser = users.filter(u => user.username === u.username)[0]
        done(null, deserializedUser);
    });

    exports.initialize = function() {
        return passport.initialize();
    };
    exports.session = function() {
        return passport.session();
    };

    exports.middleware = function(req, res, next) {
        if(req.user || req.path.endsWith('/login')) {
            next();
        } else {
            res.redirect('/login');
        }
    };

    exports.route = function(app) {

        app.get('/login', function(req,res) {
            res.sendFile(fileSystem.resolve('login.html'));
        });

        app.post('/login', passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));

    };

    /**
    * This function returns a middleware that throws a "403 Not Authorized" when a user doesn't fit the condition
    * If the condition is a string, the user must have that username
    * If the confition is an array, the user's username must be included in that array
    * If the condition is a function, the user must return true for that function.
    * It is meant to come in the beginning of a route function, so that it'll stop the execution of the function
    * Doesn't call next if the user in not authorized.
    */
    exports.authorize = function(userCondition) {
        var condition = () => true;

        switch(userCondition.constructor) {
            case String:
            condition = (user) => user.username === userCondition;
            break;

            case Array:
            condition = (user) => userCondition.includes(user.username);
            break;

            case Function:
            condition = userCondition;
            break;
        }

        return function(req, res, next) {
            var user = req.user;

            if(condition(user, req, res)) {
                next();
            } else {
                utils.sendError(res, { status: 403, message: 'Not Authorized' });
            }
        }
    }
} else {
    let doNothing = (req, res, next) => next();

    exports.middleware = doNothing;
    exports.initialize = () => doNothing;
    exports.session = () => doNothing;
    exports.authorize = () => doNothing;

    exports.route = () => {};
}

/**
* A sample usage in which any user is authorized
*/
exports.authorize.any = exports.authorize(user => !!user);

