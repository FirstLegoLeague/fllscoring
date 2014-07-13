/**
 * Tournament stages (e.g. qualifying rounds, semi finals, final, etc.).
 */
define('services/ng-stages',[
    'services/ng-services',
    'services/log',
    'services/ng-fs'
],function(module,log) {
    return module.factory('$stages',['$fs',function($fs) {
        var stages = [];

        function clear() {
            stages.splice(0, stages.length);
        }
        function save() {
            return $fs.write('stages.json',stages).then(function() {
                log('stages saved');
            }, function(err) {
                log('stages write error', err);
            });
        }
        function load() {
            clear();
            return $fs.read('stages.json').then(function(res) {
                // Replace contents of array (without creating a new object, so any
                // existing references to it remain valid)
                res.unshift(stages.length);
                res.unshift(0);
                stages.splice.apply(stages,res);
            }, function(err) {
                log('stages read error', err);
                log('stages using defaults');
                stages.push({ id: "practice", name: "Oefenrondes", rounds: 2 });
                stages.push({ id: "qualifying", name: "Voorrondes", rounds: 3 });
                stages.push({ id: "quarter", name: "Kwart finales", rounds: 0 });
                stages.push({ id: "semi", name: "Halve finales", rounds: 0 });
                stages.push({ id: "final", name: "Finale", rounds: 1 });
            }).finally(function() {
                sanitize();
            });
        }
        function remove(index) {
            stages.splice(index, 1);
            return this.save();
        }
        /**
         * Add new stage.
         * @param stage Example: { id: "qualifying", name: "Voorrondes", rounds: 2 }
         */
        function add(data) {
            stages.push(data);
            sanitize();
            return this.save();
        }

        function sanitize() {
            // Workaround for lack of 'numbered' for loop in angular,
            // this adds a convenience property containing all round numbers.
            stages.map(function(stage) {
                stage._rounds = new Array(stage.rounds);
                for (var i = 0; i < stage.rounds; i++) {
                    stage._rounds[i] = i + 1;
                }
            });
        }

        load();

        return {
            stages: stages,
            clear: clear,
            load: load,
            save: save,
            remove: remove,
            add: add
        };
    }]);
});
