define(['q'],function(Q) {
    var baseurl = '';

    function getFS(cb) {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
            cb(null,fs);
        },cb);
    }

    function getFileEntry(path,options,cb) {
        getFS(function(err,fs) {
            if (err) { return cb({fs:err});}
            fs.root.getFile(path,options||null,function(fileEntry) {
                cb(null,fileEntry);
            },cb);
        });
    }

    function getFile(path,cb) {
        getFileEntry(path,null,function(err,fileEntry) {
            if (err) { return cb({fileentry:err});}
            fileEntry.file(function(file) {
                cb(null,file);
            },cb);
        });
    }

    function getWriter(path,cb) {
        getFileEntry(path,{create: true, exclusive: false},function(err,fileEntry) {
            if (err) { return cb({fileentry:err});}
            fileEntry.createWriter(function(writer) {
                cb(null,writer);
            },cb);
        });
    }

    function read(path) {
        var def = Q.defer();
        var url = baseurl+path;
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            def.resolve(evt.target.result);
        };
        getFile(path,function(err,file) {
            if (err) {
                def.reject({file:err});
            } else {
                reader.readAsText(file);
            }
        });

        return def.promise;
    }

    function write(path,data) {
        var def = Q.defer();
        var url = baseurl+path;
        getWriter(path,function(err,writer) {
            if (err) {
                def.reject(err);
            } else {
                writer.onwriteend = function(evt) {
                    def.resolve();
                };
                writer.write(data);
            }
        });

        return def.promise;
    }

    function remove(path) {
        var def = Q.defer();
        var url = baseurl+path;
        getFileEntry(path,null,function(err,fileEntry) {
            if (err) {
                def.reject(err);
            } else {
                fileEntry.remove();
                def.resolve();
            }
        });

        return def.promise;
    }

    return {
        read: read,
        write: write,
        remove: remove
    };
});
