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

    describe('export',function() {
        it('should generate CSV data and filenames',function() {
            expect($scope.csvname).toEqual({});
            expect($scope.csvdata).toEqual({});
            $scope.rebuildCSV({
                'qualifying': [
                    { rank: 1, team: { name: "foo", number: 123 }, highest: 10, scores: [0, 10, 5] },
                    { rank: 1, team: { name: "\"bar\"", number: 456 }, highest: 10, scores: [10, 0, 5] }
                ]
            });
            expect($scope.csvname["qualifying"]).toEqual("ranking_qualifying.csv");
            expect($scope.csvdata["qualifying"]).toEqual("data:text/csv;charset=utf-8," + encodeURIComponent([
                '"Rank","Team Number","Team Name","Highest","Round 1","Round 2","Round 3"',
                '"1","123","foo","10","0","10","5"',
                '"1","456","""bar""","10","10","0","5"',
            ].join("\r\n")));
        });
    });
});
