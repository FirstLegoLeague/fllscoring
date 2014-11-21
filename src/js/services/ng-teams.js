/**
 * Team storage.
 */
define('services/ng-teams',[
    'services/ng-services',
    'services/log',
    'services/ng-fs'
],function(module,log) {
    "use strict";

    return module.service('$teams', ["$fs", function($fs) {
        function Teams() {
            /**
             * Array of all teams.
             * The reference will remain valid, so
             * adding/removing teams will automatically be
             * reflected in this instance.
             */
            this.teams = [];

            this._rawTeams = []; // teams as created by the user and persisted to storage, no auto-generated properties
            this._teamsMap = Object.create(null); // id => team

            this._initialized = null; // Promise<void>
            this.init();
        }

        /**
         * Initialize service, if not initialized already.
         * @returns Promise<void> that is resolved when init is complete.
         */
        Teams.prototype.init = function() {
            if (!this._initialized) {
                this._initialized = this.load();
            }
            return this._initialized;
        };

        Teams.prototype.clear = function() {
            this._rawTeams = [];
            this._update();
        };

        Teams.prototype.save = function() {
            return $fs.write('teams.json', this._rawTeams).then(function() {
                log('teams saved');
            }, function(err) {
                log('teams write error', err);
            });
        };

        Teams.prototype.load = function() {
            var self = this;
            this.clear();
            return $fs.read('teams.json').then(function(res) {
                res.forEach(function(t) {
                    self.add(t);
                });
            }, function(err) {
                log('teams read error', err);
            });
        };

        Teams.prototype.remove = function(id) {
            var team = this._teamsMap[id];
            if (!team) {
                return;
            }
            this._rawTeams.splice(team.index, 1);
            this._update();
        };

        /**
         * Add new team.
         * @param team Example: { number: 123, name: "Super team", ... }
         */
        Teams.prototype.add = function(team) {
            // Create a copy of the object, to prevent user from messing it up later,
            // and to aid in in-code documentation.
            var t = {
                number: parseInt(team.number, 10),
                name: String(team.name),
                affiliation: String(team.affiliation || ""),
                cityState: String(team.cityState || ""),
                country: String(team.country || ""),
                coach1: String(team.coach1 || ""),
                coach2: String(team.coach2 || ""),
                judgingGroup: String(team.judgingGroup || ""),
                pitLocation: String(team.pitLocation || ""),
                translationNeeded: team.translationNeeded ? true : false
            };
            if (t.number in this._teamsMap) {
                throw new Error("duplicate team number " + t.number);
            }
            this._rawTeams.push(t);
            this._update();
        };

        /**
         * Return team by number (id).
         * Note: returned reference is not guaranteed to
         * persist, changes to the teams will cause this
         * object to become stale.
         * @param number {number} Team number.
         */
        Teams.prototype.get = function(number) {
            return this._teamsMap[number];
        };

        Teams.prototype._update = function() {
            var self = this;
            this._teamsMap = Object.create(null);
            this.teams.splice(0, this.teams.length); // clear without creating new object
            this._rawTeams.forEach(function(team, index) {
                if (team.number in self._teamsMap) {
                    // shouldn't ever happen, unless one fiddles with
                    // the raw storage
                    throw new Error("duplicate team number " + team.number);
                }

                // Create a copy using only the properties we expect
                var t = {
                    index: index,
                    number: team.number,
                    name: team.name,
                    affiliation: team.affiliation,
                    cityState: team.cityState,
                    country: team.country,
                    coach1: team.coach1,
                    coach2: team.coach2,
                    judgingGroup: team.judgingGroup,
                    pitLocation: team.pitLocation,
                    translationNeeded: team.translationNeeded
                };
                self.teams.push(t);
                self._teamsMap[t.number] = t;
            });
        };

        return new Teams();
    }]);
});
