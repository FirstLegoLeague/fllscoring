describe('ranking', function() {

    var module = factory('views/ranking', {
        'services/log': logMock,
        'controllers/ExportRankingDialogController': factory('controllers/ExportRankingDialogController')
    });

    var $scope, controller;
    var dummyTeam = {
        number: '123',
        name: 'foo'
    };
    var fsMock, stagesMock, scoresMock, handshakeMock, messageMock;

    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.inject(function($controller, $rootScope,$q) {
            $scope = $rootScope.$new();
            scoresMock = createScoresMock($q);
            handshakeMock = createHandshakeMock($q);
            stagesMock = createStagesMock();
            messageMock = createMessageMock();
            controller = $controller('rankingCtrl', {
                '$scope': $scope,
                '$scores': scoresMock,
                '$stages': stagesMock,
                '$handshake': handshakeMock,
                '$message': messageMock
            });
        });
    });

    describe('initialization', function() {
        it('should initialize', function() {
            expect($scope.sort).toEqual('rank');
            expect($scope.rev).toEqual(false);
            expect($scope.csvdata).toEqual({});
            expect($scope.csvname).toEqual({});
        });
    });

    describe('exportRanking',function() {
        it('should emit a exportRanking handshake',function() {
            $scope.exportRanking();
            expect(handshakeMock.$emit).toHaveBeenCalledWith('exportRanking',{
                scores: $scope.scores,
                stages: $scope.stages
            });
        });
    });

    describe('doSort',function() {
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
        });
    });

    describe('sortIcon',function() {
        it('should give the up icon when col is sorted',function() {
            var stage = {
                sort: 'foo'
            };
            expect($scope.sortIcon(stage)).toEqual('');
            expect($scope.sortIcon(stage,'foo')).toEqual('icon-sort-up');
        });
        it('should give the up icon when col is sorted in reverse',function() {
            var stage = {
                sort: 'foo',
                rev: true
            };
            expect($scope.sortIcon(stage)).toEqual('');
            expect($scope.sortIcon(stage,'foo')).toEqual('icon-sort-down');
        });

        //default sort order stuff, needs a bit of refactoring
        it('should report a default sorting for any stage',function() {
            var stage = {};
            expect($scope.sortIcon(stage,'rank')).toEqual('icon-sort-up');
            $scope.rev = true;
            expect($scope.sortIcon(stage,'rank')).toEqual('icon-sort-down');
        });
    });

    describe('toggle',function() {
        it('should toggle the collapsed state of a stage',function() {
            var stage = {};
            $scope.toggle(stage);
            expect(stage.$collapsed).toBe(true);
            $scope.toggle(stage);
            expect(stage.$collapsed).toBe(false);
        });
    });

    describe('maxRounds',function() {
        it('should return the maximum rounds of all stages',function() {
            /* from stagesMock:
                var stages = [
                    { id: "practice", name: "Oefenrondes", rounds: 2, $rounds: [1, 2] },
                    { id: "qualifying", name: "Voorrondes", rounds: 3, $rounds: [1, 2, 3] },
                    { id: "quarter", name: "Kwart finales", rounds: 0, $rounds: [] },
                    { id: "semi", name: "Halve finales", rounds: 0, $rounds: [] },
                    { id: "final", name: "Finale", rounds: 1, $rounds: [1] },
                ];
            */
            expect($scope.maxRounds()).toBe(3);
        });
    });

    describe('emptyCols',function() {
        it('should return an array with the number of empty columns for a stage',function() {
            expect($scope.emptyCols(stagesMock.stages[0])).toEqual(Array(1));
            expect($scope.emptyCols(stagesMock.stages[1])).toEqual(Array());
            expect($scope.emptyCols(stagesMock.stages[2])).toEqual(Array(3));
            expect($scope.emptyCols(stagesMock.stages[3])).toEqual(Array(3));
            expect($scope.emptyCols(stagesMock.stages[4])).toEqual(Array(2));
        });
    });

    describe('rebuildCSV',function() {
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
        it('should not skip empty values, but include as empty string',function() {
            $scope.rebuildCSV({
                'qualifying': [
                    { team: { name: "foo", number: 123 }, highest: 10, scores: [0, 10, 5] },
                    { team: { name: "\"bar\"", number: 456 }, highest: 10, scores: [10, 0, 5] }
                ]
            });
            expect($scope.csvdata["qualifying"]).toEqual("data:text/csv;charset=utf-8," + encodeURIComponent([
                '"Rank","Team Number","Team Name","Highest","Round 1","Round 2","Round 3"',
                '"","123","foo","10","0","10","5"',
                '"","456","""bar""","10","10","0","5"',
            ].join("\r\n")));
        });
    });

    describe('scoreboard watcher',function() {
        it('should rebuild the csv when the scoreboard changes',function() {
            $scope.rebuildCSV = jasmine.createSpy('rebuildCSV');
            $scope.scoreboard = 'foo';
            $scope.$digest();
            expect($scope.rebuildCSV).toHaveBeenCalledWith(scoresMock.scoreboard);
        });
    });

    describe('getRoundLabel',function() {
        it('should create a label for rounds',function() {
            expect($scope.getRoundLabel(4)).toEqual('Round 4');
        });
    });
});
