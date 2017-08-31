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
            teamsMock = createTeamsMock([
                {number: 132},
                {number: 2581},
                {number: 445}
            ]);
            stagesMock = createStagesMock();
            controller = $controller('scoresCtrl', {
                '$scope': $scope,
                '$scores': scoresMock,
                '$teams': teamsMock,
                '$stages': stagesMock,
            });
        });
        $window.alert = jasmine.createSpy('alertSpy');
        $scope.$digest();//resolve all initialization promises
    });

    describe('initialization', function() {
        it('should initialize', function() {
            expect($scope.sort).toEqual('index');
            expect($scope.rev).toEqual(true);
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
            var score = { id: 'afg1jkhg' };
            $scope.deleteScore(score);
            expect(scoresMock.delete).toHaveBeenCalledWith(score);
        });
    });

    describe('editScore',function() {
        it('should edit a score',function() {
            var score = { id: 'afg1jkhg' };
            $scope.editScore(score);
            expect(score.$editing).toBe(true);
        });
    });

    describe('publishScore',function() {
        it('should publish a score and save it',function() {
            var id = 'afg1jkhg';
            $scope.publishScore({ id: id });
            expect(scoresMock.update).toHaveBeenCalledWith({ id: id, published: true});
        });
    });

    describe('unpublishScore',function() {
        it('should unpublish a score and save it',function() {
            var id = 'afg1jkhg';
            $scope.unpublishScore({ id: id });
            expect(scoresMock.update).toHaveBeenCalledWith({ id: id, published: false });
        });
    });

    describe('finishEditScore',function() {
        it('should call update and save',function() {
            var score = { id: 'afg1jkhg' };
            $scope.editScore(score);
            $scope.finishEditScore(score);
            expect(scoresMock.update).toHaveBeenCalledWith({ id: 'afg1jkhg', $editing: false });
        });
        it('should alert if an error is thrown from scores',function() {
            scoresMock.update.and.throwError('update error');
            var score = { id: 'afg1jkhg' };
            $scope.editScore(score);
            $scope.finishEditScore(score);
            expect($window.alert).toHaveBeenCalledWith('Error updating score: Error: update error');
        });
    });

    describe('cancelEditScore',function() {
        it('should cancel the score edit scores',function() {
            var score = { id: 'afg1jkhg' };
            $scope.editScore(score);
            $scope.cancelEditScore(score);
            expect(score.$editing).toBe(false);
        });
    });

    describe('sortIcon',function() {
        it('should give the up icon when col is sorted',function() {
            $scope.sort = 'foo';
            expect($scope.sortIcon('bla')).toEqual('');
            expect($scope.sortIcon('foo')).toEqual('arrow_drop_down');
        });
        it('should give the up icon when col is sorted in reverse', function () {
            $scope.sort = 'foo';
            $scope.rev = true;
            expect($scope.sortIcon('bla')).toEqual('');
            expect($scope.sortIcon('foo')).toEqual('arrow_drop_down');
        });

        //default sort order stuff, needs a bit of refactoring
        it('should report a default sorting for any stage',function() {
            expect($scope.sortIcon('index')).toEqual('arrow_drop_down');
            $scope.rev = false;
            expect($scope.sortIcon('index')).toEqual('arrow_drop_up');
        });
    });
});
