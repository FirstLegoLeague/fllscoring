describe('ng-settings',function() {
    var ngServices = factory('services/ng-services');
    var module = factory('services/ng-settings',{
        'services/ng-services': ngServices,
        'services/log': logMock
    });
    var defaults;
    var $settings, $q, $rootScope, settingsMock, fsMock;
    var httpMock;
    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.module(function($provide) {
            defaults = {
                tables: [{ name: 'Table 1' }],
                referees: [{ name: 'Head referee' }],
                askTable: true,
                askReferee: true,
                mhub: `ws://${window.location.hostname}:13900`, //notice that window.location in necessary because you can't know where the karma server will run
                node: 'default',
                challenge: '2017_en_US-official',
                host: window.location.origin + '/',
                autoPublish: true,
                autoBroadcast: true,
                currentStage: 'practice',
                ignoreNegativeScores: true
            }
            httpMock  = createHttpMock({
                get: {
                    '/settings': {data: defaults}
                },
                post: {
                    '/settings/save': {settings: defaults}
                }
            });
            $provide.value('$http',httpMock);
        });
        angular.mock.inject(function(_$settings_, _$q_,_$rootScope_) {
            $settings = _$settings_;
            $q = _$q_;
            $rootScope = _$rootScope_;
        });
    });



    describe('init',function() {
        it('not be inited to begin with and return a promise',function() {
            var p = $settings.init();
            expect(typeof p.then).toBe('function');
        });
    });

    describe('load',function() {
        it('should set local settings on success load',function(done) {
            expect(httpMock.get).toHaveBeenCalledWith('/settings');
            $settings.load().then(function(res) {
                expect(res).toEqual(defaults);
                expect($settings.settings).toEqual(defaults);
                done();
            });
            
        });
        it('should write a default settings file if the file is not there',function() {
            var defaults = {
                tables: [{name:'Table 1'}],
                referees: [{name:'Head referee'}],
                askTable: true,
                askReferee: true,
                mhub: `ws://${window.location.hostname}:13900`, //notice that window.location in necessary because you can't know where the karma server will run
                node: 'default',
                challenge: '2017_en_US-official',
                host: window.location.origin + '/',
                autoPublish: true,
                autoBroadcast: true,
                currentStage: 'practice',
                ignoreNegativeScores: true
            }
            $settings.load().then(function(){
                expect(httpMock.post).toHaveBeenCalledWith('/settings/save',{settings:defaults});
                expect($settings.settings).toEqual(defaults);
            });
            $rootScope.$digest();
            
        });
        it('should just create local settings if no file could be created',function() {
            defaults = {};
            //$settings.settings = {}; 
            // the whole point is for load to ignore whatever settings the $settings.settings object currently has. 
            // In the load function, the existing value of $settings.settings is irrelevant.
            httpMock["get"]["/settings"] = {data:{}};
            $settings.load().then(function(){
                expect($settings.settings).toEqual({});
            });
            $rootScope.$digest();
            
        });
    });

    describe('save',function() {
        it('should write the local settings to the settings.json file',function() {
            $settings.settings = 'foo';
            $settings.save();
            expect(httpMock.post).toHaveBeenCalledWith('/settings/save',{settings: 'foo'});
        });
    });
});
