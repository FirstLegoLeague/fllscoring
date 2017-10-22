/**
 * Tournament stages (e.g. qualifying rounds, semi finals, final, etc.).
 */
define('services/ng-stages',[
    'services/ng-services',
    'services/log',
    'services/ng-fs'
],function(module,log) {
    "use strict";

    return module.service('$stages', ["$q", "$http", function($q, $http) {
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
        };

        Stages.prototype.clear = function() {
            this._rawStages = [];
            this._update();
        };

        Stages.prototype.save = function () {
            return $http.post("/stages/save", { stages: this.stages }).success(function (data, status) {
                log('Data posted successfully');
            }).error(function () {
                log('failed retrieving settings');
            });
        };

        Stages.prototype.load = function() {
            var self = this;
            this.clear();
            return $http.get("/stages").then(function(res) {
                res.data.forEach(function(s) {
                    self.add(s);
                });
            }, function(err) {
                log('stages read error', err);
                log('stages using defaults');
                self.add({ id: "practice", name: "Practice Rounds", rounds: 1 });
                self.add({ id: "qualifying", name: "Qualification Rounds", rounds: 3 });
                self.add({ id: "quarter", name: "Quarterfinals", rounds: 0 });
                self.add({ id: "semi", name: "Semifinals", rounds: 0 });
                self.add({ id: "final", name: "Final", rounds: 0 });
            });
        };

        Stages.prototype.remove = function(id) {
            var stage = this._stagesMap[id];
            if (!stage) {
                return;
            }
            this._rawStages.splice(stage.index, 1);
            this._update();
        };

        /**
         * Add new stage.
         * Note: setting rounds to 0 means the stage isn't in use and will
         * automatically be excluded from most views.
         * @param stage Example: { id: "qualifying", name: "Voorrondes", rounds: 2 }
         */
        Stages.prototype.add = function(stage) {
            if (typeof stage !== "object") {
                throw new Error("cannot add stage: object expected");
            }
            if (typeof stage.id !== "string") {
                throw new Error("cannot add stage: invalid or missing id");
            }
            if (typeof stage.name !== "string") {
                throw new Error("cannot add stage: invalid or missing name");
            }
            if (typeof stage.rounds !== "number") {
                throw new Error("cannot add stage: invalid or missing rounds");
            }
            if (stage.id in this._stagesMap) {
                throw new Error("cannot add stage: duplicate stage id " + stage.id);
            }
            // Push a copy of the object, to prevent user from messing it up later,
            // and to aid in in-code documentation
            this._rawStages.push({
                id: String(stage.id),
                name: String(stage.name),
                rounds: parseInt(stage.rounds, 10),
            });
            this._update();
        };

        /**
         * move stage by a specified amount of steps
         * clipping to top or bottom of the list
         */
        Stages.prototype.moveStage = function(stage,steps) {
            var oldIndex = stage.index;
            var rawStage = this._rawStages[oldIndex];
            // changes made in the stages (name or round number) were only changing
            // $scope.stages and so when moveStage is called, those changes are lost.
            // to fix this, we iterate over the properties of the stage we are about to move
            // and for each one, we set it to equal the matching value from the stage passed
            // as a parameter.
            //
            // the `stage` parameter contains any changes made to the stage (in the browser) before
            // being saved to a file.

            // this essentially updates the rawStage object.

            Object.keys(rawStage).forEach((key)=>{
                rawStage[key] = stage[key];
            });
            //remove from the list
            this._rawStages.splice(oldIndex,1);
            //calculate insert position
            var newIndex = Math.max(0,Math.min(this._rawStages.length,oldIndex + steps));
            this._rawStages.splice(newIndex,0,rawStage);
            this._update();
        };

        /**
         * Return stage by id.
         * Note: returned reference is not guaranteed to
         * persist, changes to the stages will lead to
         * cause this object to become stale.
         * @param id {string} Stage ID.
         */
        Stages.prototype.get = function(id) {
            return this._stagesMap[id];
        };

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
                    index: index,
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
        };

        return new Stages();
    }]);
});
