describe('ExportRankingDialogController',function() {

    var module = factory('controllers/ExportRankingDialogController',{
        'services/log': logMock,
        'services/fs': {},
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
            scoresMock = createScoresMock($q,fakeScoreboard);
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

    describe('exportScore',function() {
        it('should create a dataurl of export data',function() {
            $scope.exportScore({
                stage: {id: "1"},
                round: 3
            });
            expect($scope.stageselected).toEqual({id: "1"});
            expect($scope.export.rounds).toEqual([1,2,3]);
            expect($scope.filterscoreboard).toEqual(fakeScoreboard);

            $timeout.flush();

            expect($scope.exportname).toEqual('RoundResults.html');
            expect($scope.exportvisible).toBe(true);
            expect($scope.exportdata.substr(0,40)).toEqual('data:text/html;charset=utf-8,%3C!DOCTYPE')
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
