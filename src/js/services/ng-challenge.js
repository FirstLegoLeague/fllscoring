define('services/ng-challenge',[
    'services/ng-services'
],function(module) {
    return module.factory('$challenge',['$fs',function($fs) {
        return {
            getDependencies: function(fn) {
                var deps = fn.toString().match(/^function\s*\((.*?)\)/)[1];
                return deps?deps.split(/\s*,\s*/):[];
            }
        };
    }]);
});
