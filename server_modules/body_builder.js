exports.middleware = function(req, res, next) {
    var data = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) {
        console.log('data');
        data += chunk;
    });

    req.on('end', function() {
        console.log('end');
        req.body = data;
        next();
    });
};
