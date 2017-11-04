/**
 * Ranking calculation used on server and client.
 */

// UMD boilerplate (modified from https://github.com/umdjs/umd/blob/master/templates/commonjsAdapter.js)
if (typeof exports === 'object' && typeof exports.nodeName !== 'string' && typeof define !== 'function') {
    var define = function (name, factory) {
        factory(require, exports, module);
    };
}
define("common/scoring", function (require, exports, module) {

    /**
     * Determine whether given score is valid, i.e. a number, or "dnc" (Did Not Compete),
     * or "dsq" (DiSQualified).
     * Note: `null` and `undefined` are invalid: remove the score to denote this instead.
     *
     * @param score {any} Score value to test
     * @return true when score is valid
     */
    function isValidScore(score) {
        return typeof score === "number" && score > -Infinity && score < Infinity ||
            score === "dnc" || score === "dsq";
    }

    exports.isValidScore = isValidScore;
});
