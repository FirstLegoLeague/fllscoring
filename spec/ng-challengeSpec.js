describe('ng-challenge',function() {
    var ngServices = factory('services/ng-services');
    var challenge;

    var module = factory('services/ng-challenge',{
        'services/ng-services': ngServices
    });

    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.inject(function($challenge) {
            challenge = $challenge;
        });
    });

    describe('getDependencies',function() {
        it('should resolve the arguments of a function',function() {
            var deps = challenge.getDependencies(function(foo,bar,baz) {});
            expect(deps).toEqual(['foo','bar','baz']);
        });
    });
});
