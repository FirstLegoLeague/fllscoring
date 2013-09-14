define([
    'services/log',
    'services/fs'
],function(log,fs) {

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
