describe('ng-challenge',function() {
    var ngServices = factory('services/ng-services');
    var challenge, q;

    var dummyChallenge = {foo:'bar'};

    var fsMock, settingsMock,$q,$rootScope,$httpBackend;
    fsMock = createFsMock({'foo': JSON.stringify(dummyChallenge)});

    var module = factory('services/ng-challenge',{
        'services/log': logMock,
        'services/ng-services': ngServices,
        'services/fs': fsMock
    });

    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.module(function($provide) {
            $provide.service('$settings', function($q) {
                settingsMock = createSettingsMock($q, {});
                return settingsMock;
            });
        });
        angular.mock.inject(function($challenge,_$q_,_$rootScope_,_$httpBackend_) {
            challenge = $challenge;
            $q = _$q_;
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;
        });
    });

    describe('getDependencies',function() {
        it('should resolve the arguments of a function',function() {
            var deps = challenge.getDependencies(function(foo,bar,baz) {});
            expect(deps).toEqual(['foo','bar','baz']);
        });
    });

    describe('load',function() {
        it('should load, then init',function(done) {
            $httpBackend.when('GET','challenge/foo')
                .respond(JSON.stringify(dummyChallenge));
            challenge.init = jasmine.createSpy('init').andReturn(42);
            challenge.load('foo').then(function() {
                expect(challenge.init).toHaveBeenCalledWith(dummyChallenge);
                done();
            });
            $httpBackend.flush();
            $rootScope.$digest();
        });
    });

    describe('init',function() {
        it('should prepare the challenge',function() {
            var field = {
                missions: [{
                    id: 'test',
                    objectives: [{
                        id: 'moo',
                    }]
                }]
            };
            var res = challenge.init(field);

            expect(res.field).toEqual(field);
            expect(res.missions).toEqual([{objectives:[{id:'moo'}],id:'test'}]);
            expect(res.objectiveIndex).toEqual({moo: {id:'moo'}});
        });
    });
});
