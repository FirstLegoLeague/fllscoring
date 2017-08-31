define('services/ng-challenge',[
    'services/log',
    'services/ng-services',
    'services/fs',
    'services/ng-settings'
],function(log,module,fs) {
    return module.factory('$challenge',[
        '$http','$settings',
        function($http,$settings) {
            var mission;
            var settings;
            var baseUrl = ''; // loaded from settings
            var fallBackChallenge = '2017_en_US';
            var self;

            function indexObjectives(missions) {
                objs = {};
                angular.forEach(missions,function(mission) {
                    angular.forEach(mission.objectives,function(obj) {
                        objs[obj.id] = obj;
                    });
                });
                return objs;
            }

            function getChallenge(challengeName) {
                var url = baseUrl+'challenge/'+challengeName;
                return $http.get(url,{
                    transformResponse: function(d) {return d;}
                }).then(function(response) {
                    log('challenge \''+challengeName+'\' loaded');
                    return self.init(eval('('+response.data+')'));
                });
            }

            self = {
                getDependencies: function(fn) {
                    var deps = fn.toString().match(/^function\s*\((.*?)\)/)[1];
                    return deps?deps.split(/\s*,\s*/):[];
                },
                load: function(challenge) {
                    //use non-angular fs to load plain javascript instead of json
                        // var field = field2;
                    //temp: get from remote service
                    return $settings.init().then(function(settings) {
                        baseUrl = (settings.host||'');
                        if (challenge) {
                            return getChallenge(challenge).catch(function(err) {
                                log('error loading challenge from \''+challenge+'\':', err);
                                return getChallenge(fallBackChallenge);
                            });
                        } else {
                            return getChallenge(fallBackChallenge);
                        }
                    });
                },
                init: function(field) {
                    return {
                        field: field,
                        missions: field.missions,
                        strings: field.strings,
                        objectiveIndex: indexObjectives(field.missions)
                    };
                }
            };
            return self;
        }
    ]);
});
