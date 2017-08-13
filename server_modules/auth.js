var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var users = require('../encloseConfig').users;
var fileSystem = require('./file_system');

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

    app.get('/login',function(req,res) {
        res.sendFile(fileSystem.resolve('login.html'));
    });

    app.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

}

