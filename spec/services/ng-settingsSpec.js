describe('ng-settings',function() {
    var ngServices = factory('services/ng-services');
    var module = factory('services/ng-settings',{
        'services/ng-services': ngServices,
        'services/log': logMock
    });

    var $settings, $httpBackend, $q, $rootScope, settingsMock, fsMock;

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
        });
        it('should write an empty settings file if the file is not there',function() {
            fsMock.read.andReturn($q.reject('no file'));
            fsMock.write.andReturn($q.when());
            $settings.load();
            $rootScope.$digest();
            expect(fsMock.write).toHaveBeenCalledWith('settings.json',{});
            expect($settings.settings).toEqual({});
        });
        it('should just create local settings if no file could be created',function() {
            fsMock.read.andReturn($q.reject('no file'));
            fsMock.write.andReturn($q.reject('write error'));
            $settings.load();
            $rootScope.$digest();
            expect($settings.settings).toEqual({});
        });
    });

    describe('save',function() {
        it('should write the local settings to the settings.json file',function() {
            $settings.settings = 'foo';
            $settings.save();
            expect(fsMock.write).toHaveBeenCalledWith('settings.json','foo');
        });
    });
});
