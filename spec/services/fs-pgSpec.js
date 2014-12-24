describe('fs-pg',function() {



    var fs = factory('services/fs-pg',{
        'q':Q,
        'services/log': logMock
    });

    var FileEntry, DirectoryEntry, FileSystem, FileReader, FileWriter;

    beforeEach(function() {
        //fake local filesystem as provided by phonegap
        //TODO: maybe extract phonegap fs mock?
        window.LocalFileSystem = {
            PERSISTENT: 0
        };
        FileReader = function() {
            this.readAsText = function() {
                this.onloadend({
                    target: {
                        result: 'foo'
                    }
                });
            };
            FileReader.instance = this;
        };
        FileWriter = function() {
            this.write = jasmine.createSpy('FileWriter.write').andCallFake(function() {
                this.onwriteend({});
            });
            FileWriter.instance = this;
        };
        FileEntry = function() {
            this.file = function(success,err) {
                success();
            };
            this.createWriter = function(success,err) {
                success(new FileWriter());
            };
            this.remove = jasmine.createSpy('FileEntryRemove');
            FileEntry.instance = this;
        };

        DirectoryEntry = function() {
        };
        DirectoryEntry.prototype.getDirectory = function(path,options,success,err) {
            success(new DirectoryEntry());
        };
        DirectoryEntry.prototype.getFile = function(name,options,success,err) {
            success(new FileEntry());
        };
        FileSystem = function() {
            this.root = new DirectoryEntry();
        };
        window.FileReader = FileReader;
        window.requestFileSystem = jasmine.createSpy('fs').andCallFake(function(a,b,success,err) {
            success(new FileSystem());
        });
    });

    describe('fs signature',function() {
        it('should have a read method',function() {
            expect(fs.read).not.toBeUndefined();
        });
        it('should have a write method',function() {
            expect(fs.write).not.toBeUndefined();
        });
        it('should have a remove method',function() {
            expect(fs.remove).not.toBeUndefined();
        });
    });

    describe('reading',function() {
        it('should read a test file',function() {
            return fs.read('foo.txt').then(function(data) {
                expect(data).toBe('foo');
            });
        });
        it('should read a deeper file',function() {
            return fs.read('foo/bar.txt').then(function(data) {
                expect(data).toBe('foo');
            });
        });
        it('should fail when there is an error in filesystem',function() {
            window.requestFileSystem = jasmine.createSpy('fs').andCallFake(function(a,b,success,err) {
                err('no fs');
            });
            return fs.read('foo.txt').catch(function(err) {
                expect(logMock).toHaveBeenCalledWith('fail getting file system ');
                expect(err).toBe('no fs');
            });
        });
        it('should fail when there is an error in getting the directory',function() {
            DirectoryEntry.prototype.getDirectory = function(path,options,success,err) {
                err('no dir');
            };
            return fs.read('foo.txt').catch(function(err) {
                expect(logMock).toHaveBeenCalledWith('fail getting directory fllscoring');
                expect(err).toBe('no dir');
            });
        });
    });

    describe('writing',function() {
        it('should write a test file',function() {
            return fs.write('foo.txt','bar').then(function(data) {
                expect(FileWriter.instance.write).toHaveBeenCalledWith('bar');
            });
        });
        it('should fail when there is an error on writing',function() {
            window.requestFileSystem = jasmine.createSpy('fs').andCallFake(function(a,b,success,err) {
                err('no fs');
            });
            return fs.write('foo.txt','bar').catch(function(err) {
                expect(logMock).toHaveBeenCalledWith('fail getting file system ');
                expect(err).toBe('no fs');
            });
        });
    });

    describe('removing',function() {
        it('should remove a test file',function() {
            return fs.remove('foo.txt').then(function(data) {
                expect(FileEntry.instance.remove).toHaveBeenCalled();
            });
        });
    });
});
