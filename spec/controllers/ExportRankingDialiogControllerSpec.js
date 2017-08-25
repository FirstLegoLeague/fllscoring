describe('ExportRankingDialogController',function() {

    var module = factory('controllers/ExportRankingDialogController',{
        'services/log': logMock,
    });

    var $scope, $timeout, stagesMock, scoresMock, handshakeMock;
    var fakeScoreboard = {
        "1": [1,2,3,4]
    };

    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.inject(function($controller,$rootScope,$q,_$timeout_) {
            $scope = $rootScope.$new();
            $timeout = _$timeout_;
            scoresMock = createScoresMock(fakeScoreboard);
            handshakeMock = createHandshakeMock($q);
            stagesMock = createStagesMock();
            controller = $controller('ExportRankingDialogController', {
                '$scope': $scope,
                '$scores': scoresMock,
                '$stages': stagesMock,
                '$handshake': handshakeMock,
                '$document': [{
                    getElementById: function() {
                        return {
                            innerHTML: '<fakeHTML></fakeHTML>'
                        }
                    }
                }]
            });
        });
    });

    describe('initialization',function() {
        it('should setup a scores config',function() {
            expect($scope.export).toEqual({
                prevRounds: true,
                flowAmount: 10,
                fixedShownTop: 3,
                timeForFrame1: 10,
                timeThroughFrames: 10,
                fadeAtOneGo: 7
            });
        });
    });

    describe('handshake receive',function() {
        it('should show the dialog',function() {
            handshakeMock.fire('exportRanking',{},{

            });
            expect($scope.dialogVisible).toBe(true);
        });
    });

    describe('cancel',function() {
        it('should hide the dialog',function() {
            handshakeMock.fire('exportRanking',{},{});
            $scope.dialogVisible = true;
            $scope.cancel();
            expect($scope.dialogVisible).toBe(false);
            expect(handshakeMock.getPromise().resolve).toHaveBeenCalled();
        });
    });

    describe('getRoundLabel',function() {
        it('should create a label for rounds',function() {
            expect($scope.getRoundLabel(4)).toEqual('Round 4');
        });
    });
});
