describe('scores', function() {

    var module = factory('views/scores', {
        'services/log': logMock
    });

    var $scope, controller, scoresMock, teamsMock, stagesMock,$window,$q;

    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.inject(function($controller, $rootScope,_$window_,_$q_) {
            $scope = $rootScope.$new();
            $window = _$window_;
            $q = _$q_;
            scoresMock = createScoresMock();
            teamsMock = createTeamsMock();
            stagesMock = createStagesMock();
            controller = $controller('scoresCtrl', {
                '$scope': $scope,
                '$scores': scoresMock,
                '$teams': teamsMock,
                '$stages': stagesMock,
            });
        });
        $window.alert = jasmine.createSpy('alertSpy');
    });

    describe('initialization', function() {
        it('should initialize', function() {
            expect($scope.sort).toEqual('index');
            expect($scope.rev).toEqual(true);
            expect($scope.scores).toEqual(scoresMock.scores);
        });
    });

    describe('doSort',function() {
        it('should set toggle sort on an already sorted column',function() {
            $scope.doSort('index');
            expect($scope.rev).toBe(false);
            expect($scope.sort).toBe('index');
            $scope.doSort('index');
            expect($scope.rev).toBe(true);
            expect($scope.sort).toBe('index');
        });

        it('should the sort with rev false when no default given when a different column is sorted',function() {
            $scope.doSort('foo');
            expect($scope.rev).toBe(false);
            expect($scope.sort).toBe('foo');
        });

        it('should the sort with rev to the given default when a different column is sorted',function() {
            $scope.doSort('foo',true);
            expect($scope.rev).toBe(true);
            expect($scope.sort).toBe('foo');
        });
    });

    describe('removeScore',function() {
        it('should remove a score',function() {
            let score = $scope.scores[0];
            $scope.removeScore(score);
            expect(scoresMock.delete).toHaveBeenCalledWith(score);
        });
    });

    describe('editScore',function() {
        it('should edit a score',function() {
            let score = $scope.scores[0];
            $scope.editScore(score);
            expect(score.$editing).toBe(true);
        });
    });

    describe('publishScore',function() {
        it('should publish a score and save it',function() {
            let score = $scope.scores[0];
            $scope.publishScore(score);
            expect(score.published).toBe(true);
            expect(scoresMock.update).toHaveBeenCalledWith(score);
        });
    });

    describe('unpublishScore',function() {
        it('should unpublish a score and save it',function() {
            let score = $scope.scores[0];
            $scope.unpublishScore(score);
            expect(score.published).toBe(false);
            expect(scoresMock.update).toHaveBeenCalledWith(score);
        });
    });

    describe('finishEditScore',function() {
        it('should call update and save',function() {
            let score = $scope.scores[0];
            $scope.editScore(score);
            $scope.finishEditScore(score);
            expect(scoresMock.update).toHaveBeenCalledWith(score);
        });
        it('should alert if an error is thrown from scores',function() {
            scoresMock.update.and.throwError('update error');
            let score = $scope.scores[0];
            $scope.editScore(score);
            $scope.finishEditScore(score);
            expect($window.alert).toHaveBeenCalledWith('Error updating score: Error: update error');
        });
    });

    describe('cancelEditScore',function() {
        it('should call _update to reset the scores',function() {
            let score = $scope.scores[0];
            $scope.editScore(score);
            $scope.cancelEditScore(score);
            expect(score.$editing).toBe(false);
            expect(scoresMock._update).toHaveBeenCalled();
        });
    });

});
