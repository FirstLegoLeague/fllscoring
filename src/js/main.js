define([
    'jquery',
    'services/fs'
],function($,fs) {

    var logEl = $('<pre></pre>').appendTo(document.body);

    function log() {
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
    }
    log('device ready');

    //write, read, delete tests

    function writeFile() {
        return fs.write('bar.txt','bar').then(function(data) {
            log('success writing',data);
        }).fail(function(data) {
            log('error writing',data);
        });
    }

    function readFile() {
        return fs.read('bar.txt').then(function(data) {
            log('success reading',data);
        }).fail(function(data) {
            log('error reading',data);
        });
    }

    function removeFile() {
        return fs.remove('bar.txt').then(function(data) {
            log('success removing',data);
        }).fail(function(data) {
            log('error removing',data);
        });
    }


    writeFile().then(function() {
        return readFile();
    }).then(function() {
        return removeFile();
    }).done();
});
