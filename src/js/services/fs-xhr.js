define(['q','jquery'],function(Q,$) {
    var baseurl = '/fs/';

    function get() {
        return $.get.apply($.get,arguments);
    }
    function post() {
        return $.post.apply($.post,arguments);
    }

    function read(path) {
        var def = Q.defer();
        var url = baseurl+path;
        this._get(url).done(function(data) {
            def.resolve(data);
        }).fail(function(data) {
            def.reject(data);
        });

        return def.promise;
    }

    function write(path,data) {
        var def = Q.defer();
        var url = baseurl+path;
        this._get(url,data).done(function(data) {
            def.resolve(data);
        }).fail(function(data) {
            def.reject(data);
        });
        return def.promise;
    }

    return {
        _get: get,
        _post: post,
        read: read,
        write: write
    };
});
