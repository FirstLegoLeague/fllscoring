//store require if it exists, to be able to catch nodejs' require
var nodeRequire = require;
//requirejs base config
var require = {
    baseUrl: 'js/',
    paths: {
        'q': '../components/q/q',
        'jquery': '../components/jquery/jquery.min',
        'angular': '../components/angular/angular.min'
    }
};
