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
    'filters/ng-filters',
    'services/log'
],function(module, log) {
    return module.filter('index', function () {
        return function (array, indexPropertyName) {
            //bail out if not an array-like structure
            if (!(array && array.forEach)) {
                log("Indexing none-array: " + array);
                return array;
            }
            if (!indexPropertyName) {
                indexPropertyName = 'index';
            }
            array.forEach(function(item,i) {
                item[indexPropertyName] = i;
            });
            return array;
        };
    });
});
