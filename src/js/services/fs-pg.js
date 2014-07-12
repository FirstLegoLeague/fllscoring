define('services/fs-pg',['q','services/log'],function(Q,log) {
    var baseurl = 'fllscoring/';

    function getFS() {
        var def = Q.defer();
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, def.resolve, def.reject);
        return def.promise;
    }

    /*
        recursively gets or creates a directory path
        path: 'foo/bar/baz';
        options: {create: true, exclusive: false}|{}
    */
    function getPath(path,options) {
        var parts = path.split('/');

        function getDir(root,name) {
            var def = Q.defer();
            root.getDirectory(name,options,def.resolve,def.reject);
            return def.promise;
        }

        function getSequence(root,parts) {
            var name = parts.shift();
            return getDir(root,name).then(function(dir) {
                if (parts.length) {
                    //create deeper path
                    return getSequence(dir,parts);
                }
                return dir;
            }).fail(function() {
                log('fail getting directory '+name);
            });
        }

        return getFS().then(function(fs) {
            return getSequence(fs.root,parts);
        }).fail(function() {
            log('fail getting file system ');
        });
    }

    /*
        gets a (deep) file entry
        path: 'foo/bar/baz/moo.txt';
        option: {create: true, exclusive: false}|{}
    */
    function getFileEntry(path,options) {
        var parts = path.split('/');
        var fileName = parts.pop();
        var dirName = parts.join('/');

        return getPath(dirName,options).then(function(dir) {
            var def = Q.defer();
            dir.getFile(fileName,options||null,def.resolve,def.reject);
            return def.promise;
        }).fail(function() {
            log('fail getting path '+dirName);
        });
    }

    function getFile(path) {
        return getFileEntry(path).then(function(fileEntry) {
            var def = Q.defer();
            fileEntry.file(def.resolve,def.reject);
            return def.promise;
        });
    }

    function getWriter(path) {
        return getFileEntry(path,{create: true, exclusive: false}).then(function(fileEntry) {
            var def = Q.defer();
            fileEntry.createWriter(def.resolve,def.reject);
            return def.promise;
        }).fail(function() {
            log('fail getting writer '+path);
        });
    }

    function read(path) {
        var url = baseurl+path;

        return getFile(url).then(function(file) {
            var def = Q.defer();
            var reader = new FileReader();
            reader.onloadend = function(evt) {
                def.resolve(evt.target.result);
            };
            reader.readAsText(file);
            return def.promise;
        });
    }

    function write(path,data) {
        var url = baseurl+path;

        return getWriter(url).then(function(writer) {
            var def = Q.defer();
            writer.onwriteend = function(evt) {
                def.resolve();
            };
            writer.write(data);
            return def.promise;
        });
    }

    function remove(path) {
        var url = baseurl+path;

        return getFileEntry(url).then(function(fileEntry) {
            var def = Q.defer();
            fileEntry.remove();
        });
    }

    return {
        read: read,
        write: write,
        remove: remove
    };
});
