describe('ranking', function() {

    var module = factory('views/ranking', {
        'services/log': logMock
    });

    var $scope, controller;
    var dummyTeam = {
        number: '123',
        name: 'foo'
    };
    var fsMock;

    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.inject(function($controller, $rootScope) {
            $scope = $rootScope.$new();
            controller = $controller('rankingCtrl', {
                '$scope': $scope,
                '$scores': createScoresMock(),
                '$stages': stagesMock,
            });
        });
    });

    describe('initialization', function() {
        it('should initialize', function() {
            expect($scope.sort).toEqual('rank');
            expect($scope.rev).toEqual(false);
        });
    });

    describe('sorting',function() {
        it('should sort on the given direction when the column is not sorted',function() {
            var stage = {};
            $scope.doSort(stage, 'foo',false);
            expect(stage.sort).toEqual('foo');
            expect(stage.rev).toEqual(false);
            $scope.doSort(stage, 'bar',true);
            expect(stage.sort).toEqual('bar');
            expect(stage.rev).toEqual(true);
        });

        it('should toggle the sort when column is already sorted',function() {
            var stage = {};
            stage.sort = 'foo';
            stage.rev = true;
            $scope.doSort(stage, 'foo',true);
            expect(stage.sort).toEqual('foo');
            expect(stage.rev).toEqual(false);
            $scope.doSort(stage, 'foo',true);
            expect(stage.sort).toEqual('foo');
            expect(stage.rev).toEqual(true);
        })
    });

});
