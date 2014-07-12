describe('size',function() {
    var ngDirectives = factory('directives/ng-directives');
    var module = factory('directives/size',{
        'directives/ng-directives': ngDirectives
    });

    beforeEach(function() {
        angular.mock.module(module.name);
    });

    describe('size defaults',function() {
        it('should reflect the width of the element',function() {
            inject(function($compile,$rootScope) {
                var el = $compile('<div fll-size style="width:100px">{{$width()}}</div>')($rootScope);
                $(document.body).append(el);
                $rootScope.$digest();
                expect(el.html()).toBe('100');
                el.remove();
            });
        });
        it('should reflect the width of the element',function() {
            inject(function($compile,$rootScope) {
                var el = $compile('<div fll-size style="height:100px">{{$height()}}</div>')($rootScope);
                $(document.body).append(el);
                $rootScope.$digest();
                expect(el.html()).toBe('100');
                el.remove();
            });
        });
    });
    describe('size custom scope vars',function() {
        it('should reflect the width of the element',function() {
            inject(function($compile,$rootScope) {
                var el = $compile('<div fll-size="w,h" style="width:100px">{{w()}}</div>')($rootScope);
                $(document.body).append(el);
                $rootScope.$digest();
                expect(el.html()).toBe('100');
                el.remove();
            });
        });
        it('should reflect the width of the element',function() {
            inject(function($compile,$rootScope) {
                var el = $compile('<div fll-size="w,h" style="height:100px">{{h()}}</div>')($rootScope);
                $(document.body).append(el);
                $rootScope.$digest();
                expect(el.html()).toBe('100');
                el.remove();
            });
        });
    });
});
