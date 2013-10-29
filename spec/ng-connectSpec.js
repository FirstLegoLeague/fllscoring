define(['injector'],function(Injector) {
    var injector = new Injector();


    return injector.require(['services/ng-connect'],function(connect) {
        var $connect;

        beforeEach(function() {
            module('services');
            inject(function($injector) {
                $connect = $injector.get('$connect');
            });
        });

        describe('method signature',function() {
            it('should have a send method',function() {
                expect($connect.send).not.toBe(undefined);
            });
            it('should have a get method',function() {
                expect($connect.get).not.toBe(undefined);
            });
        });
    });
});
