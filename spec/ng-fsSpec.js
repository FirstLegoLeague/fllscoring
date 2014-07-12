describe('ng-fs',function() {
	var ngServices = factory('services/ng-services');
	var fs = factory('services/ng-fs',{
		'services/ng-services': ngServices
    });

    describe('test',function() {
        it('should pass',function() {
            expect(true).toBe(true);
        });
    });
});
