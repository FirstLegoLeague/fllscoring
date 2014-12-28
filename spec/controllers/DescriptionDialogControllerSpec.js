describe('DescriptionDialogController',function() {

    var module = factory('controllers/DescriptionDialogController',{
        // 'services/log': logMock,
    });

    var $scope, controller, handshakeMock;

    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.inject(function($controller,$rootScope,$q) {
            $scope = $rootScope.$new();
            handshakeMock = createHandshakeMock();
            controller = $controller('DescriptionDialogController', {
                '$scope': $scope,
                '$handshake': handshakeMock
            });
        });
    });

    describe('handshake receive',function() {
        it('should set the mission and show the dialog',function() {
            var mission = {};
            handshakeMock.fire('showDescription',{},mission);
            expect($scope.mission).toEqual(mission);
            expect($scope.dialogVisible).toBe(true);
        });
    });

    describe('ok',function() {
        it('should hide the dialog',function() {
            $scope.dialogVisible = true;
            $scope.ok();
            expect($scope.dialogVisible).toBe(false);
        });
    });

    describe('cancel',function() {
        it('should hide the dialog',function() {
            $scope.dialogVisible = true;
            $scope.cancel();
            expect($scope.dialogVisible).toBe(false);
        });
    });
});
