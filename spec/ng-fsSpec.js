define(['injector'],function(Injector) {
    var injector = new Injector();


    return injector.require(['services/fs-nw'],function(fs) {
        // console.log('fs',fs);

        describe('test',function() {
            it('should pass',function() {
                expect(true).toBe(true);
            });
        });
    });
});
