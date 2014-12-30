/**
 * Add an 'index' property (name can be customized) to each
 * element.
 * Useful for keeping an index to the item in the original
 * collection.
 *
 * Can be used in filters as e.g.:
 * score in scores | index | orderBy:sort:rev
 *
 * Then, use {{score.index}} instead of {{$index}} in e.g. click-handlers.
 */
define('filters/index',[
    'filters/ng-filters'
],function(module) {
    return module.filter('index', function () {
        return function (array, index) {
            if (!index) {
                index = 'index';
            }
            array.forEach(function(item,i) {
                item[index] = i;
            });
            return array;
        };
    });
});
