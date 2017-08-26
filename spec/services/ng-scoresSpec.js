describe('ng-scores',function() {
    "use strict";
    var ngServices = factory('services/ng-services');
    var module = factory('services/ng-scores',{
        'services/ng-services': ngServices,
        'services/log': logMock
    });

    var $scores;
    var $score;
    var $q;

    var stagesMock = createStagesMock();
    var teamsMock = createTeamsMock([
        { number: 132 },
        { number: 2581 },
        { number: 445 }
    ]);
    var messageMock = createMessageMock();
    var independenceMock = createIndependenceMock();
    var rankingsMock = createRankingsMock();
    var validationMock = createValidationMock();
    var mockScore = {
        file: 'somescore.json',
        team: teamsMock.teams[0].number,
        stage: stagesMock.stages[0].id,
        round: 1,
        score: 150,
        originalScore: 150
    };

    var rawScore = {
        id: 'asd23d',
        file: 'somescore.json',
        teamNumber: teamsMock.teams[0].number,
        stageId: stagesMock.stages[0].id,
        round: 1,
        score: 150,
        originalScore: 150,
        published: false,
        edited: undefined,
        table: undefined
    };

    var mockScores = { version: 2, scores: [rawScore] };

    var fsMock= createFsMock({
        "scores.json": mockScores,
    });

    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.module(function($provide) {
            $provide.value('$fs', fsMock);
            $provide.value('$stages', stagesMock);
            $provide.value('$teams', teamsMock);
            $provide.value('$message', messageMock);
            $provide.value('$independence', independenceMock);
            $provide.value('$rankings', rankingsMock);
            $provide.value('$validation', validationMock);
        });
        angular.mock.inject(["$scores", "$score", "$q", function(_$scores_, _$score_,_$q_) {
            $scores = _$scores_;
            $score = _$score_;
            $q = _$q_;
        }]);
    });

    // Strip autogenerated properties to (hopefully ;)) arrive at the same
    // object as what was used as input to $scores.add().
    function filteredScores() {
        return $scores.scores.map(function(score) {
            return {
                file: score.file,
                team: score.teamNumber,
                stage: score.stageId,
                round: score.round,
                score: score.score,
                originalScore: score.originalScore
            };
        });
    }

    describe('clear',function() {
        it('should clear the scores',function() {
            $scores.load().then(function() {
                expect(filteredScores()).toEqual([mockScore]);
                $scores.clear();
                expect(filteredScores()).toEqual([]);
            });
        });
    });

    describe('load',function() {
        it('should load from scores.json',function() {
            return $scores.load().then(function() {
                expect(fsMock.read).toHaveBeenCalledWith('scores.json');
            });
        });

        it('should log an error if loading fails',function() {
            fsMock.read.and.returnValue(Q.reject('read err'));
            return $scores.load().then(function() {
                expect(logMock).toHaveBeenCalledWith('scores read error','read err');
            });
        });

        it('is called when recieving a load message', function(){
            $scores.load = jasmine.createSpy('scoresLoad');
            messageMock.mockSend('scores:reload');
            expect($scores.load).toHaveBeenCalled();
        });

        it('can accept backwards compatiale response', function(){
            $scores.load([rawScore]);
            expect($scores.scores.length).toBe(1);
        });

        it('throws an error if it revcieves an unkown version', function(){
            expect(() => $scores.load({ version: 3 })).toThrow(new Error('unknown scores version 3, (expected 2)'));
        });
    });

    describe('_update',function() {
        it('throws an error if endupdate is called before beginupdate', function() {
            expect(() => $scores.endupdate()).toThrow(new Error('beginupdate()/endupdate() calls mismatched'));
        });

        it('doesn\'t run if currently updating', function() {
            $scores.getRankings = jasmine.createSpy('getRankingsSpy').and.returnValue(Q.when());
            $scores._updating = 1;
            $scores._update();
            expect($scores.getRankings).not.toHaveBeenCalled()
        });
    });

    describe('acceptScores', function() {
        beforeEach(function() {
            $scores.load = jasmine.createSpy('loadSpy');
        });

        it('loads the new data', function() {
            $scores.acceptScores({ data: mockScores });
            expect($scores.load).toHaveBeenCalledWith(mockScores);
        });

        it('sends the reload message', function() {
            $scores.acceptScores([mockScore]);
            expect(messageMock.send).toHaveBeenCalledWith('scores:reload');
        });
    });

    describe('create', function() {
        it('calls ng-independence act', function() {
            $scores.create({ scoreEntry: {} });
            expect(independenceMock.act).toHaveBeenCalled();
        });

        it('adds a score to scores upon failure', function() {
            var inititalLength = $scores.scores.length;
            independenceMock.act = jasmine.createSpy('independenceAct').and.callFake(function(key, url, data, fallback) {
                fallback();
                return new Promise(function(res, rej) {
                    res();
                });
            });
            $scores.create({ scoreEntry: {} }).then(function() {
                expect($scores.scores.length - inititalLength).toBe(1);
            });
        });
    });

    describe('delete', function() {
        it('calls ng-independence act', function() {
            $scores.delete({ id: 'asdfg' });
            expect(independenceMock.act).toHaveBeenCalled();
        });

        it('removes a score from scores upon failure', function() {
            var inititalLength = $scores.scores.length;
            independenceMock.act = jasmine.createSpy('independenceAct').and.callFake(function(key, url, data, fallback) {
                fallback();
                return new Promise(function(res, rej) {
                    res();
                });
            });
            $scores.delete({ id: 'asd23d' }).then(function() {
                expect(inititalLength - $scores.scores.length).toBe(1);
            });
        });
    });

    describe('update', function() {
        it('calls ng-independence act', function() {
            $scores.update({ id: 'asdfg' });
            expect(independenceMock.act).toHaveBeenCalled();
        });

        it('updates a score in scores upon failure', function() {
            var newScore = { id: 'asdfg' };
            independenceMock.act = jasmine.createSpy('independenceAct').and.callFake(function(key, url, data, fallback) {
                fallback();
                return new Promise(function(res, rej) {
                    res();
                });
            });
            $scores.update(newScore).then(function() {
                expect($scores.scores.filter(score => score.id === newScore.id)).toBe(newScore);
            });
        });
    });

    describe('getRankings',function() {
        it('calls ng-validation validate', function() {
            $scores.getRankings();
            expect(validationMock.validate).toHaveBeenCalled();
        });

        it('calls ng-rankings calculate if there are no errors', function() {
            $scores.getRankings();
            expect(rankingsMock.calculate).toHaveBeenCalled();
        });

        it('doesn\'t calls ng-rankings calculate if there are errors', function() {
            validationMock.validate = jasmine.createSpy('validation').and.returnValue([{ name: 'DuplicateScoreError' }]);
            rankingsMock.calculate = jasmine.createSpy('calculate');
            $scores.getRankings();
            expect($scores.validationErrors.length).toBe(1);
            expect(rankingsMock.calculate).not.toHaveBeenCalled();
        });
    });

    describe('pendingActions',function() {
        it('calls ng-independence pendingActions', function() {
            $scores.pendingActions();
            expect(independenceMock.pendingActions).toHaveBeenCalled();
        });
    });

});
