/**
 * handshake service
 *
 * $emit method starts the handshake, returns a promise to be
 * resolved when the handshake is done
 *
 * $on method listens to a handshake, return a value or a new promise to
 * resolve the handshake
 *
 *
 */
define('services/ng-handshake',[
    'services/ng-services'
],function(module) {
    return module.factory('$handshake',[
        '$rootScope','$q',
        function($rootScope,$q) {
            return {
                $emit: function() {
                    var def = $q.defer();
                    var args = $.makeArray(arguments);
                    args.splice(1,0,def);
                    args[0] = 'handShake.'+args[0];
                    $rootScope.$emit.apply($rootScope,args);
                    return def.promise;
                },
                $on: function(name,cb) {
                    return $rootScope.$on('handShake.'+name,function(e) {
                        var args = $.makeArray(arguments);
                        var def = args.splice(1,1)[0];
                        var res = cb.apply(null,args);
                        $q.when(res).then(def.resolve,def.reject);
                        return res;
                    });
                },
                defer: function() {
                    return $q.defer();
                }
            };
        }
    ]);
});
