describe('ng-fs',function() {
    var fsMock = createFsMock({'foo': '"dummydata"'});
    var module = factory('services/ng-fs',{
        'services/fs': fsMock
    });

    var $fs

    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.inject(['$fs',function(fs) {
            $fs = fs;
        }])
    });

    describe('reading',function() {
        it('should return the parsed read data',function(done) {
            $fs.read('foo').then(function(res) {
                expect(res).toEqual('dummydata');
                done();
            });
        });
    });

    describe('writing',function() {
        it('should call the write spy and append a line end',function(done) {
            $fs.write('filename','lalal').then(function() {
                expect(fsMock.write).toHaveBeenCalledWith('filename','"lalal"\n');
                done();
            });
        })
    });
});
