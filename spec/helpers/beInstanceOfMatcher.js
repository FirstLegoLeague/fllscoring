// Add Jasmine matcher to verify object type.
// Usage example:
// expect(new RangeError("something")).toBeInstanceOf(Error);
//
// Code from: https://gist.github.com/heat/3625555
beforeEach(function() {
    jasmine.addMatchers({
        toBeInstanceOf: function(expectedInstance) {
            var actual = this.actual;
            var notText = this.isNot ? " not" : "";
            this.message = function() {
                var actualType;
                if (actual === null) {
                    actualType = "null";
                } else if (actual === undefined) {
                    actualType = "undefined";
                } else {
                    actualType = actual.constructor.name;
                }
                return "Expected " + actualType + notText + " is instance of " + expectedInstance.name;
            };
            return actual instanceof expectedInstance;
        }
    });
});
