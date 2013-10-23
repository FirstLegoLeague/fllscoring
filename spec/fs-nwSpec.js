define(['injector'],function(Injector) {
    var injector = new Injector();

    return injector.require(['services/fs-nw'],function(fs) {
        describe('test',function() {
            it('should pass',function() {
                expect(true).toBe(true);
            });
        });

        describe('fs signature',function() {
            it('should have a read method',function() {
                expect(fs.read).not.toBeUndefined();
            });
        });

        describe('reading',function() {
            it('should read a test file',function(done) {
                fs.write('foo/foo.txt','jsfd978sd').then(function() {
                    return fs.read('foo/foo.txt');
                }).then(function(data) {
                    expect(data).toBe('jsfd978sd');
                }).fail(function(data) {
                    console.log('fail',data);
                }).then(function() {
                    fs.remove('foo/foo.txt').then(done);
                });
            });
        });

        describe('writing',function() {
            it('should write a test file',function(done) {
                fs.write('foo/foo.txt','jsfd978sd').then(function(data) {
                    expect(data).toBe('foo/foo.txt');
                }).fail(function(data) {
                    console.log('fail',data);
                }).then(function() {
                    fs.remove('foo/foo.txt').then(done);
                });
            });
        });
    });
});
