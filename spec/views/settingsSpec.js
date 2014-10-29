describe('settings', function() {

    var module = factory('views/settings', {
        'services/log': logMock
    });

    var $scope, controller;

    var fsMock = createFsMock({'settings.json': {}});

    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.inject(function($controller, $rootScope) {
            $scope = $rootScope.$new();
            controller = $controller('settingsCtrl', {
                '$scope': $scope,
                '$fs': fsMock
            });
        });
    });

    describe('initialization', function() {
        it('should initialize', function() {
            //TODO: check state after reading
        });

    });

    describe('missing settings.json on storage',function() {
        beforeEach(function() {
            fsMock.read = jasmine.createSpy('fsReadSpy').andCallFake(function() {
                return Q.reject(new Error('fake file-not-found for settings'));
            });
        })
        xit('should initialize in editmode when no teams found on storage', function() {
            //TODO: check state after reading
        });
    });

    describe('saving',function() {
        it('should write to the file system',function() {
            $scope.settings = 'data';
            $scope.save();
            expect(fsMock.write).toHaveBeenCalledWith('settings.json','data');
        });
    });
});
