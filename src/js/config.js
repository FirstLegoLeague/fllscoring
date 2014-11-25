//store require if it exists, to be able to catch nodejs' require
var nodeRequire = require;
//requirejs base config
var require = {
    baseUrl: 'js/',
    paths: {
        'q': '../components/q/q',
        'jquery': '../components/jquery/jquery.min',
        'angular': '../components/angular/angular.min',
        'angular-sanitize': '../components/angular-sanitize/angular-sanitize.min',
        'angular-touch': '../components/angular-touch/angular-touch.min',
        'angular-bootstrap': '../components/angular-bootstrap/ui-bootstrap-tpls',
        'idbstore':'../components/idbwrapper/idbstore',
        'signaturepad':'../components/signature-pad/jquery.signaturepad.min'
    },
    shim: {
        'signaturepad': {
            deps: ['jquery']
        },
        'angular': {
            deps: ['jquery']
        },
        'angular-bootstrap': {
            deps: ['angular']
        },
        'angular-touch': {
            deps: ['angular']
        },
        'angular-sanitize': {
            deps: ['angular']
        }
    }
};
