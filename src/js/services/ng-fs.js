/**
 * wraps the fs service in an angular service
 * data is automatically applied to the rootscope,
 * data is marshalled and unmarshalled to json
 */
define([
    'services/fs',
    'services/ng-services'
],function(fs,module) {
    return module.factory('$fs',['$q','$rootScope',function($q,$rootScope) {

        function wrap(name) {
            return function() {
                var def = $q.defer();
                fs[name].apply(fs,arguments).then(function(res) {
                    def.resolve(res);
                    $rootScope.$apply();
                },function(err) {
                    def.reject(err);
                    $rootScope.$apply();
                });
                return def.promise;
            };
        }

        return {
            read: function(file) {
                return wrap('read')(file).then(function(res) {
                    return JSON.parse(res);
                });
            },
            write: function(file,data) {
                return wrap('write')(file,angular.toJson(data));
            },
            remove: wrap('remove')
        };
    }]);
});
