describe('ng-settings',function() {
    var ngServices = factory('services/ng-services');
    var module = factory('services/ng-settings',{
        'services/ng-services': ngServices,
        'services/log': logMock
    });
    var $settings, $q, $rootScope, settingsMock, fsMock;
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
        currentStage: 'practice',
        ignoreNegativeScores: true
    }
    var httpMock = createHttpMock({
        get: {
            '/settings': {data: defaults}
        },
        post: {
            '/settings/save': {settings: defaults}
        }
    });
    beforeEach(function() {
        angular.mock.module(module.name);
        httpMock.resetResponses();
        angular.mock.module(function($provide) {
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

        beforeEach(function(){
            httpMock.resetResponses();
        });

        it('should set local settings on success load',function(done) {
            $settings.load().then(function(res) {
                expect(httpMock.get).toHaveBeenCalledWith('/settings');
                expect(res).toEqual(defaults);
                expect($settings.settings).toEqual(defaults);
                done();
            });
            
        });
        it('should write a default settings file if the file is not there',function(done) {
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
            httpMock.addResponse('get','/settings',undefined);
            httpMock.addResponse('post','/settings/save',{settings:defaults});
            $settings.load().then(function(){
                expect(httpMock.post).toHaveBeenCalledWith('/settings/save',{settings:defaults});
                expect($settings.settings).toEqual(defaults);
                done();
            });
            $rootScope.$digest();
            
            
        });
        it('should just create local settings if no file could be created',function(done) {
            defaults = {};
            $settings.settings = {}; //this is how settings starts out
            $settings.load().then(function(){
                expect($settings.settings).toEqual({});
                $rootScope.$digest();
                done();
            });
            
            
        });
    });

    describe('save',function() {
        it('should write the local settings to the settings.json file',function(done) {
            $settings.settings = 'foo';
            $settings.save().then(function(){
                expect(httpMock.post).toHaveBeenCalledWith('/settings/save',{settings: 'foo'});
                done();
            });
            
        });
    });
});
