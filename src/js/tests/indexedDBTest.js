define([
    'services/log',
    'idbstore',
    'q',
], function(log, IDBStore, Q) {

    function createStore() {
        var def = Q.defer();
        var store = new IDBStore({
            storeName: 'fllscoring',
            keyPath: null,
            dbVersion: 2,
            onStoreReady: function() {
                def.resolve(store);
            },
            onError: function() {
                def.reject();
            }
        });
        return def.promise;
    }


    var write = function(key, value) {
        return createStore().then(function(store) {
            var def = Q.defer();
            store.put(key, value, def.resolve, def.reject);
            return def.promise;
        });
    };

    var read = function(key) {
        return createStore().then(function(store) {
            var def = Q.defer();
            store.get(key, def.resolve, def.reject);
            return def.promise;
        });
    };

    var remove = function(key) {
        return createStore().then(function(store) {
            var def = Q.defer();
            store.remove(key, def.resolve, def.reject);
            return def.promise;
        });
    };

    function run() {
        write('123','bar').then(function() {
            log('success write', arguments);
            return read('123');
        }).then(function(data) {
            log('success read',data);
            return remove('123');
        }).then(function() {
            log('success remove',arguments);
        }).fail(function() {
            log('error write',arguments);
        }).done();
    }

    return run;
});
