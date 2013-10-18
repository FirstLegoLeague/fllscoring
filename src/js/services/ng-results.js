/**
 * service handling all access to results
 */
define([
    'services/ng-services',
    'services/log',
    'services/ng-fs'
],function(module,log) {
    module.factory('$results',['$fs',function($fs) {
        var results = [];

        var save = function() {
            return $fs.write('results.json',results).then(function() {
                log('results saved');
            },function() {
                log('results write error');
            });
        };
        var load = function() {
            return $fs.read('results.json').then(function(res) {
                //remove everything
                res.unshift(results.length);
                res.unshift(0);
                results.splice.apply(results,res);
            },function() {
                //error
                log('results read error');
            });
        };

        load();

        return {
            data: results,
            load: load,
            save: save
        };
    }]);
});
