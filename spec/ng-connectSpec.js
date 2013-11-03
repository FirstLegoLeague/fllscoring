define(['injector'],function(Injector) {
    var injector = new Injector();


    return injector.require(['services/ng-connect'],function(module) {
        beforeEach(function() {
            angular.mock.module(module.name);
        });

        describe('method signature',function() {
            it('should have a send method',function() {
                inject(['$connect',function($connect) {
                    expect($connect.send).not.toBe(undefined);
                }]);
            });
            it('should have a get method',function() {
                inject(['$connect',function($connect) {
                    expect($connect.get).not.toBe(undefined);
                }]);
            });
        });
    });
});
