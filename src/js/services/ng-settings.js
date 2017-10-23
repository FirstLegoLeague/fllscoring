/**
 * Settings storage.
 */
define('services/ng-settings',[
    'services/ng-services',
    'services/log'
],function(module,log) {
    "use strict";

    return module.service('$settings', ["$http", function($http) {
        function Settings() {
            /**
             * Array of all settings.
             * The reference will remain valid, so
             * adding/removing settings will automatically be
             * reflected in this instance.
             */
            this.settings = {};
            this.init();
        }


        /**
         * Initialize service, if not initialized already.
         * @returns Promise<void> that is resolved when init is complete.
         */
        Settings.prototype.init = function() {
            if (!this._initialized) {
                this._initialized = this.load();
            }
            return this._initialized;
        };

        Settings.prototype.load = function() {
            var self = this;
            // this.clear();
            return $http.get('/settings').then(function(res) {
                self.settings = res.data;
                return self.settings;
            }).catch(function(err) {
                var defaults = {
                    tables: [{name: 'Table 1'}],
                    referees: [{name: 'Head referee'}],
                    askTable: true,
                    askReferee: true,
                    mhub: `ws://${window.location.hostname}:13900`,
                    node: 'default',
                    challenge: '2017_en_US-official',
                    host: window.location.origin + '/',
                    autoPublish: true,
                    autoBroadcast: true,
                    currentStage: 'practice',
                    ignoreNegativeScores: true
                };
                //create settings file if not there
                log('settings read error, trying to create file', err);
                var data = { settings: defaults };
                return $http.post("/settings/save", data).then(function (data, status) {
                    log('Data posted successfully');
                },function () {
                    log('failed retrieving settings');
                });
            }).catch(function(err) {
                //return ephemeral settings
                log('unable to create settings file, giving up', err);
                self.settings = {};
                return self.settings;
            });
        };

        

        Settings.prototype.save = function() {
            return $http.post('/settings/save',{settings: this.settings});
        };

        return new Settings();
    }]);
});
