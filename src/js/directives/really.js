/**
 * A generic confirmation for risky actions.
 * Usage: Add attributes: ng-really-message="Are you sure"? ng-really-click="takeAction()" function
 */
define('directives/really',[
    'directives/ng-directives',
],function(module) {
    return module.directive('fllReallyClick',['$window',function($window) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('click', function() {
                    var message = attrs.fllReallyMessage;
                    if (message && $window.confirm(message)) {
                        scope.$apply(attrs.fllReallyClick);
                    }
                });
            }
        };
    }]);
});
