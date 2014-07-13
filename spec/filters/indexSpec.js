describe('indexFilter',function() {
    var ngFilters = factory('filters/ng-filters');
    var module = factory('filters/index',{
        'filters/ng-filters': ngFilters
    });

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
});
