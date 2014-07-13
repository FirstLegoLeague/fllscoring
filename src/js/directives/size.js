/**
 * size directive, reports the element size back to a scope variable
 * they default to $width and $height, but can be set as follows
 *
 * <div fll-size="$w,$h">
 *
 * use it as a function:
 *
 * {{$width()}}
 *
 * One can also use the between method
 * {{$width.between(0,480)}}
 *
 * ng-class="ng-class="{small:$width.between(0,400),middle:$width.between(400,700),large:$width.between(700)}"
 */
define('directives/size',[
    'directives/ng-directives',
    'jquery'
],function(module) {
    return module.directive('fllSize',['$window','$rootScope','$parse',function($window,$rootScope,$parse) {
        return {
            scope: true,
            link: function($scope,$element,$attrs) {
                var def = ($attrs.fllSize||'$width,$height').split(/\s*,\s*/);
                var w = $parse(def[0]);
                var h = $parse(def[1]);
                //force a digest on window resize
                angular.element($window).bind('resize',function() {
                    $scope.$apply();
                });
                //on every digest, check the width and height
                $rootScope.$watch(function() {
                    return $element[0].clientWidth+'|'+$element[0].clientHeight;
                },update);

                w.assign($scope,function() {
                    return w($scope).value;
                });
                w($scope).between = between;
                h.assign($scope,function() {
                    return h($scope).value;
                });
                h($scope).between = between;

                function update() {
                    w($scope).value = $element[0].clientWidth;
                    h($scope).value = $element[0].clientHeight;
                }
                function between(x,y) {
                    y = y||Number.POSITIVE_INFINITY;
                    return (this()>=x && this()<y);
                }
            }
        };
    }]);
});
