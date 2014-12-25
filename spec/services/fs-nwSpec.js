describe('fs-nw',function() {

    describe('store exists',function() {
        var fs = factory('services/fs-nw',{
            'q':Q,
            'idbstore': window.IDBStore
        },true);
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

    describe('failure creating store',function() {
        var IDBStore = function(config) {
            console.log('idbstore');
            config.onError('cannot create store');
        };
        var fs = factory('services/fs-nw',{
            'q':Q,
            'idbstore': IDBStore
        },true);
        it('fail store cannot be created',function() {
            return fs.read('foo/quxmoo.txt').fail(function(err) {
                console.log('foo');
                expect(err).toBe('cannot create store');
            });
        });
    });

});
