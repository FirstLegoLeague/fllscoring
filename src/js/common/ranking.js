/**
 * Ranking calculation used on server and client.
 */

// UMD boilerplate (modified from https://github.com/umdjs/umd/blob/master/templates/commonjsAdapter.js)
if (typeof exports === 'object' && typeof exports.nodeName !== 'string' && typeof define !== 'function') {
    var define = function (name, factory) {
        factory(require, exports, module);
    };
}
define("common/ranking", function (require, exports, module) {

    var scoring = require("./scoring");

    /**
     * Compute rankings based on given scores and a stageFilter.
     * Note that only published scores will be included in the resulting
     * output.
     *
     * Scores is an array of score objects, where each score object should
     * have the following properties:
     * @typedef {Object} Score
     * @property teamNumber {number}
     * @property teamNumber {number}
     * @property stageId {string}
     * @property round {number}
     * @property score {number | string}
     * @property published {boolean}
     *
     * StageFilter is an object of stageId => numberOfRounds:
     * @type {Object} StageFilter
     *
     * The result is an object with the rankings per stageId,
     * where each ranking is an array of rank objects.
     * A rank object has the following properties:
     * @typedef {Object} Rank
     * @property rank {number}
     * @property teamNumber {number}
     * @property scores {Array.<number>}
     * @property sortedScores {Array.<number>}
     * @property entries {Array.<Score>}
     * @property highestScore {number}
     *
     * @param scores {Array.<Score>} Scores
     * @param stageFilter {{ [stageId: string]: number }} Hash of stageId => numberOfRounds
     * @return {Array.<Rank>} Ranking based on filtered scores
     */
    function calculateScoreboard(scores, stageFilter) {
        if (typeof stageFilter !== "object") {
            throw new TypeError("stageFilter expected");
        }
        // Create filtered scores (both user-supplied filter and errors).
        var filteredScores = scores.filter(function (s) {
            // Only include published scores
            if (!s.published) {
                return false;
            }

            // Ignore completely invalid scores
            if (!scoring.isValidScore(s.score)) {
                return false;
            }

            // Ignore score if filtered
            if (!stageFilter[s.stageId] || s.round > stageFilter[s.stageId]) {
                return false;
            }

            return true;
        });

        // Create empty lists for each requested stage
        var board = {};
        Object.keys(stageFilter).forEach(function (stage) {
            board[stage] = [];
        });

        // Convert all valid scores to a per-stage array of objects
        // per team (containing team and entries per round)
        filteredScores.forEach(function (s) {
            // Find existing entry for this team, or create one
            var bteam;
            var i;
            var bstage = board[s.stageId];
            for (i = 0; i < bstage.length; i++) {
                if (bstage[i].teamNumber === s.teamNumber) {
                    bteam = bstage[i];
                    break;
                }
            }
            if (!bteam) {
                var maxRounds = stageFilter[s.stageId];
                var initialScores = new Array(maxRounds);
                var initialEntries = new Array(maxRounds);
                for (i = 0; i < maxRounds; i++) {
                    initialScores[i] = null;
                    initialEntries[i] = null;
                }
                bteam = {
                    teamNumber: s.teamNumber,
                    scores: initialScores,
                    rank: null,
                    highest: null,
                    entries: initialEntries,
                };
                bstage.push(bteam);
            }
            bteam.scores[s.round - 1] = s.score;
            bteam.entries[s.round - 1] = s;
        });

        // Compares two scores.
        // Returns 0 if scores are equal, 1 if score2 is larger than score1,
        // -1 otherwise.
        // Note: this ordering causes Array.sort() to sort from highest to lowest score.
        function scoreCompare(score1, score2) {
            if (score1 === score2) {
                return 0;
            }
            var comp = false;
            if (score1 === null || score2 === null) {
                comp = (score1 === null);
            } else if (score1 === "dsq" || score2 === "dsq") {
                comp = (score1 === "dsq");
            } else if (score1 === "dnc" || score2 === "dnc") {
                comp = (score1 === "dnc");
            } else if (typeof score1 === "number" && typeof score2 === "number") {
                comp = score1 < score2;
            } else {
                throw new TypeError("cannot compare scores '" + score1 + "' and '" + score2 + '"');
            }
            return comp ? 1 : -1;
        }

        // Compares two scores-arrays.
        // Returns 0 if arrays are equal, 1 is scores2 is larger than scores1,
        // -1 otherwise.
        // Note: this ordering causes Array.sort() to sort from highest to lowest score.
        function scoresCompare(scores1, scores2) {
            var result = 0;
            var i;
            if (scores1.length !== scores2.length) {
                throw new RangeError("cannot compare score arrays with different number of rounds");
            }
            for (i = 0; i < scores1.length; i++) {
                result = scoreCompare(scores1[i], scores2[i]);
                if (result !== 0)
                    break;
            }
            return result;
        }

        // Compare two 'team entries' (members of a scoreboard stage).
        // 1 is teamEntry2 has higher scores than teamEntry1, or -if scores are
        // equal- teamEntry1 has a higher team number. Returns -1 otherwise.
        // Note: this ordering causes Array.sort() to sort from highest to lowest score,
        // or in ascending team-id order.
        function entryCompare(teamEntry1, teamEntry2) {
            var result = scoresCompare(teamEntry1.sortedScores, teamEntry2.sortedScores);
            if (result === 0) {
                // Equal scores, ensure stable sort by introducing
                // extra criterion.
                // Note: team number's might be strings, so don't assume numeric
                // compare is possible.
                result = (teamEntry1.teamNumber > teamEntry2.teamNumber) ? 1 : -1;
            }
            return result;
        }

        function createSortedScores(teamEntry) {
            teamEntry.sortedScores = teamEntry.scores.slice(0); // create a copy
            teamEntry.sortedScores.sort(scoreCompare);
            teamEntry.highest = teamEntry.sortedScores[0];
        }

        function calculateRank(state, teamEntry) {
            if (state.lastScores === null || scoresCompare(state.lastScores, teamEntry.sortedScores) !== 0) {
                state.rank++;
            }
            state.lastScores = teamEntry.sortedScores;
            teamEntry.rank = state.rank;
            return state;
        }

        // Sort by scores and compute rankings
        for (var stageId in board) {
            if (!board.hasOwnProperty(stageId)) {
                continue;
            }
            var stage = board[stageId];

            // Create sorted scores and compute highest score per team
            stage.forEach(createSortedScores);

            // Sort teams based on sorted scores
            stage.sort(entryCompare);

            // Compute ranking, assigning equal rank to equal scores
            stage.reduce(calculateRank, {
                rank: 0,
                lastScores: null
            });
        }

        return board;
    }

    exports.calculateScoreboard = calculateScoreboard;
});
