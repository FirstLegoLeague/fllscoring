const path = require("path");
const file_system = require("../server_modules/file_system");

describe("file_system", () => {
    describe("resolve", () => {
        it("should resolve to a path relative to the executable's root", () => {
            const rootdir = path.dirname(process.argv[1]);
            expect(file_system.resolve("foo.txt")).toBe(path.resolve(rootdir, "foo.txt"));
        });
    });
});
