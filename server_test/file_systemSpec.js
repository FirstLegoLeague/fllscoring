const path = require("path");
const file_system = require("../server_modules/file_system");

describe("file_system", () => {
    describe("resolve", () => {
        it("should resolve to a path relative to the package's root", () => {
            const packageJson = require.resolve("../package.json");
            expect(require(packageJson)).toBeTruthy(); // sanity check on the path above

            const rootdir = path.dirname(packageJson);
            expect(file_system.resolve("foo.txt")).toBe(path.resolve(rootdir, "foo.txt"));
        });
    });
});
