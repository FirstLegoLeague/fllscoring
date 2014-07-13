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
                '$scores': scoresMock,
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
            $scope.doSort('foo',false);
            expect($scope.sort).toEqual('foo');
            expect($scope.rev).toEqual(false);
            $scope.doSort('bar',true);
            expect($scope.sort).toEqual('bar');
            expect($scope.rev).toEqual(true);
        });

        it('should toggle the sort when column is already sorted',function() {
            $scope.sort = 'foo';
            $scope.rev = true;
            $scope.doSort('foo',true);
            expect($scope.sort).toEqual('foo');
            expect($scope.rev).toEqual(false);
            $scope.doSort('foo',true);
            expect($scope.sort).toEqual('foo');
            expect($scope.rev).toEqual(true);
        })
    });

});
