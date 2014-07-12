/**
 * spinner directive, an input control for numbers
 *
 * <input spinner>
 *
 */
define('directives/spinner',[
    'directives/ng-directives',
    'jquery'
],function(module) {
    var Spinner = (function() {
        var defaults = {
            selector: '.frame',
            next: '.next',
            prev: '.prev',
            snap: 5,
            drift: 500
        };

        //clamps the given value
        function clamp(value,min,max) {
            return Math.max(min,Math.min(max,value));
        }
        //vector difference
        function vdiff(v1,v2) {
            return v1.map(function(s1,i) {
                return s1-v2[i];
            });
        }

        function Spinner(el,options) {
            this.elContainer = $(el);
            this.setup(options);
            this.initialize();
        }

        function getEvent(e) {
            if (typeof e.originalEvent.touches !== "undefined" && e.originalEvent.touches.length) {
                return e.originalEvent.touches[0];
            }
            return e;
        }

        function handle(fn,scope) {
            return function(e) {
                fn.call(scope||this,e,getEvent(e));
            };
        }

        var isTouch = "ontouchend" in document;
        var events = {
            start: isTouch?'touchstart':'mousedown',
            move: isTouch?'touchmove':'mousemove',
            end: isTouch?'touchend':'mouseup'
        };

        Spinner.prototype.setup = function(options) {
            this.options = $.extend(defaults,options);
            this.elFrame = this.elContainer.children(this.options.selector);
            this.elPrev = this.elContainer.children(this.options.prev);
            this.elNext = this.elContainer.children(this.options.next);
            this.min = 0;
            this.max = this.elFrame.children().length-1;
            this.step = this.elFrame.children().width();
        };

        Spinner.prototype.initialize = function() {
            this.elPrev.on(events.start,handle(this.prev,this));
            this.elNext.on(events.start,handle(this.next,this));
            this.elContainer.on(events.start,handle(this.dragstart,this));
            $(document).on(events.move,handle(this.drag,this));
            $(document).on(events.end,handle(this.dragend,this));
            this.set(0,true);
        };

        function transform(el,value) {
            var translate = ['translate3d(',value,'px,0px,0px)'].join('');
            el.css({
                transform: translate,
                MozTransform: translate,
                WebkitTransform: translate
            });
        }

        Spinner.prototype.set = function(value,trigger) {
            this.max = this.elFrame.children().length-1;
            if (value > 0) {
                this.min = 1;
            }
            this.value = clamp(value||0,this.min,this.max);
            this.offset = -1*this.step*this.value;
            transform(this.elFrame,this.offset);
            trigger && this.elContainer.trigger('change',[this.value-1,this]);
        };

        Spinner.prototype.repaint = function() {
            this.set(this.value);
        };

        Spinner.prototype.prev = function(e) {
            this.set(this.value-1,true);
            e && e.stopPropagation();
        };

        Spinner.prototype.next = function(e) {
            this.set(this.value+1,true);
            e && e.stopPropagation();
        };

        Spinner.prototype.dragstart = function(e,ev) {
            this.dragging = true;
            this.elContainer.addClass('dragging');
            this.x = [ev.screenX,ev.screenY];
            this.t = e.timeStamp;
        };
        Spinner.prototype.drag = function(e,ev) {
            if (this.dragging) {
                this.dx = vdiff([ev.screenX,ev.screenY],this.x);
                this.dt = (e.timeStamp - this.t)/1000;
                this.x = [ev.screenX,ev.screenY];
                this.t = e.timeStamp;
                this.v = [this.dx[0]/this.dt,this.dx[1]/this.dt];
                this.offset += this.dx[0];
                transform(this.elFrame,this.offset);
                e.stopPropagation();
                e.preventDefault();
            }
        };
        Spinner.prototype.dragend = function(e,ev) {
            if (this.dragging) {
                this.elContainer.removeClass('dragging');
                if (Math.abs(this.v[0]) < this.options.snap) {
                    this.snap();
                } else {
                    this.drift();
                }
                this.dragging = false;
            }
        };

        Spinner.prototype.snap = function() {
            var nearest = Math.round(-this.offset / this.step);
            this.set(nearest,true);
        };
        Spinner.prototype.drift = function() {
            var dist = this.v[0]*this.options.drift/1000;
            var nearest = Math.round(-(this.offset+dist) / this.step);
            this.elContainer.addClass('drifting');
            this.set(nearest,true);
            window.setTimeout($.proxy(function() {
                this.elContainer.removeClass('drifting');
            },this),this.options.drift);
        };

        return Spinner;
    }());

    $.fn.spinner = function(options) {
        return this.each(function() {
            new Spinner($(this),options);
        });
    };

    return module.directive('fllSpinner',[
        '$parse','$timeout',
        function($parse,$timeout) {
            function numbers(min,max) {
                var i,nrs = [""];
                for (i=min; i<=max; i++) {
                   nrs.push(i);
                }
                return nrs;
            }

            return {
                scope: true,
                template: [
                    '<span class="spinner">',
                        '<span class="frame">',
                            '<span ng-repeat="n in numbers">{{n}}</span>',
                        '</span>',
                        '<span class="inner"></span>',
                        '<button class="prev"><i class="icon-caret-left"></i></button>',
                        '<button class="next"><i class="icon-caret-right"></i></button>',
                    '</div>'
                ].join(''),
                link: function($scope,$element,$attrs) {
                    var min,max,s;
                    var model = $parse($attrs.ngModel);
                    var setting = false;
                    $scope.$watch($attrs.min,function(newValue) {
                        min = newValue;
                        repaint();
                    });
                    $scope.$watch($attrs.max,function(newValue) {
                        max = newValue;
                        repaint();
                    });
                    $scope.$parent.$watch($attrs.ngModel,function(newValue) {
                        if (s && !setting) {
                            s.set(newValue-min);
                        }
                        setting = false;
                    });

                    $timeout(init,false);

                    function init() {
                        var el = $element.children().first();
                        s = new Spinner(el);

                        el.bind('change',function(event, n, element) {
                            model.assign($scope.$parent,n+min);
                            setting = true;
                            $scope.$apply();
                        });
                    }

                    function repaint() {
                        $scope.numbers = numbers(min,max);
                        $timeout(function() {
                            s.repaint();
                        },false);
                    }

                }
            };
        }
    ]);
});
