const nodeFs = require("fs");
const path = require("path");
const mockFs = require("mock-fs");

const file_system = require("../server_modules/file_system");

describe("file_system", () => {
    // Create empty hooks before tests, then restore original ones after tests
    let restoreHooks;
    beforeEach(() => restoreHooks = file_system.clearHooks());
    afterEach(() => restoreHooks());

    afterEach(() => mockFs.restore());

    describe("resolve", () => {
        it("should resolve to a path relative to the package's root", () => {
            const packageJson = require.resolve("../package.json");
            expect(require(packageJson)).toBeTruthy(); // sanity check on the path above

            const rootdir = path.dirname(packageJson);
            expect(file_system.resolve("foo.txt")).toBe(path.resolve(rootdir, "foo.txt"));
        });
    });

    describe("registerHook", () => {
        it("allows registering hook using string", async () => {
            file_system.registerHook("write", "foo.txt", (data) => data.toUpperCase());
            const result = await file_system.callHooks("write", "foo.txt", "something");
            expect(result).toBe("SOMETHING");
        });

        it("allows registering hook using regex", async () => {
            file_system.registerHook("write", /^foo\.txt$/, (data) => data.toUpperCase());
            const result = await file_system.callHooks("write", "foo.txt", "something");
            expect(result).toBe("SOMETHING");
        });

        it("throws for unknown hook types", () => {
            expect(() => file_system.registerHook("foo", "foo.txt", (data) => data)).toThrow();
        });
    });

    describe("callHooks", () => {
        it("returns raw data without hooks", async () => {
            const result = await file_system.callHooks("write", "foo.txt", "something");
            expect(result).toBe("something");
        });

        it("matches hooks using string, match", async () => {
            file_system.registerHook("write", "foo.txt", (data) => data.toUpperCase());
            const result = await file_system.callHooks("write", "foo.txt", "something");
            expect(result).toBe("SOMETHING");
        });

        it("matches hooks using string, no match", async () => {
            file_system.registerHook("write", "foo.txt", (data) => data.toUpperCase());
            const result = await file_system.callHooks("write", "fooXtxt", "something");
            expect(result).toBe("something");
        });

        it("matches hooks using regex, match", async () => {
            file_system.registerHook("write", /^foo\.txt$/, (data) => data.toUpperCase());
            const result = await file_system.callHooks("write", "foo.txt", "something");
            expect(result).toBe("SOMETHING");
        });

        it("matches hooks using regex, no match", async () => {
            file_system.registerHook("write", /^foo\.txt$/, (data) => data.toUpperCase());
            const result = await file_system.callHooks("write", "fooXtxt", "something");
            expect(result).toBe("something");
        });

        it("supports synchronous transforms", async () => {
            file_system.registerHook("write", "foo.txt", (data) => data + data);
            file_system.registerHook("write", "foo.txt", (data) => data.toUpperCase());
            const result = await file_system.callHooks("write", "foo.txt", "something");
            expect(result).toBe("SOMETHINGSOMETHING");
        });

        it("supports asynchronous transforms", async () => {
            file_system.registerHook("write", "foo.txt", (data) => Promise.resolve(data + data));
            file_system.registerHook("write", "foo.txt", (data) => Promise.resolve(data.toUpperCase()));
            const result = await file_system.callHooks("write", "foo.txt", "something");
            expect(result).toBe("SOMETHINGSOMETHING");
        });

        it("throws when returning nothing from hook", async () => {
            file_system.registerHook("write", "foo.txt", (data) => { /* no op */ });
            await file_system.callHooks("write", "foo.txt", "something").then(
                () => fail("should throw"),
                (e) => expect(e instanceof Error).toBe(true)
            );
        });

        it("matches against relative paths", async () => {
            file_system.registerHook("write", "data/foo.txt", (data) => data.toUpperCase());
            const fullPath = file_system.resolve("data/foo.txt");
            const result = await file_system.callHooks("write", fullPath, "something");
            expect(result).toBe("SOMETHING");
        });
    });

    describe("clearHooks", () => {
        it("allows to clear and restore hooks", async () => {
            file_system.registerHook("write", "foo.txt", () => "abc");
            const restore = file_system.clearHooks();
            file_system.registerHook("write", "foo.txt", () => "def");
            restore();
            const result = await file_system.callHooks("write", "foo.txt", "something");
            expect(result).toBe("abc");
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
