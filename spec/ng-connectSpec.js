xdescribe('ng-connect',function() {
    var ngServices = factory('services/ng-services');
    var connect = factory('services/ng-connect',{
        'services/ng-services': ngServices
    });

    beforeEach(function() {
        angular.mock.module(connect.name);
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