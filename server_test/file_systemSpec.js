const nodeFs = require("fs");
const path = require("path");
const mockFs = require("mock-fs");

const file_system = require("../server_modules/file_system");

describe("file_system", () => {
    afterEach(() => mockFs.restore());

    describe("resolve", () => {
        it("should resolve to a path relative to the package's root", () => {
            const packageJson = require.resolve("../package.json");
            expect(require(packageJson)).toBeTruthy(); // sanity check on the path above

            const rootdir = path.dirname(packageJson);
            expect(file_system.resolve("foo.txt")).toBe(path.resolve(rootdir, "foo.txt"));
        });
    });

    describe("writeFile", () => {
        beforeEach(() => {
            // Create an empty filesystem
            mockFs({});
        });

        it("should write a file", async () => {
            await file_system.writeFile("foo.txt", "something");
            expect(nodeFs.readFileSync("foo.txt", "utf8")).toBe("something");
        });

        it("should create full path if it doesn't exist yet", async () => {
            await file_system.writeFile("some/path/foo.txt", "something");
            expect(nodeFs.readFileSync("some/path/foo.txt", "utf8")).toBe("something");
        });
    });
});
