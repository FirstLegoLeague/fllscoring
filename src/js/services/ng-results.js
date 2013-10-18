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

        function save() {
            return $fs.write('results.json',results).then(function() {
                log('results saved');
            },function() {
                log('results write error');
            });
        }
        function load() {
            return $fs.read('results.json').then(function(res) {
                //remove everything
                res.unshift(results.length);
                res.unshift(0);
                results.splice.apply(results,res);
            },function() {
                //error
                log('results read error');
            });
        }
        function remove(index) {
            var rem = results.splice(index,1);
            return $fs.remove(rem[0].file).then(function() {
                return save();
            },function() {
                log('error removing result');
            });
        }
        function add(data) {
            results.push(data);
            return save();
        }

        load();

        return {
            data: results,
            load: load,
            save: save,
            remove: remove,
            add: add
        };
    }]);
});
