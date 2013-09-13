define(['q'],function(Q) {
    var baseurl = process.cwd()+'/';

    var fs = nodeRequire('fs');
    var path = nodeRequire('path');

    //copied from mkdirp for ease of including. It is only needed here
    function mkdirP (p, mode, f, made) {
        if (typeof mode === 'function' || mode === undefined) {
            f = mode;
            mode = 0777 & (~process.umask());
        }
        if (!made) made = null;

        var cb = f || function() {};
        if (typeof mode === 'string') mode = parseInt(mode, 8);
        p = path.resolve(p);

        fs.mkdir(p, mode, function(er) {
            if (!er) {
                made = made || p;
                return cb(null, made);
            }
            switch (er.code) {
                case 'ENOENT':
                    mkdirP(path.dirname(p), mode, function(er, made) {
                        if (er) cb(er, made);
                        else mkdirP(p, mode, cb, made);
                    });
                    break;

                    // In the case of any other error, just see if there's a dir
                    // there already.  If so, then hooray!  If not, then something
                    // is borked.
                default:
                    fs.stat(p, function(er2, stat) {
                        // if the stat fails, then that's super weird.
                        // let the original error be the failure reason.
                        if (er2 || !stat.isDirectory()) cb(er, made);
                        else cb(null, made);
                    });
                    break;
            }
        });
    }

    function read(path) {
        var def = Q.defer();
        var url = baseurl+path;
        fs.readFile(url,'utf8',function(err,data) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(data);
            }
        });

        return def.promise;
    }

    function deepWrite(location,contents,cb) {
        var dir = path.dirname(location);
        mkdirP(dir, function(err) {
            if (err) return cb(err);
            fs.writeFile(location, contents, cb);
        });
    }

    function write(path,data) {
        var def = Q.defer();
        var url = baseurl+path;
        deepWrite(url,data,function(err,data) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(data);
            }
        });

        return def.promise;
    }

    function remove(path) {
        var def = Q.defer();
        var url = baseurl+path;
        fs.unlink(url,function(err,data) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(data);
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
