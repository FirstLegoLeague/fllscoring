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
    var fsMock, stagesMock, scoresMock, handshakeMock, messageMock, settingsMock;

    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.inject(function($controller, $rootScope,$q) {
            $scope = $rootScope.$new();
            scoresMock = createScoresMock($q);
            handshakeMock = createHandshakeMock($q);
            stagesMock = createStagesMock($q);
            messageMock = createMessageMock();
            var settings = {};
            settings.lineStartString = "\"";
            settings.lineEndString = "\"";
            settings.separatorString = "\",\"";
            settingsMock = createSettingsMock($q, settings);
            controller = $controller('rankingCtrl', {
                '$scope': $scope,
                '$scores': scoresMock,
                '$stages': stagesMock,
                '$handshake': handshakeMock,
                '$message': messageMock,
                '$settings': settingsMock,
            });
        });
        $scope.$digest();//resolves all init promises, etc.
    });

    describe('initialization', function() {
        it('should initialize', function() {
            expect($scope.sort).toEqual('rank');
            expect($scope.rev).toEqual(false);
            expect($scope.exportFiles).toEqual({});
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
            expect($scope.sortIcon(stage,'foo')).toEqual('arrow_drop_up');
        });
        it('should give the up icon when col is sorted in reverse',function() {
            var stage = {
                sort: 'foo',
                rev: true
            };
            expect($scope.sortIcon(stage)).toEqual('');
            expect($scope.sortIcon(stage,'foo')).toEqual('arrow_drop_down');
        });

        //default sort order stuff, needs a bit of refactoring
        it('should report a default sorting for any stage',function() {
            var stage = {};
            expect($scope.sortIcon(stage,'rank')).toEqual('arrow_drop_up');
            $scope.rev = true;
            expect($scope.sortIcon(stage,'rank')).toEqual('arrow_drop_down');
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

    describe('buildExportFiles',function() {
        it('should generate export files',function() {
            expect($scope.exportFiles).toEqual({});

            $scope.scoreboard = {
                'qualifying': [
                    { rank: 1, team: { name: "foo", number: 123 }, highest: 10, scores: [0, 10, 5] },
                    { rank: 1, team: { name: "\"bar\"", number: 456 }, highest: 10, scores: [10, 0, 5] }
                ]
            };
            $scope.buildExportFiles();
            expect($scope.exportFiles["qualifying"]).toEqual("data:text/csv;charset=utf-8," + encodeURIComponent([
                '"1","123","foo","10","0","10","5"',
                '"1","456",""bar"","10","10","0","5"', //new format doesn't replace every quotation mark with two
            ].join("\r\n").concat("\r\n")));//new format ends in a newline
        });
        it('should not skip empty values, but include as empty string',function() {
            $scope.scoreboard = {
                'qualifying': [
                    { team: { name: "foo", number: 123 }, highest: 10, scores: [0, 10, 5] },
                    { team: { name: "\"bar\"", number: 456 }, highest: 10, scores: [10, 0, 5] }
                ]
            };
            $scope.$digest();
            expect($scope.exportFiles["qualifying"]).toEqual("data:text/csv;charset=utf-8," + encodeURIComponent([
                '"","123","foo","10","0","10","5"',
                '"","456",""bar"","10","10","0","5"', //new format doesn't replace every quotation mark with two
            ].join("\r\n").concat("\r\n")));//new format ends in a newline
        });
    });

    describe('scoreboard watcher',function() {
        it('should rebuild the export files when the scoreboard changes',function() {
            $scope.buildExportFiles = jasmine.createSpy('buildExportFiles');
            $scope.scoreboard = 'foo';
            $scope.$digest();
            expect($scope.buildExportFiles).toHaveBeenCalled();
        });
    });

    describe('settings watcher', function () {
        it('should rebuild the export files when the relevant settings change', function () {
            $scope.buildExportFiles = jasmine.createSpy('buildExportFiles');
            settingsMock.settings.lineStartString = "fo";
            $scope.$digest();
            expect($scope.buildExportFiles).toHaveBeenCalled();
            settingsMock.settings.separatorString = "fo";
            $scope.$digest();
            expect($scope.buildExportFiles).toHaveBeenCalled();
            settingsMock.settings.lineEndString = "fo";
            $scope.$digest();
            expect($scope.buildExportFiles).toHaveBeenCalled();
        });
    });

    describe('getRoundLabel',function() {
        it('should create a label for rounds',function() {
            expect($scope.getRoundLabel(4)).toEqual('Round 4');
        });
    });
});
