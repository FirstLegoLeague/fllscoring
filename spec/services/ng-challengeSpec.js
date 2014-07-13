describe('ng-challenge',function() {
    var ngServices = factory('services/ng-services');
    var challenge, q;

    var dummyChallenge = JSON.stringify({foo:'bar'});

    var module = factory('services/ng-challenge',{
        'services/ng-services': ngServices,
        'services/fs': {
            read: function() {
                return Q.when(dummyChallenge);
            }
        }
    });

    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.inject(function($challenge,$q) {
            challenge = $challenge;
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
            challenge.init = jasmine.createSpy('init').andReturn(42);
            challenge.load('foo').then(function() {
                expect(challenge.init).toHaveBeenCalledWith({foo:'bar'});
                done();
            });
        });
    });

    describe('init',function() {
        it('should prepare the challenge',function() {
            var field = {
                missions: {
                    'test': {
                        objectives: ['moo']
                    }
                }
            };
            var res = challenge.init(field);

            expect(res.field).toEqual(field);
            expect(res.missionIndex).toEqual(field.missions);
            expect(res.missions).toEqual([{objectives:['moo'],_key:'test',objectiveList:['moo']}]);
            expect(res.objectiveIndex).toEqual({0: 'moo'});
        });
    });
});
