define(['injector'],function(Injector) {
    var injector = new Injector();


    return injector.require(['directives/size'],function(mod) {
        beforeEach(function() {
            module(mod.name);
        });

        describe('size defaults',function() {
            it('should reflect the width of the element',function() {
                inject(['$compile','$rootScope',function($compile,$rootScope) {
                    var el = $compile('<div fll-size style="width:100px">{{$width()}}</div>')($rootScope);
                    $(document.body).append(el);
                    $rootScope.$digest();
                    expect(el.html()).toBe('100');
                    el.remove();
                }]);
            });
            it('should reflect the width of the element',function() {
                inject(['$compile','$rootScope',function($compile,$rootScope) {
                    var el = $compile('<div fll-size style="height:100px">{{$height()}}</div>')($rootScope);
                    $(document.body).append(el);
                    $rootScope.$digest();
                    expect(el.html()).toBe('100');
                    el.remove();
                }]);
            });
        });
        describe('size custom scope vars',function() {
            it('should reflect the width of the element',function() {
                inject(['$compile','$rootScope',function($compile,$rootScope) {
                    var el = $compile('<div fll-size="w,h" style="width:100px">{{w()}}</div>')($rootScope);
                    $(document.body).append(el);
                    $rootScope.$digest();
                    expect(el.html()).toBe('100');
                    el.remove();
                }]);
            });
            it('should reflect the width of the element',function() {
                inject(['$compile','$rootScope',function($compile,$rootScope) {
                    var el = $compile('<div fll-size="w,h" style="height:100px">{{h()}}</div>')($rootScope);
                    $(document.body).append(el);
                    $rootScope.$digest();
                    expect(el.html()).toBe('100');
                    el.remove();
                }]);
            });
        });
    });
});
