describe('settings', function() {

    var module = factory('views/settings', {
        'services/log': logMock
    });

    var $scope, controller;

    var settingsMock;

    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.inject(function($controller, $rootScope, $q) {
            $scope = $rootScope.$new();
            settingsMock = createSettingsMock($q, {});
            controller = $controller('settingsCtrl', {
                '$scope': $scope,
                '$stages': {},
                '$settings': settingsMock
            });
        });
    });

    describe('initialization', function() {
        it('should initialize', function() {
            //let $settings init
            $scope.$digest();
            expect($scope.settings).toEqual({});
        });

    });

    describe('missing settings.json on storage',function() {
        beforeEach(function() {
            fsMock.read = jasmine.createSpy('fsReadSpy').andCallFake(function() {
                return Q.reject(new Error('fake file-not-found for settings'));
            });
        });
        xit('should initialize in editmode when no teams found on storage', function() {
            //TODO: check state after reading
        });
    });

    describe('saving',function() {
        it('should write to the file system',function() {
            $scope.settings = 'data';
            $scope.save();
            expect(settingsMock.save).toHaveBeenCalledWith();
        });
    });
});
