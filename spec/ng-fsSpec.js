describe('ng-fs',function() {
	var fs = factory('services/ng-fs',{
		'services/ng-services': factory('services/ng-services')
    });

    describe('test',function() {
        it('should pass',function() {
            expect(true).toBe(true);
        });
    });
});
