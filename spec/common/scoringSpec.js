describe('common/scoring', function () {
    var scoring;
    beforeEach(function () {
        scoring = factory('common/scoring');
    });

    describe('isValidScore', function () {
        it('should accept valid scores', function () {
            expect(scoring.isValidScore(0)).toBe(true);
            expect(scoring.isValidScore(-1)).toBe(true);
            expect(scoring.isValidScore(1000)).toBe(true);
            expect(scoring.isValidScore("dnc")).toBe(true); // Did Not Compete
            expect(scoring.isValidScore("dsq")).toBe(true); // DiSQualified
        });

        it('should reject invalid scores', function () {
            expect(scoring.isValidScore(undefined)).toBe(false);
            expect(scoring.isValidScore(null)).toBe(false);
            expect(scoring.isValidScore(NaN)).toBe(false);
            expect(scoring.isValidScore(Infinity)).toBe(false);
            expect(scoring.isValidScore(-Infinity)).toBe(false);
            expect(scoring.isValidScore("dnq")).toBe(false);
            expect(scoring.isValidScore("foo")).toBe(false);
            expect(scoring.isValidScore(true)).toBe(false);
            expect(scoring.isValidScore(false)).toBe(false);
            expect(scoring.isValidScore({})).toBe(false);
            expect(scoring.isValidScore([])).toBe(false);
        });
    });
});
