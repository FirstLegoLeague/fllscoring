define(['squire','q'],function(Squire,Q) {
    var r = Squire.prototype.require;

    Squire.prototype.require = function(deps,cb,eb) {
        var def = Q.defer();
        r.call(this,deps,function() {
            var res = cb.apply(this,arguments);
            def.resolve(res);
        },function() {
            var res = eb.apply(this,arguments);
            def.resolve(res);
        });
        return def.promise;
    };

    return Squire;
});
