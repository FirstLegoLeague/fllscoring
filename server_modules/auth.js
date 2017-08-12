var passport = require('passport');
var Strategy = require('passport-http').DigestStrategy;

passport.use(new Strategy({ qop: 'auth' },
    function(username, cb) {
        db.users.findByUsername(username, function(err, user) {
        if (err) { return cb(err); }
        if (!user) { return cb(null, false); }
        return cb(null, user, user.password);
    })
}));

exports.middleware = function(req, res, next) {
    if(req.user || req.path.endsWith('/login')) {
        next();
    } else {
        res.redirect('/login');
    }
};
