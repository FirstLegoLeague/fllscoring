define([
    'services/log',
    'tests/fsTest'
],function(log,fsTest) {

    log('device ready');

    fsTest();
});
