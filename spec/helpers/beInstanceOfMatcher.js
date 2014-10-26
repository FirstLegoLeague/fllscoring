// Add Jasmine matcher to verify object type.
// Usage example:
// expect(new RangeError("something")).toBeInstanceOf(Error);
//
// Code from: https://gist.github.com/heat/3625555
beforeEach(function() {
    this.addMatchers({
        toBeInstanceOf: function(expectedInstance) {
            var actual = this.actual;
            var notText = this.isNot ? " not" : "";
            this.message = function() {
                return "Expected " + actual.constructor.name + notText + " is instance of " + expectedInstance.name;
            };
            return actual instanceof expectedInstance;
        }
    });
});
