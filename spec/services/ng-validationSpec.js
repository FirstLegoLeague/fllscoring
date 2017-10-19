describe('ng-validation',function() {
    var ngServices = factory('services/ng-services');
    var module = factory('services/ng-validation',{
        'services/ng-services': ngServices
    });

    var $validation;
    var $score;
    var teamsMock = createTeamsMock([
    { number: 132 },
    { number: 221 },
    { number: 10 },
    { number: 32 }
    ]);
    var stagesMock = createStagesMock();
    var serverlogMock = createServerlogMock();

    var unknownStageId = 'super practice';
    var unkownRound = 10;
    var unknownTeamNumber = 143;
    var invalidScore = "invalid score";

    var legalScores, unknownStageScore, unkownRoundScore, invalidScoreScore, unknownTeamScore, duplicateScore;

    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.module(function($provide) {
            $provide.value('$teams', teamsMock);
            $provide.value('$stages', stagesMock);
            $provide.value('$serverlog', serverlogMock);
        });
        angular.mock.inject(["$validation","$score", function(_$validation_, _$score_) {
            $validation = _$validation_;
            $score = _$score_;
        }]);

        legalScore = new $score({
            stage: stagesMock.stages[0],
            round: 1,
            team: teamsMock.teams[0],
            score: 231
        });

        unknownStageScore = new $score({
            stageId: unknownStageId,
            round: 1,
            team: teamsMock.teams[0],
            score: 231
        });

        unkownRoundScore = new $score({
            stage: stagesMock.stages[0],
            round: unkownRound,
            team: teamsMock.teams[0],
            score: 231
        });

        invalidScoreScore = new $score({
            stage: stagesMock.stages[0],
            round: 1,
            team: teamsMock.teams[0],
            score: invalidScore
        });

        unknownTeamScore = new $score({
            stage: stagesMock.stages[0],
            round: 1,
            teamNumber: unknownTeamNumber,
            score: 231
        });

        duplicateScore = new $score({
            stage: stagesMock.stages[0],
            round: 1,
            team: teamsMock.teams[0],
            score: 456
        });
    });

    describe('validate', function() {

        it('returns no errors when there are no scores', function() {
            var errors = $validation.validate([]);
            expect(errors.length).toBe(0);
        });

        it('doesn\'t return any error if givven a legal score', function() {
            var errors = $validation.validate([legalScore]);
            expect(errors.length).toBe(0);
        });

        it('returns only UnknownStageError if givven a score with an unkown stage', function() {
            var errors = $validation.validate([unknownStageScore]);
            expect(errors.length).toBe(1);
            expect(errors[0].name).toBe('UnknownStageError');
        });

        it('returns only UnknownRoundError if givven a score with an unkown round', function() {
            var errors = $validation.validate([unkownRoundScore]);
            expect(errors.length).toBe(1);
            expect(errors[0].name).toBe('UnknownRoundError');
        });

        it('returns only InvalidScoreError if givven a score with an invalid score', function() {
            var errors = $validation.validate([invalidScoreScore]);
            expect(errors.length).toBe(1);
            expect(errors[0].name).toBe('InvalidScoreError');
        });

        it('returns only UnknownTeamError if givven a score with an unkown team', function() {
            var errors = $validation.validate([unknownTeamScore]);
            expect(errors.length).toBe(1);
            expect(errors[0].name).toBe('UnknownTeamError');
        });

        it('returns only DuplicateScoreError if givven two duplicate scores', function() {
            var errors = $validation.validate([legalScore, duplicateScore]);
            expect(errors.length).toBe(2);
            expect(errors[0].name).toBe('DuplicateScoreError');
        });

    });

});
