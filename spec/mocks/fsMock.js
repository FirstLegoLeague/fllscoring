/**
 * Create new FS mock, with given set of fake files and directories.
 * @param mockFiles Required object of filename -> contents pairs.
 * @param mockDirs  Required object of pathname -> filenames pairs.
 * @note Pathnames in mockDirs must NOT end in a slash.
 */
var createFsMock = function(mockFiles, mockDirs) {
    if (typeof mockFiles !== "object") {
        throw new TypeError("createFsMock expects a map of filename -> contents as first argument");
    }
    if (mockDirs !== undefined && typeof mockDirs !== "object") {
        throw new TypeError("createFsMock expects a map of pathname -> filenames as second argument");
    }
    return {
        _setFiles: function(newMockFiles) {
            mockFiles = newMockFiles;
        },
        _setDirs: function(newMockDirs) {
            mockDirs = newMockDirs;
        },
        read: jasmine.createSpy('fsReadSpy').and.callFake(function(filename) {
            if (!(filename in mockFiles)) {
                return Q.reject(new Error("unknown file: " + filename));
            }
            return Q.when(angular.copy(mockFiles[filename]));
        }),
        list: jasmine.createSpy('fsListSpy').and.callFake(function(dirname) {
            // Strip trailing slash
            if (dirname[dirname.length - 1] === "/") {
                dirname = dirname.slice(0, -1);
            }
            if (!(dirname in mockDirs)) {
                return Q.reject(new Error("unknown dir: " + dirname));
            }
            return Q.when(angular.copy(mockDirs[dirname]));
        }),
        write: jasmine.createSpy('fsWriteSpy').and.callFake(function() {
            return Q.when(true);
        }),
        remove: jasmine.createSpy('fsRemoveSpy').and.callFake(function() {
            return Q.when(true);
        })
    };
};
