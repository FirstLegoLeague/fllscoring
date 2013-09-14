define([
    'jquery'
],function($) {
    var _log = [];

    var log = function log() {
        var str = $.makeArray(arguments).map(function(arg) {
            var str;
            try {
                str = JSON.stringify(arg);
            } catch(e) {
                str = ''+arg;
            }
            return str;
        }).join(' ');
        _log.push(str);
        console.log(str);
    };

    log.get = function() {
        return _log;
    };

    return log;
});
