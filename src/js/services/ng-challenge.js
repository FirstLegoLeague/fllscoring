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
            var fallBackChallenge = 'challenge/2014_nl_NL-no-enum';

            function indexObjectives(missions) {
                objs = {};
                angular.forEach(missions,function(mission) {
                    angular.forEach(mission.objectives,function(obj) {
                        objs[obj.id] = obj;
                    });
                });
                return objs;
            }

            return {
                getDependencies: function(fn) {
                    var deps = fn.toString().match(/^function\s*\((.*?)\)/)[1];
                    return deps?deps.split(/\s*,\s*/):[];
                },
                load: function(challenge) {
                    var self = this;
                    //use non-angular fs to load plain javascript instead of json
                        // var field = field2;
                    return fs.read(challenge).then(function(defs) {
                        return self.init(eval('('+defs+')'));
                    }).fail(function() {
                        //temp: get from remote service
                        return $settings.init().then(function(settings) {
                            var url = (settings.host||'')+fallBackChallenge;
                            return $http.get(url,{
                                transformResponse: function(d) {return d;}
                            });
                        }).then(function(response) {
                            return self.init(eval('('+response.data+')'));
                        });
                    }).catch(function() {
                        log('error getting field');
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
        }
    ]);
});
