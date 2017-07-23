var express = require('express');
var app = express();
var utils = require('./server_modules/utils');
var fileSystem = require('./server_modules/file_system');
var args = require('./server_modules/args');
var views = require('./server_modules/views');

var configs = [require('./server_modules/slave_mode')];

var middlewareLayers = [express.static(fileSystem.resolve('/src')),
                        require('./server_modules/sessions').middleware,
                        require('./server_modules/auth').basic(args.basicAuthCreds),
                        require('./server_modules/cors').middleware,
                        require('./server_modules/cache').middleware,
                        require('./server_modules/body_builder').middleware,
                        require('./server_modules/log').middleware];

var routers = [views,
                fileSystem,
                require('./server_modules/sessions'),
                require('./server_modules/teams'),
                require('./server_modules/scores'),
                require('./server_modules/challenges')];


configs.forEach(function(config) {
    config.configure(app);
});

middlewareLayers.forEach(function(layer) {
    app.use(layer);
});

routers.forEach(function(router) {
    router.route(app);
});

app.listen(args.port, function() {
    console.log('Listening on port ', args.port);
    console.log('open browser to http://localhost:{0}/'.format(args.port));
});
