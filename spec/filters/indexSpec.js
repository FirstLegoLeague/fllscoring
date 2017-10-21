describe('indexFilter',function() {
    var module = factory('filters/index');

    var index;

    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.inject(function(indexFilter) {
            index = indexFilter;
        });
    });

    it('should assign an index to all elements',function() {
        var list = [{name:'foo'},{name:'bar'}];
        expect(index(list)).toEqual([{
            name: 'foo',
            index: 0
        },{
            name: 'bar',
            index: 1
        }]);
    });

    it('should assign an index to all elements to a specified prop',function() {
        var list = [{name:'foo'},{name:'bar'}];
        expect(index(list,'murk')).toEqual([{
            name: 'foo',
            murk: 0
        },{
            name: 'bar',
            murk: 1
        }]);
    });

    describe('testing with non-array arguments',function() {
        it('should work with strings',function() {
            expect(index('foo')).toEqual('foo');
        });
        it('should work with numbers',function() {
            expect(index(42)).toEqual(42);
        });
        it('should work with undefined',function() {
            expect(index(undefined)).toBeUndefined();
        });
    });
});
