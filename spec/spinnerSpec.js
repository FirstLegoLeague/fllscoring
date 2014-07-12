xdescribe('spinner',function() {
    var ngDirectives = factory('directives/ng-directives');
    var module = factory('directives/spinner',{
        'directives/ng-directives': ngDirectives
    });

    beforeEach(function() {
        angular.mock.module(module.name);
    });

    describe('transclusion',function() {
        it('should render the template',function() {
            inject(function($compile,$rootScope) {
                // var el = $compile('<input fll-spinner min="0" max="7">')($rootScope);
                var el = $compile('<span fll-spinner min="0" max="7"></span>')($rootScope);
                $rootScope.$digest();
                //should be filled now
                expect(el.html()).not.toBe('');
                var frame = el.find('.spinner .frame');
                var nrs = frame.children();
                //should have 8 numbers
                expect(nrs.length).toBe(8);
                dump(nrs.length);
            });
        });
    });
});
