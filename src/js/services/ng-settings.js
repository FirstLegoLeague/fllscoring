/**
 * Settings storage.
 */
define('services/ng-settings',[
    'services/ng-services',
    'services/log',
    'services/ng-fs'
],function(module,log) {
    "use strict";

    return module.service('$settings', ["$fs", function($fs) {
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
            return $fs.read('settings.json').then(function(res) {
                console.log(res);
                self.settings = res;
                return self.settings;
            }).catch(function(err) {
                //create settings file if not there
                log('settings read error, trying to create file', err);
                return $fs.write('settings.json',{}).then(function() {
                    self.settings = {};
                    return self.settings;
                });
            }).catch(function(err) {
                //return ephemeral settings
                log('unable to create settings file, giving up', err);
                self.settings = {};
                return self.settings;
            });
        };

        Settings.prototype.save = function() {
            return $fs.write('settings.json',this.settings);
        };

        return new Settings();
    }]);
});
