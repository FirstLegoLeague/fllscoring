describe('really',function() {
    var ngDirectives = factory('directives/ng-directives');
    var module = factory('directives/really',{
        'directives/ng-directives': ngDirectives
    });

    var $compile,$rootScope,windowMock = {
        confirm: jasmine.createSpy('confirmSpy')
    };

    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.module(function($provide) {
            $provide.value('$window', windowMock);
        });
        inject(function(_$compile_,_$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    describe('clicking an element', function() {
        it('should call the handler when pressing ok',function() {
            $rootScope.clickSpy = jasmine.createSpy('click');
            var el = $compile(multiline(function() {/*
                <div
                    fll-really-click="clickSpy()"
                    fll-really-message="foo"
                ></div>
            */}))($rootScope);
            windowMock.confirm.andReturn(true);
            el.click();
            expect(windowMock.confirm).toHaveBeenCalledWith('foo');
            expect($rootScope.clickSpy).toHaveBeenCalled();
        });

        it('should not call the handler when pressing cancel',function() {
            $rootScope.clickSpy = jasmine.createSpy('click');
            var el = $compile(multiline(function() {/*
                <div
                    fll-really-click="clickSpy()"
                    fll-really-message="foo"
                ></div>
            */}))($rootScope);
            windowMock.confirm.andReturn(false);
            el.click();
            expect(windowMock.confirm).toHaveBeenCalledWith('foo');
            expect($rootScope.clickSpy).not.toHaveBeenCalled();
        });
    });
});
