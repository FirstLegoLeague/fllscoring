describe('TeamDialogController',function() {

    var module = factory('controllers/TeamDialogController',{
        'services/log': logMock,
    });

    var $scope, controller, handshakeMock;

    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.inject(function($controller,$rootScope,$q) {
            $scope = $rootScope.$new();
            handshakeMock = createHandshakeMock($q);
            controller = $controller('TeamDialogController', {
                '$scope': $scope,
                '$handshake': handshakeMock
            });
        });
    });

    describe('handshake receive',function() {
        it('should set the mission and show the dialog',function() {
            var teams = [];
            handshakeMock.fire('chooseTeam',{},teams);
            expect($scope.teams).toEqual(teams);
            expect($scope.dialogVisible).toBe(true);
        });
    });

    describe('selectTeamPop ',function() {
        it('should hide the dialog',function() {
            handshakeMock.fire('chooseTeam',{},[]);
            $scope.dialogVisible = true;
            $scope.selectTeamPop('foo');
            expect($scope.dialogVisible).toBe(false);
            expect(handshakeMock.getPromise().resolve).toHaveBeenCalledWith({
                team: 'foo',
            });
        });
    });

    describe('cancel',function() {
        it('should hide the dialog',function() {
            handshakeMock.fire('chooseTeam',{},[]);
            $scope.dialogVisible = true;
            $scope.cancel();
            expect($scope.dialogVisible).toBe(false);
            expect(handshakeMock.getPromise().resolve).toHaveBeenCalled();
        });
    });
});
