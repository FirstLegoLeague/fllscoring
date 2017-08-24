define('services/fs-xhr',['q','jquery'],function(Q,$) {
    var baseurl = 'fs/';

    function xhrget() {
        return $.get.apply($.get,arguments);
    }
    function xhrpost() {
        return $.post.apply($.post,arguments);
    }
    function xhrremove(url,settings) {
        settings = settings||{};
        settings.type = 'DELETE';
        return $.ajax(url,settings);
    }

    function read(path) {
        var def = Q.defer();
        var url = baseurl+path;
        this._get(url).done(function(data) {
            def.resolve(data);
        }).fail(function(data) {
            if(data.statusText === "error"){ //status text given when server is inaccessible
                alert("Server is inaccessible!")
            }
            console.log(data);
            def.reject(data);
        });

        return def.promise;
    }

    function write(path,data) {
        var def = Q.defer();
        var url = baseurl+path;
        this._post(url,data).done(function(data) {
            def.resolve(data);
        }).fail(function(data) {
            if(data.statusText === "error"){ //status text given when server is inaccessible
                alert("Server is inaccessible!")
            }
            def.reject(data);
        });
        return def.promise;
    }

    function remove(path) {
        var def = Q.defer();
        var url = baseurl+path;
        this._delete(url).done(function(data) {
            if(data.statusText === "error"){ //status text given when server is inaccessible
                alert("Server is inaccessible!")
            }
            def.resolve(data);
        }).fail(function(data) {
            def.reject(data);
        });
        return def.promise;
    }

    return {
        _get: xhrget,
        _post: xhrpost,
        _delete: xhrremove,
        read: read,
        write: write,
        remove: remove,
    };
});
