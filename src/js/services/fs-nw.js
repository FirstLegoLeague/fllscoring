define('services/fs-nw',['q','idbstore'],function(Q,IDBStore) {
    function createStore() {
        var def = Q.defer();
        var store = new IDBStore({
            storeName: 'fllscoring',
            keyPath: null,
            dbVersion: 2,
            onStoreReady: function() {
                def.resolve(store);
            },
            onError: function(err) {
                def.reject(err);
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

    return {
        read: read,
        write: write,
        remove: remove
    };
});
