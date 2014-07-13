describe('fs-xhr',function() {

    var fs = factory('services/fs-xhr',{
        'q':Q
    });

    //mock xhr get
    fs._get = function(url) {
        return {
            done: function(cb) {
                cb(url);
                return {
                    fail: function(cb) {
                        //nothing
                    }
                };
            }
        };
    };

    //mock xhr post
    fs._post = function(url,data) {
        return {
            done: function(cb) {
                cb(url);
                return {
                    fail: function(cb) {
                        //nothing
                    }
                };
            }
        };
    };

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
