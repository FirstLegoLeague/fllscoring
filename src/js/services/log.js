define([
    'jquery'
],function($) {
    var logEl = $('<pre></pre>').appendTo(document.body);

    return function log() {
        // window.console.log.apply(window.console.log,arguments);
        var str = $.makeArray(arguments).map(function(arg) {
            var str;
            try {
                str = JSON.stringify(arg);
            } catch(e) {
                str = ''+arg;
            }
            return str;
        }).join(' ');
        logEl.append(str+'\n');
        console.log(str);
    };
});
