describe('ranking', function () {
    var ranking;
    beforeEach(function () {
        ranking = factory('common/ranking');
    });

    describe('isValidScore', function () {
        it('should accept valid scores', function () {
            expect(ranking.isValidScore(0)).toBe(true);
            expect(ranking.isValidScore(-1)).toBe(true);
            expect(ranking.isValidScore(1000)).toBe(true);
            expect(ranking.isValidScore("dnc")).toBe(true); // Did Not Compete
            expect(ranking.isValidScore("dsq")).toBe(true); // DiSQualified
        });

        it('should reject invalid scores', function () {
            expect(ranking.isValidScore(undefined)).toBe(false);
            expect(ranking.isValidScore(null)).toBe(false);
            expect(ranking.isValidScore(NaN)).toBe(false);
            expect(ranking.isValidScore(Infinity)).toBe(false);
            expect(ranking.isValidScore(-Infinity)).toBe(false);
            expect(ranking.isValidScore("dnq")).toBe(false);
            expect(ranking.isValidScore("foo")).toBe(false);
            expect(ranking.isValidScore(true)).toBe(false);
            expect(ranking.isValidScore(false)).toBe(false);
            expect(ranking.isValidScore({})).toBe(false);
            expect(ranking.isValidScore([])).toBe(false);
        });
    });

    describe('calculateScoreboard', function () {
        it('should output used stages', function () {
            var board = ranking.calculateScoreboard([], { test: 1 });
            expect(Object.keys(board)).toEqual(['test']);
        });

        it('should fill in all rounds for a team', function () {
            // If a team has played at all (i.e., they have a score for that stage)
            // then all other rounds for that team need to have an entry (which can
            // be null).
            var board = ranking.calculateScoreboard([
                { teamNumber: 41, stageId: 'test', round: 2, score: 10, published: true }
            ], { test: 3 });
            expect(board['test'][0].scores).toEqual([null, 10, null]);
        });

        it('should rank number > dnc > dsq > null', function () {
            var board = ranking.calculateScoreboard([
                { teamNumber: 41, stageId: 'test', round: 1, score: 'dsq', published: true },
                { teamNumber: 42, stageId: 'test', round: 1, score: 'dnc', published: true },
                { teamNumber: 43, stageId: 'test', round: 1, score: -1, published: true },
                { teamNumber: 44, stageId: 'test', round: 1, score: 1, published: true },
            ], { test: 3 });
            var result = board['test'].map(function (entry) {
                return {
                    rank: entry.rank,
                    teamNumber: entry.teamNumber,
                    highest: entry.highest
                };
            });
            expect(result).toEqual([
                { rank: 1, teamNumber: 44, highest: 1 },
                { rank: 2, teamNumber: 43, highest: -1 },
                { rank: 3, teamNumber: 42, highest: 'dnc' },
                { rank: 4, teamNumber: 41, highest: 'dsq' },
            ]);

        });

        it("should assign equal rank to equal scores", function () {
            var board = ranking.calculateScoreboard([
                { teamNumber: 41, stageId: 'test', round: 1, score: 10, published: true },
                { teamNumber: 41, stageId: 'test', round: 2, score: 20, published: true },
                { teamNumber: 41, stageId: 'test', round: 3, score: 30, published: true },
                { teamNumber: 42, stageId: 'test', round: 1, score: 30, published: true },
                { teamNumber: 42, stageId: 'test', round: 2, score: 10, published: true },
                { teamNumber: 42, stageId: 'test', round: 3, score: 20, published: true },
                { teamNumber: 43, stageId: 'test', round: 1, score: 30, published: true },
                { teamNumber: 43, stageId: 'test', round: 2, score:  0, published: true },
                { teamNumber: 43, stageId: 'test', round: 3, score: 20, published: true },
            ], { test: 3 });
            var result = board['test'].map(function (entry) {
                return {
                    rank: entry.rank,
                    teamNumber: entry.teamNumber,
                    highest: entry.highest
                };
            });
            // Note: for equal ranks, teams are sorted according
            // to (ascending) team id
            expect(result).toEqual([
                { rank: 1, teamNumber: 41, highest: 30 },
                { rank: 1, teamNumber: 42, highest: 30 },
                { rank: 2, teamNumber: 43, highest: 30 },
            ]);
        });

        it("should allow filtering rounds", function () {
            var board = ranking.calculateScoreboard([
                { teamNumber: 41, stageId: 'test', round: 1, score: 10, published: true },
                { teamNumber: 41, stageId: 'test', round: 2, score: 20, published: true },
                { teamNumber: 41, stageId: 'test', round: 3, score: 30, published: true },
                { teamNumber: 42, stageId: 'test', round: 1, score: 30, published: true },
                { teamNumber: 42, stageId: 'test', round: 2, score: 10, published: true },
                { teamNumber: 42, stageId: 'test', round: 3, score: 20, published: true },
                { teamNumber: 43, stageId: 'test', round: 1, score: 30, published: true },
                { teamNumber: 43, stageId: 'test', round: 2, score:  0, published: true },
                { teamNumber: 43, stageId: 'test', round: 3, score: 20, published: true },
            ], { test: 2 });
            var result = board['test'].map(function (entry) {
                return {
                    rank: entry.rank,
                    teamNumber: entry.teamNumber,
                    scores: entry.scores
                };
            });
            // Note: for equal ranks, teams are sorted according
            // to (ascending) team id
            expect(result).toEqual([
                { rank: 1, teamNumber: 42, scores: [30, 10] },
                { rank: 2, teamNumber: 43, scores: [30, 0] },
                { rank: 3, teamNumber: 41, scores: [10, 20] },
            ]);
        });

        it("should exclude scores for unknown rounds / stages", function () {
            var board = ranking.calculateScoreboard([
                { teamNumber: 41, stageId: 'foo',  round: 1, score: 0, published: true },
                { teamNumber: 41, stageId: 'test', round: 0, score: 0, published: true },
                { teamNumber: 41, stageId: 'test', round: 4, score: 0, published: true },
            ], { test: 3 });
            expect(board['test'].length).toEqual(1);
        });

        it("should ignore invalid scores", function () {
            var board = ranking.calculateScoreboard([
                { teamNumber: 41, stageId: 'test', round: 1, score: "foo", published: true },
                { teamNumber: 41, stageId: 'test', round: 2, score: NaN, published: true },
                { teamNumber: 41, stageId: 'test', round: 3, score: Infinity, published: true },
                { teamNumber: 42, stageId: 'test', round: 1, score: {}, published: true },
                { teamNumber: 42, stageId: 'test', round: 2, score: true, published: true },
            ], { test: 3 });
            expect(board['test'].length).toEqual(0);
        });

        it("should include/overwrite duplicate score", function () {
            var board = ranking.calculateScoreboard([
                { teamNumber: 41, stageId: 'test', round: 1, score: 10, published: true },
                { teamNumber: 41, stageId: 'test', round: 1, score: 20, published: true },
            ], { test: 3 });
            // Last score will overwrite any previous entry
            expect(board['test'][0].highest).toEqual(20);
        });
    });
});
