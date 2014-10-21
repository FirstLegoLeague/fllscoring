/**
 * Tournament stages (e.g. qualifying rounds, semi finals, final, etc.).
 */
define('services/ng-stages',[
    'services/ng-services',
    'services/log',
    'services/ng-fs'
],function(module,log) {
    "use strict";

    return module.service('$stages', ["$q", "$fs", function($q, $fs) {
        function Stages() {
            /**
             * Array of all stages, including stages that
             * have no rounds (and are thus 'unused').
             * The reference will remain valid, so
             * adding/removing stages will automatically be
             * reflected in this instance.
             */
            this.allStages = [];

            /**
             * Array of all stages that have at least
             * one round.
             * The reference will remain valid, so
             * adding/removing stages will automatically be
             * reflected in this instance.
             */
            this.stages = [];

            this._rawStages = []; // stages as created by the user and persisted to storage, no auto-generated properties
            this._stagesMap = Object.create(null); // id => stage

            this._initialized = null; // Promise<void>
            this.init();
        }

        /**
         * Initialize service, if not initialized already.
         * @returns Promise<void> that is resolved when init is complete.
         */
        Stages.prototype.init = function() {
            if (!this._initialized) {
                this._initialized = this.load();
            }
            return this._initialized;
        }

        Stages.prototype.clear = function() {
            this._rawStages = [];
            this._update();
        }

        Stages.prototype.save = function() {
            return $fs.write('stages.json', this._rawStages).then(function() {
                log('stages saved');
            }, function(err) {
                log('stages write error', err);
            });
        }

        Stages.prototype.load = function() {
            var self = this;
            this.clear();
            return $fs.read('stages.json').then(function(res) {
                res.forEach(self.add.bind(self));
            }, function(err) {
                log('stages read error', err);
                log('stages using defaults');
                self.add({ id: "practice", name: "Oefenrondes", rounds: 2 });
                self.add({ id: "qualifying", name: "Voorrondes", rounds: 3 });
                self.add({ id: "quarter", name: "Kwart finales", rounds: 0 });
                self.add({ id: "semi", name: "Halve finales", rounds: 0 });
                self.add({ id: "final", name: "Finale", rounds: 1 });
            }).finally(function() {
                self._update();
            });
        }

        Stages.prototype.remove = function(id) {
            var index = this._stagesMap[id];
            if (!index) {
                return;
            }
            this._rawStages.splice(index, 1);
            this._update();
        }

        /**
         * Add new stage.
         * Note: setting rounds to 0 means the stage isn't in use and will
         * automatically be excluded from most views.
         * @param stage Example: { id: "qualifying", name: "Voorrondes", rounds: 2 }
         */
        Stages.prototype.add = function(stage) {
            if (stage.id in this._stagesMap) {
                throw new Error("duplicate stage id " + stage.id);
            }
            // Push a copy of the object, to prevent user from messing it up later,
            // and to aid in in-code documentation
            this._rawStages.push({
                id: String(stage.id),
                name: String(stage.name),
                rounds: parseInt(stage.rounds, 10),
            });
            this._update();
        }

        /**
         * Return stage by id.
         * Note: returned reference is not guaranteed to
         * persist, changes to the stages will lead to
         * cause this object to become stale.
         * @param id {string} Stage ID.
         */
        Stages.prototype.get = function(id) {
            return this.stageMap[id];
        }

        Stages.prototype._update = function() {
            var self = this;
            this._stagesMap = Object.create(null);
            this.allStages.splice(0, this.allStages.length); // clear without creating new object
            this.stages.splice(0, this.stages.length); // clear without creating new object
            this._rawStages.forEach(function(s, index) {
                if (s.id in self._stagesMap) {
                    // shouldn't ever happen, unless one fiddles with
                    // the raw storage
                    throw new Error("duplicate stage id " + s.id);
                }
                // $rounds is a convenience property, to use for e.g. iterating in views
                var $rounds = new Array(s.rounds);
                for (var i = 0; i < $rounds.length; i++) {
                    $rounds[i] = i + 1;
                }

                var stage = {
                    id: s.id,
                    name: s.name,
                    rounds: s.rounds,
                    $rounds: $rounds
                };
                self.allStages.push(stage);
                if (stage.rounds > 0) {
                    self.stages.push(stage);
                }
                self._stagesMap[stage.id] = stage;
            });
        }

        return new Stages();
    }]);
});
