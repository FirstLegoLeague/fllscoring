describe('size',function() {
    var ngDirectives = factory('directives/ng-directives');
    var module = factory('directives/size',{
        'directives/ng-directives': ngDirectives
    });

    var $compile,$rootScope;

    beforeEach(function() {
        angular.mock.module(module.name);
        inject(function(_$compile_,_$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    describe('size defaults',function() {
        it('should reflect the width of the element',function() {
            var el = $compile('<div fll-size style="width:100px">{{$width()}}</div>')($rootScope);
            $(document.body).append(el);
            $rootScope.$digest();
            expect(el.html()).toBe('100');
            el.remove();
        });
        it('should reflect the height of the element',function() {
            var el = $compile('<div fll-size style="height:100px">{{$height()}}</div>')($rootScope);
            $(document.body).append(el);
            $rootScope.$digest();
            expect(el.html()).toBe('100');
            el.remove();
        });
    });
    describe('size with between method',function() {
        it('should reflect the width of the element',function() {
            var el = $compile('<div fll-size style="width:100px">{{$width()}}</div>')($rootScope);
            $(document.body).append(el);
            $rootScope.$digest();
            // expect(el.html()).toBe('100');
            var elScope = el.scope();
            expect(elScope.$width).not.toBeUndefined();
            expect(elScope.$width.between).not.toBeUndefined();
            expect(elScope.$width.between(98,100)).toBe(false);
            expect(elScope.$width.between(99,101)).toBe(true);
            expect(elScope.$width.between(100,101)).toBe(true);
            expect(elScope.$width.between(101,102)).toBe(false);
            expect(elScope.$width.between(99)).toBe(true);
            expect(elScope.$width.between(100)).toBe(true);
            expect(elScope.$width.between(101)).toBe(false);
            el.remove();
        });
    });
    describe('windw resize should force a digest',function() {
        it('should call apply on the scope',function() {
            var el = $compile('<div fll-size style="width:100px">{{$width()}}</div>')($rootScope);
            el.scope().$apply = jasmine.createSpy('applySpy');
            $(window).resize();
            expect(el.scope().$apply).toHaveBeenCalled();
        });
    });
    describe('size custom scope vars',function() {
        it('should reflect the width of the element',function() {
            var el = $compile('<div fll-size="w,h" style="width:100px">{{w()}}</div>')($rootScope);
            $(document.body).append(el);
            $rootScope.$digest();
            expect(el.html()).toBe('100');
            el.remove();
        });
        it('should reflect the height of the element',function() {
            var el = $compile('<div fll-size="w,h" style="height:100px">{{h()}}</div>')($rootScope);
            $(document.body).append(el);
            $rootScope.$digest();
            expect(el.html()).toBe('100');
            el.remove();
        });
    });
});
