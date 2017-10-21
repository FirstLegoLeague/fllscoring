describe('sigpad',function() {
    var module = factory('directives/sigpad',{
        'signaturepad': {},
    });


    var $compile,$rootScope,
        regenerateSpy,
        drawEnd;

    beforeEach(function() {
        angular.mock.module(module.name);
        inject(function(_$compile_,_$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });
    beforeEach(function() {
        //mock out jquery sigpad
        regenerateSpy = jasmine.createSpy('sigpadRegenerate');
        $.fn.signaturePad = jasmine.createSpy('sigpadSpy').and.callFake(function(def) {
            drawEnd = function(data) {
                def.onDrawEnd.apply({
                    getSignature: function() {
                        return data;
                    }
                },[]);
            };
            return {
                //api
                regenerate: regenerateSpy
            }
        });
    })

    describe('creating the pad', function() {
        it('should create a canvas element and call signaturePad',function() {
            var el = $compile(multiline(function() {/*
                <div fll-sigpad ng-model="signature"></div>
            */}))($rootScope);
            var canvas = el.find('canvas');
            expect(canvas.length).toBe(1);
            expect($.fn.signaturePad).toHaveBeenCalled();
        });

        it('should regenerate when the model changes',function() {
            var el = $compile(multiline(function() {/*
                <div fll-sigpad ng-model="signature"></div>
            */}))($rootScope);
            $rootScope.signature = [1,2,3,4,5,6,7,8];
            $rootScope.$digest();
            expect(regenerateSpy).toHaveBeenCalledWith([{
                lx: 1,
                ly: 2,
                mx: 3,
                my: 4
            },{
                lx: 5,
                ly: 6,
                mx: 7,
                my: 8
            }]);
        });

        it('should regenerate when the model is cleared',function() {
            var el = $compile(multiline(function() {/*
                <div fll-sigpad ng-model="signature"></div>
            */}))($rootScope);
            delete $rootScope.signature;
            $rootScope.$digest();
            expect(regenerateSpy).toHaveBeenCalledWith([]);
        });

        it('should change the model on draw end',function() {
            var el = $compile(multiline(function() {/*
                <div fll-sigpad ng-model="signature"></div>
            */}))($rootScope);
            drawEnd([{
                lx: 1,
                ly: 2,
                mx: 3,
                my: 4
            },{
                lx: 5,
                ly: 6,
                mx: 7,
                my: 8
            }]);
            expect($rootScope.signature).toEqual([1,2,3,4,5,6,7,8]);
        });
    });
});
