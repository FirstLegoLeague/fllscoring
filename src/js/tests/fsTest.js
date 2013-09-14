/*
    file system tests,
    tests reading, writing and deleting of files
*/
define([
    'services/log',
    'services/fs'
],function(log,fs) {
    function writeFile() {
        return fs.write('foo/bar.txt','file contents').then(function(data) {
            log('success writing',data);
        }).fail(function(data) {
            log('error writing',data);
        });
    }

    function readFile() {
        return fs.read('foo/bar.txt').then(function(data) {
            log('success reading',data);
        }).fail(function(data) {
            log('error reading',data);
        });
    }

    function removeFile() {
        return fs.remove('foo/bar.txt').then(function(data) {
            log('success removing',data);
        }).fail(function(data) {
            log('error removing',data);
        });
    }


    function run() {
        return writeFile().then(function() {
            return readFile();
        }).then(function() {
            return removeFile();
        });
    }

    return run;
});
