"use strict";

describe('async beforeEach()',function() {
    var beforeEachReady = false;
    var itReady = false;

    beforeEach(function(done) {
        function ready() {
            beforeEachReady = true;
            done();
        }
        setTimeout(ready, 0);
    });

    it('should not call it() until beforeEach() is ready', function(done) {
        expect(beforeEachReady).toEqual(true);
        function ready() {
            itReady = true;
            done();
        }
        setTimeout(ready, 0);
    });

    it('should wait before previous it() is ready', function() {
        expect(itReady).toEqual(true);
    });

});

describe('promises', function() {
    var $q;
    var beforeEachReady = false;
    var itReady = false;

    beforeEach(function() {
        angular.mock.inject(["$q", function(_$q_) {
            $q = _$q_;
        }]);
    });

    beforeEach(function() {
        var d = $q.defer();
        function ready() {
            beforeEachReady = true;
            d.resolve();
        }
        setTimeout(ready, 0);
        return d.promise;
    });

    it('should wait for returned promises from beforeEach() to be resolved', function() {
        expect(beforeEachReady).toEqual(true);
        var d = $q.defer();
        function ready() {
            itReady = true;
            d.resolve();
        }
        setTimeout(ready, 0);
        return d.promise;
    });

    it('should wait for returned promises from it() to be resolved', function() {
        expect(itReady).toEqual(true);
    });

    it('should resolve promises asynchronously and not fail with a timeout', function(done) {
        var d = $q.defer();
        var p = d.promise;
        var resolved = false;
        var thenCalled = false;
        p.then(function() {
            expect(resolved).toEqual(true);
            thenCalled = true;
            done();
        });
        expect(thenCalled).toEqual(false);
        d.resolve();
        resolved = true;
        expect(thenCalled).toEqual(false);
    });
});
