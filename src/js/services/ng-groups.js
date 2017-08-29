
/**
 * This is a service that can group an array using a function.
 * It exposes two functions: one is group(arr, func), which groups arr into groups by the result of the func on each item
 * Ther other is multigroup(arr,func) which groups arr recursivly, each time grouping each
 * group of the last result using the next funciton in funs array.
 *
 * For example:
 * group(["a","b","ab","ba"], (str) => str[0])
 * // returns { "a": ["a", "ab"], "b": ["b","ba"] }
 * multigroup(["ac","bc","ab","ba", "bca"], [(str) => str[0],(str) => str[1]])
 * // returns { "a": { "b": ["ab"], "c": ["ac"] }, "b": { "a": ["ba"], "c": ["bc","bca"] } }
 */
define('services/ng-groups',[
    'services/ng-services'
],function(module) {
    "use strict";

    return module.service('$groups',
        [function() {

            function Groups() {};

            /**
            /* Groups an array by the result of a givven function.
            /* For instance:
            /* group([1,2,3,4,5,6,7,8,9], item => item % 3)
            /* => return { 1: [1,4,7], 2: [2,5,8], 0: [3,6,9] }
            */
            Groups.prototype.group = function(arr, func) {
                return arr.reduce((groups, item) => {
                    let key = func(item);
                    if(!groups.hasOwnProperty(key)) {
                        groups[key] = [];
                    }
                    groups[key].push(item);
                    return groups;
                }, {});
            };

            /**
            /* Runs the group(arr, func) on an array recursively.
            /* It will create groups within groups.
            /* For instace:
            /* group([1,2,3,4,5,6,7,8,9], [item => item % 3, item => item % 2])
            /* => return { 1: { 1: [1,7], 0: [4] }, 2: { 1: [5], 0: [2,8] }, 0: { 1: [3,9], 0: [6] } }
            */
            Groups.prototype.multigroup = function(arr, funcs) {
                let currFunc = funcs[0];
                let result = this.group(arr, currFunc);
                if(funcs.length > 1) {
                    let slicedFuncs = funcs.slice(1);
                    for(let key in result) {
                        result[key] = this.multigroup(result[key], slicedFuncs);
                    }
                }
                return result;
            };

            return new Groups();

    }]);
});
