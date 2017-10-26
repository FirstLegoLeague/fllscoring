describe('RoundDialogController',function() {

    var module;
    var $scope, controller, handshakeMock;

    beforeEach(function() {
        module = factory('controllers/RoundDialogController',{
            'services/log': logMock,
        });
        angular.mock.module(module.name);
        angular.mock.inject(function($controller,$rootScope,$q) {
            $scope = $rootScope.$new();
            handshakeMock = createHandshakeMock($q);
            controller = $controller('RoundDialogController', {
                '$scope': $scope,
                '$handshake': handshakeMock
            });
        });
    });

    describe('handshake receive',function() {
        it('should set the mission and show the dialog',function() {
            var stages = [];
            handshakeMock.fire('chooseRound',{},stages);
            expect($scope.stages).toEqual(stages);
            expect($scope.dialogVisible).toBe(true);
        });
    });

    describe('getNumber',function() {
        it('should return an array with the specified length',function() {
            var a = $scope.getNumber(2);
            expect(a.length).toBe(2);
            expect(a instanceof Array).toBe(true);
        });
    });

    describe('ok',function() {
        it('should hide the dialog',function() {
            handshakeMock.fire('chooseRound',{},[]);
            $scope.dialogVisible = true;
            $scope.selectRoundPop('foo','bar');
            expect($scope.dialogVisible).toBe(false);
            expect(handshakeMock.getPromise().resolve).toHaveBeenCalledWith({
                stage: 'foo',
                round: 'bar'
            });
        });
    });

    describe('cancel',function() {
        it('should hide the dialog',function() {
            handshakeMock.fire('chooseRound',{},[]);
            $scope.dialogVisible = true;
            $scope.cancel();
            expect($scope.dialogVisible).toBe(false);
            expect(handshakeMock.getPromise().resolve).toHaveBeenCalled();
        });
    });
});
