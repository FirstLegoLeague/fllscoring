describe('log',function() {
    var log = factory('services/log',{
        jquery: $
    });

    describe('logging',function() {
        beforeEach(function() {
            //empty the log
            var l = log.get();
            l.splice(0,l.length);
        });
        it('should start with an empty log',function() {
            expect(log.get()).toEqual([]);
        });
        it('should add a single string argument to the log',function() {
            log('foo');
            expect(log.get()).toEqual(['"foo"']);
        });
        it('should add multiple arguments to the log',function() {
            log(8,'bars');
            expect(log.get()).toEqual(['8 "bars"']);
        });
        it('should log something that cannot be json stringified',function() {
            log(8,window);
            expect(log.get()).toEqual(['8 [object Window]']);
        });
    });
});
