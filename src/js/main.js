define(['services/fs'],function(fs) {

    //write, read, delete tests

    function writeFile() {
        return fs.write('bar/bar.txt','bar').then(function(data) {
            console.log('success writing',data);
        }).fail(function(data) {
            console.log('error writing',data);
        });
    }

    function readFile() {
        return fs.read('bar/bar.txt').then(function(data) {
            console.log('success reading',data);
        }).fail(function(data) {
            console.log('error reading',data);
        });
    }

    function removeFile() {
        return fs.remove('bar/bar.txt').then(function(data) {
            console.log('success removing',data);
        }).fail(function(data) {
            console.log('error removing',data);
        });
    }


    writeFile().then(readFile()).then(removeFile());
});
