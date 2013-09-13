//mock process and nodeRequire
var global = this;
global.process = {
    cwd: function() {
        return 'foo';
    },
    umask: function() {
        return 0777;
    }
};
global.nodeRequire = function(module) {
    switch (module) {
        case 'fs': return {
            readFile: function(path,config,cb) {
                cb(null,path);
            },
            writeFile: function(path,data,cb) {
                cb(null,path);
            },
            mkdir: function(p,mode,cb) {
                cb();
            },
            stat: function(p,cb) {
                cb(null,{
                    isDirectory: true
                });
            },
        };
        case 'path': return {
            dirname: function(path) {
                return 'dir';
            },
            resolve: function(path) {
                return path;
            }
        };
    }
};

define(['services/fs-nw'],function(fs) {
    describe('fs signature',function() {
        it('should have a read method',function() {
            expect(fs.read).not.toBeUndefined();
        });
    });

    describe('reading',function() {
        it('should read a test file',function(done) {
            fs.read('foo.txt').then(function(data) {
                expect(data).toBe('foo/foo.txt');
            }).fail(function(data) {
                console.log('fail',data);
            }).then(function() {
                done();
            });
        });
    });

    describe('writing',function() {
        it('should write a test file',function(done) {
            fs.write('foo.txt').then(function(data) {
                expect(data).toBe('foo/foo.txt');
            }).fail(function(data) {
                console.log('fail',data);
            }).then(function() {
                done();
            });
        });
    });
});
