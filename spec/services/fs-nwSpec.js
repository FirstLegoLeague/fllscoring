describe('fs-nw',function() {

    describe('store exists',function() {
        var fs = factory('services/fs-nw',{
            'q':Q,
            'idbstore': window.IDBStore
        },true);
        describe('reading',function() {
            it('should read a test file',function() {
                return fs.write('foo/foo.txt','jsfd978sd').then(function() {
                    return fs.read('foo/foo.txt');
                }).then(function(data) {
                    expect(data).toBe('jsfd978sd');
                }).then(function() {
                    return fs.remove('foo/foo.txt');
                });
            });
        });

        describe('writing',function() {
            it('should write a test file',function() {
                return fs.write('foo/foo.txt','jsfd978sd').then(function(data) {
                    expect(data).toBe('foo/foo.txt');
                }).then(function() {
                    return fs.remove('foo/foo.txt');
                });
            });
        });
    });

    describe('failure creating store',function() {
        var createError = new Error('cannot create store');
        var IDBStore = function(config) {
            config.onError(createError);
        };
        var fs = factory('services/fs-nw',{
            'q':Q,
            'idbstore': IDBStore
        },true);
        it('fail store cannot be created',function() {
            return fs.read('foo/quxmoo.txt').catch(function(err) {
                expect(err).toBe(createError);
            });
        });
    });

});
