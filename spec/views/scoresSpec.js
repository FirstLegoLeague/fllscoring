describe('ranking', function() {

    var module = factory('views/scores', {
        'services/log': logMock
    });

    var $scope, controller;
    var dummyScores = {
        scores: [{
            score: 1
        },{
            score: 2
        }],
        remove: jasmine.createSpy('scoreRemoveSpy')
    };

    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.inject(function($controller, $rootScope) {
            $scope = $rootScope.$new();
            controller = $controller('scoresCtrl', {
                '$scope': $scope,
                '$scores': dummyScores
            });
        });
    });

    describe('initialization', function() {
        it('should initialize', function() {
            expect($scope.sort).toEqual('index');
            expect($scope.rev).toEqual(true);
            expect($scope.scores).toEqual(dummyScores.scores);
        });
    });

    describe('amending scores',function() {
        it('should remove a score',function() {
            $scope.removeScore(1);
            expect(dummyScores.remove).toHaveBeenCalledWith(1);
        });

        it('should edit a score',function() {
            var newScore = {score:4};
            $scope.editScore(1,newScore);
            expect($scope.scores[1]).toEqual(newScore);
        });
    });
});
