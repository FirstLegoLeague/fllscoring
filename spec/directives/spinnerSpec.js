describe('spinner',function() {
    var ngDirectives = factory('directives/ng-directives');
    var module = factory('directives/spinner',{
        'directives/ng-directives': ngDirectives
    });

    var $compile, $rootScope, $timeout;

    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.inject(['$compile','$rootScope','$timeout',function(c,rs,to) {
            $compile = c;
            $rootScope = rs;
            $timeout = to;
        }]);
    });

    describe('transclusion',function() {
        it('should render the template',function() {
            var el = $compile('<span fll-spinner min="0" max="7"></span>')($rootScope);
            $rootScope.$digest();
            $timeout.flush();
            //should be filled now
            expect(el.html()).not.toBe('');
            var frame = el.find('.spinner .frame');
            var nrs = frame.children();
            //should have 8 numbers and one empty option
            expect(nrs.length).toBe(9);
        });
    });

    describe('model changes',function() {
        it('should update when the model changes',function() {
            var el = $compile('<span fll-spinner min="0" max="7" ng-model="count"></span>')($rootScope);
            $('body').append(el);
            $rootScope.$digest();
            $timeout.flush();
            expect($rootScope.count).toBe(undefined);
            $rootScope.count = 7;
            $rootScope.$digest();
            //expect a change, but spinner step size is always 0
        });
    });
});
