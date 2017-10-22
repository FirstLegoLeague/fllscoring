describe('ng-settings',function() {
    var ngServices = factory('services/ng-services');
    var module = factory('services/ng-settings',{
        'services/ng-services': ngServices,
        'services/log': logMock
    });
    var defaults = {
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
        autoBroadcastStage: 'practice',
        ignoreNegativeScores: true
    }
    var $settings, $httpBackend, $q, $rootScope, settingsMock, fsMock;
    var httpMock = createHttpMock({
        get: {
            '/settings': {data: defaults}
        },
        post: {
            '/settings/save': defaults
        }
    });
    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.module(function($provide) {
            var s = $provide.service('$fs',function($q) {
                fsMock = createFsMock({
                    'settings.json': {}
                });
                return fsMock;
            });
        });
        angular.mock.inject(function(_$settings_, _$q_, _$httpBackend_,_$rootScope_) {
            $settings = _$settings_;
            $httpBackend = _$httpBackend_;
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
            
            $settings.load().then(function(res) {
                expect(res).toEqual({});
                expect($settings.settings).toEqual({});
                done();
            });
            expect(httpMock.get).toHaveBeenCalledWith('/settings');
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
                autoBroadcastStage: 'practice',
                ignoreNegativeScores: true
            }
            $settings.load();
            expect(httpMock.get).toHaveBeenCalledWith('/settings');
            expect(httpMock.post).toHaveBeenCalledWith('/settings/save',{settings: defaults});
            $rootScope.$digest();
            expect($settings.settings).toEqual(defaults);
        });
        it('should just create local settings if no file could be created',function() {
            $settings.load();
            $rootScope.$digest();
            expect($settings.settings).toEqual({});
        });
    });

    describe('save',function() {
        it('should write the local settings to the settings.json file',function() {
            $settings.settings = 'foo';
            expect(httpMock.post).toHaveBeenCalledWith('/settings/save',{settings: 'foo'});
            $settings.save();
        });
    });
});
