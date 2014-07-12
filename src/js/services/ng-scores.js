/**
 * service handling all access to scores
 */
define([
    'services/ng-services',
    'services/log',
    'services/ng-fs'
],function(module,log) {
    return module.factory('$scores',['$fs',function($fs) {
        var scores = [];

        function save() {
            return $fs.write('scores.json',scores).then(function() {
                log('scores saved');
            },function() {
                log('scores write error');
            });
        }
        function load() {
            return $fs.read('scores.json').then(function(res) {
                //remove everything
                res.unshift(scores.length);
                res.unshift(0);
                scores.splice.apply(scores,res);
            },function() {
                //error
                log('scores read error');
            });
        }
        function remove(index) {
            var rem = scores.splice(index,1);
            return $fs.remove(rem[0].file).then(function() {
                return save();
            },function() {
                log('error removing score');
            });
        }
        function add(data) {
            scores.push(data);
            return save();
        }

        load();

        return {
            scores: scores,
            load: load,
            save: save,
            remove: remove,
            add: add
        };
    }]);
});
