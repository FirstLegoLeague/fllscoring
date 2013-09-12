define(['q'],function(Q) {
    var baseurl = '/fs/';

    function getFs() {
        return nodeRequire('fs');
    }

    function read(path) {
        var def = Q.defer();
        var url = baseurl+path;
        this._fs().readFile(url,function(err,data) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(data);
            }
        });

        return def.promise;
    }

    function write(path,data) {
        var def = Q.defer();
        var url = baseurl+path;
        this._fs().writeFile(url,data,function(err,data) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(data);
            }
        });

        return def.promise;
    }

    return {
        _fs: getFs,
        read: read,
        write: write
    };
});
