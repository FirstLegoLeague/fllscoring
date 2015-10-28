describe('fs-xhr',function() {

    function createJQPromise(success) {
        return {
            done: function() {
                var p = Q.when(success);
                return p.then.apply(p,arguments);
            }
        };
    }

    var fakeJQuery = {
        get: jasmine.createSpy('jqget').andReturn(createJQPromise('get')),
        post: jasmine.createSpy('jqpost').andReturn(createJQPromise('post')),
        ajax: jasmine.createSpy('jqajax').andReturn(createJQPromise('ajax'))
    };

    var fs = factory('services/fs-xhr',{
        'q':Q,
        'jquery': fakeJQuery
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
                expect(data).toBe('get');
                expect(fakeJQuery.get).toHaveBeenCalledWith('fs/foo.txt');
            });
        });
        it('should fail on xhr exception',function() {
            fakeJQuery.get.andReturn(createJQPromise(Q.reject(new Error('foo'))));
            return fs.read('foo.txt').catch(function(err) {
                expect(fakeJQuery.get).toHaveBeenCalledWith('fs/foo.txt');
                expect(err.message).toBe('foo');
            });
        });
    });

    describe('writing',function() {
        it('should write a test file',function() {
            return fs.write('foo.txt','bar').then(function(data) {
                expect(fakeJQuery.post).toHaveBeenCalledWith('fs/foo.txt','bar');
                expect(data).toBe('post');
            });
        });
        it('should fail on xhr exception',function() {
            fakeJQuery.post.andReturn(createJQPromise(Q.reject(new Error('foo'))));
            return fs.write('foo.txt','bar').catch(function(err) {
                expect(fakeJQuery.post).toHaveBeenCalledWith('fs/foo.txt','bar');
                expect(err.message).toBe('foo');
            });
        });
    });

    describe('removing',function() {
        it('should remove a test file',function() {
            return fs.remove('foo.txt').then(function(data) {
                expect(fakeJQuery.ajax).toHaveBeenCalledWith('fs/foo.txt',{
                    type: 'DELETE'
                });
                expect(data).toBe('ajax');
            });
        });
        it('should fail on xhr exception',function() {
            fakeJQuery.ajax.andReturn(createJQPromise(Q.reject(new Error('foo'))));
            return fs.remove('foo.txt','bar').catch(function(err) {
                expect(fakeJQuery.ajax).toHaveBeenCalledWith('fs/foo.txt',{
                    type: 'DELETE'
                });
                expect(err.message).toBe('foo');
            });
        });
    });


});
