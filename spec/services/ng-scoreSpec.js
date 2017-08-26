describe('ng-rankings',function() {
    var ngServices = factory('services/ng-services');
    var module = factory('services/ng-score',{
        'services/ng-services': ngServices
    });

    var $score;

    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.inject(["$score", function(_$score_) {
            $score = _$score_;
        }]);
    });

    describe('compare', function() {
        var score1, score2;

        beforeEach(function() {
            score1 = new $score({
                score: 150
            });
            score2 = new $score({
                score: 110
            })
        });

        it('returns 0 when comparing score with itself', function() {
            expect($score.compare(score1, score1)).toBe(0);
        });

        it('returns a negative result when comparing score with higher score', function() {
            expect($score.compare(score1, score2) < 0).toBe(true);
        });

        it('returns a positive result when comparing score with lower score', function() {
            expect($score.compare(score2, score1) > 0).toBe(true);
        });
    });

    describe('generateUniqueId', function() {
        var RANDOM_COEFICCIENT = 20;

        it(`can generate ${RANDOM_COEFICCIENT} unique ids`, function() {
            var arr = [];

            for(var i = 0; i < RANDOM_COEFICCIENT; i++) {
                arr.push($score.generateUniqueId());
            }

            for(var i = 0; i < arr.length; i++) {
                for(var j = 0; j < i; j++) {
                    expect(arr[i]).not.toBe(arr[j]);
                }
            }
        });

        it(`generates an id with length 8 every time out of ${RANDOM_COEFICCIENT}`, function() {
            for(var i = 0; i < RANDOM_COEFICCIENT; i++) {
                expect($score.generateUniqueId().length).toBe(8);
            }
        });
    });

    describe('santize', function() {
        var unsanitizedScore1, unsanitizedScore2;
        var sanitizedScore1, sanitizedScore2;

        beforeEach(function() {
            unsanitizedScore1 = {
                id: 'ade349b0',
                teamNumber: 143,
                stageId: 'anotherStageId',
                round: 2,
                score: 296,
                edited: 'Wed Nov 26 2014 21:11:43 GMT+0100 (CET)',
                table: 'red 1',
                published: true,
                otherProperty: 'other property value'
            };
            unsanitizedScore2 = {
                team: { number: 111 },
                stage: { id: 'qualification' },
                round: 1,
                score: 542,
                edited: 'Wed Nov 26 2014 21:11:43 GMT+0100 (CET)',
                table: 'blue 2'
            };
            sanitizedScore1 = $score.sanitize(unsanitizedScore1);
            sanitizedScore2 = $score.sanitize(unsanitizedScore2);
        });

        it('removes all redandent properties', function() {
            expect(sanitizedScore1.otherProperty).not.toBeDefined();
        });

        it('keeps the id property if it exists', function() {
            expect(sanitizedScore1.id).toBeDefined();
        });

        it('creates the id property if it doesn\'t exists', function() {
            expect(sanitizedScore2.id).toBeDefined();
        });

        it('keeps the teamNumber property if it exists', function() {
            expect(sanitizedScore1.teamNumber).toBeDefined();
        });

        it('creates the teamNumber property if there\'s only a team property', function() {
            expect(sanitizedScore2.teamNumber).toBeDefined();
        });

        it('keeps the stageId property if it exists', function() {
            expect(sanitizedScore1.stageId).toBeDefined();
        });

        it('creates the stageId property if there\'s only a stage property', function() {
            expect(sanitizedScore2.stageId).toBeDefined();
        });

        it('keeps the round property if it exists', function() {
            expect(sanitizedScore1.round).toBeDefined();
        });

        it('keeps the score property if it exists', function() {
            expect(sanitizedScore1.score).toBeDefined();
        });

        it('keeps the table property if it exists', function() {
            expect(sanitizedScore1.table).toBeDefined();
        });

        it('keeps the published property if it exists', function() {
            expect(sanitizedScore1.published).toBeDefined();
        });

        it('creates the published property it doesn\'t exists', function() {
            expect(sanitizedScore2.published).toBeDefined();
        });
    });

    describe('calcFilename', function() {
        var score;
        var filename;

        beforeEach(function() {
            score = new $score({
                id: '42cda0ib',
                stage: { id: 'qual' },
                round: 3,
                table: 'red 2',
                team: { number: 132 }
            });
            filename = 'score_qual_round3_tablered 2_team132_42cda0ib.json';
        });

        it('returns a correctly calculated filename', function() {
            expect(score.calcFilename()).toBe(filename);
        });

        it('save a correctly calculated filename in the score\'s file property', function() {
            score.calcFilename();
            expect(score.file).toBe(filename);
        });
    });

});
