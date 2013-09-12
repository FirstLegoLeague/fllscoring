define(['services/fs-nw'],function(fs) {

    //mock fs
    fs._fs = function() {
        return {
            readFile: function(path,cb) {
                cb(null,path);
            },
            writeFile: function(path,data,cb) {
                cb(null,path);
            }
        };
    };

    describe('fs signature',function() {
        it('should have a read method',function() {
            expect(fs.read).not.toBeUndefined();
        });
    });

    describe('reading',function() {
        it('should read a test file',function(done) {
            fs.read('foo.txt').then(function(data) {
                expect(data).toBe('/fs/foo.txt');
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
                expect(data).toBe('/fs/foo.txt');
            }).fail(function(data) {
                console.log('fail',data);
            }).then(function() {
                done();
            });
        });
    });
});
