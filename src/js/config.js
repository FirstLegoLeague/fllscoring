//store require if it exists, to be able to catch nodejs' require
var nodeRequire = require;
//requirejs base config
var require = {
    baseUrl: 'js/',
    paths: {
        'q': '../components/q/q',
        'jquery': '../components/jquery/jquery.min',
        'angular': '../components/angular/angular.min',
        'idbstore':'../components/idbwrapper/idbstore',
        'signaturepad':'../components/signature-pad/jquery.signaturepad.min',
        'fastclick':'../components/fastclick/lib/fastclick'
    },
    shim: {
        'signaturepad': {
            deps: ['jquery']
        },
        'angular': {
            deps: ['jquery']
        }
    }
};
