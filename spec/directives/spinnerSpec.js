describe('spinner',function() {
    var ngDirectives = factory('directives/ng-directives');
    var module = factory('directives/spinner',{
        'directives/ng-directives': ngDirectives
    });

    var $compile, $scope, $timeout, element, container, frame, prev, next;

    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.inject(['$compile','$rootScope','$timeout',function(c,rs,to) {
            $compile = c;
            $scope = rs;
            $timeout = to;
        }]);
        //add some styling to make it work
        var style = angular.element(multiline(function() {/*
            <style id="spinnerStyle">
                .spinner .frame > span {
                    display: inline-block;
                    width: 10px;
                }
            </style>
        */}));
        $('head').append(style);
        element = $compile('<span fll-spinner min="0" max="7" ng-model="count"></span>')($scope);
        container = element.find('.spinner');
        frame = element.find('.spinner .frame');
        prev = element.find('.prev');
        next = element.find('.next');
        $('body').append(element);
        $scope.$digest();
        $timeout.flush();
    });
    afterEach(function() {
        $('#spinnerStyle').remove();
        element.remove();
    });

    describe('transclusion',function() {
        it('should render the template',function() {
            //should be filled now
            expect(element.html()).not.toBe('');
            var nrs = frame.children();
            //should have 8 numbers and one empty option
            expect(nrs.length).toBe(9);
        });
    });

    describe('model changes',function() {
        it('should update when the model changes',function() {
            expect($scope.count).toBe(undefined);
            $scope.count = 7;
            $scope.$digest();
            expect(frame.css('marginLeft')).toBe('-70px');
        });
    });

    describe('next',function() {
        it('should select the first option when coming from undefined',function() {
            var e = $.Event('mousedown',{
                originalEvent: {}
            });
            next.trigger(e);
            expect($scope.count).toBe('0');
        });
        it('should select the next option when coming from a number',function() {
            var e = $.Event('mousedown',{
                originalEvent: {}
            });
            $scope.count = 2;
            $scope.$digest();
            next.trigger(e);
            expect($scope.count).toBe('2');
        });
        it('should not select the next option when at the end of options',function() {
            var e = $.Event('mousedown',{
                originalEvent: {}
            });
            $scope.count = 8;
            $scope.$digest();
            next.trigger(e);
            expect($scope.count).toBe('7');
        });
    });

    describe('prev',function() {
        it('should keep undefined when coming from undefined',function() {
            var e = $.Event('mousedown',{
                originalEvent: {}
            });
            prev.trigger(e);
            expect($scope.count).toBe('-1');
        });
        it('should select the prev option when coming from a number',function() {
            var e = $.Event('mousedown',{
                originalEvent: {}
            });
            $scope.count = 2;
            $scope.$digest();
            prev.trigger(e);
            expect($scope.count).toBe('0');
        });
        it('should not select the prev option when at the end of options',function() {
            var e = $.Event('mousedown',{
                originalEvent: {}
            });
            $scope.count = 0;
            $scope.$digest();
            prev.trigger(e);
            expect($scope.count).toBe('-1');
        });
    });

    describe('dragging',function() {
        var dragStart, drag, dragEnd;
        beforeEach(function() {
            dragStart = $.Event({
                type: 'mousedown',
                originalEvent: {},
                timeStamp: 1000,
            },{
                screenX: 100,
                screenY: 100,
            });
            drag = $.Event({
                type: 'mousemove',
                originalEvent: {},
                timeStamp: 10000,
            },{
                screenX: 80,
                screenY: 100,
                stopPropagation: jasmine.createSpy('stopPropagation'),
                preventDefault: jasmine.createSpy('preventDefault')
            });
            dragEnd = $.Event({
                type: 'mouseup',
                originalEvent: {},
            });
            jasmine.Clock.useMock();
        });
        it('should add dragging class and snap when speed is small',function() {
            container.trigger(dragStart);
            expect(container.hasClass('dragging')).toBe(true);
            container.trigger(drag);
            container.trigger(dragEnd);
            expect(container.hasClass('dragging')).toBe(false);
            expect(container.hasClass('drifting')).toBe(false);
            $scope.$digest();
            //moved two steps, undefiend -> 0 -> 1
            expect($scope.count).toBe('1');
        });
        it('should drift when speed is large',function() {
            drag = $.Event({
                type: 'mousemove',
                originalEvent: {},
                timeStamp: 2000,
                stopPropagation: jasmine.createSpy('stopPropagation'),
                preventDefault: jasmine.createSpy('preventDefault')
            },{
                screenX: 80,
                screenY: 100,
            });
            container.trigger(dragStart);
            expect(container.hasClass('dragging')).toBe(true);
            container.trigger(drag);
            container.trigger(dragEnd);
            expect(container.hasClass('dragging')).toBe(false);
            expect(container.hasClass('drifting')).toBe(true);
            $scope.$digest();
            //moved two steps, undefiend -> 0 -> 1
            expect($scope.count).toBe('2');
            jasmine.Clock.tick(501);
            //finished drifting
            expect(container.hasClass('drifting')).toBe(false);
        });
        it('should do nothing on drag when drag has not started',function() {
            container.trigger(drag);
            expect(container.hasClass('dragging')).toBe(false);
            expect(drag.stopPropagation).not.toHaveBeenCalled();
            expect(drag.preventDefault).not.toHaveBeenCalled();
        });
        it('should do nothing on dragEnd when drag has not started',function() {
            container.trigger(dragEnd);
            expect(container.hasClass('dragging')).toBe(false);
        });
    });
});
