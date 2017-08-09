/**
 * This is a service that searches for errors in the scores before ranking
 */
define('services/ng-score',[
    'services/ng-services'
],function(module) {
    "use strict";

    return module.factory('$score',
        [function() {

            function sanitize(entry) {
                // Calculating the unique ID for this sanitized score.
                // The uid is an 8-hex-digit combination of
                // The current date and a random number.
                let max = 0x100000000, //The max uid in the range
                    num = (Math.floor(Math.random() * max) + Date.now()) % max, // The numeric form of the uid
                    // The string uid, by adding the max value and then removing it we make sure the stringification of the number
                    uniqueId = (num + max).toString(16).slice(1);

                return {
                    id: uniqueId,
                    file: Boolean(entry.file) ? String(entry.file) : '',
                    teamNumber: Number(entry.teamNumber || (entry.team ? entry.team.number : 0)),
                    stageId: String(entry.stageId || (entry.stage ? entry.stage.id : '')),
                    round: Number(entry.round),
                    score: isFinite(entry.score) ? Number(entry.score) : undefined,
                    originalScore: Number(entry.originalScore || entry.score),
                    edited: Boolean(entry.edited) ? String(entry.edited) : undefined, // timestamp, e.g. "Wed Nov 26 2014 21:11:43 GMT+0100 (CET)"
                    published: Boolean(entry.published),
                    table: String(entry.table)
                };
            }

            function Score(entry) {

                //Adding the data from the entry, snitizing it if needed.
                (function(score, entry) {
                    let sanitized = sanitize(entry);
                    for(var key in sanitized) {
                        score[key] = sanitized[key];
                    }
                }) (this, entry);

                this.isZero = function() {
                    return isNaN(this.score) || this.score === 0;
                };

            }

            Score.prototype.calcFilename = function() {
                this.file =  [
                    'score',
                    this.stageId,
                    'round' + this.round,
                    'table' + this.table,
                    'team' + this.teamNumber,
                    this.id
                ].join('_')+'.json';
                return this.file;
            };

            Score.compare = function(score1, score2) {
                if(!(score1 instanceof Score) || !(score2 instanceof Score)) {
                    throw new TypeError(`cannot compare scores ${score1} and ${score2}`);
                }

                const SCORE_2_BIGGER = 1;
                const SCORE_1_BIGGER = -1;
                const EQUAL = 0;

                if(score1.score === score2.score) {
                    return EQUAL;
                } else if(score1.isZero()) {
                    return SCORE_2_BIGGER;
                } else if(score2.isZero()) {
                    return SCORE_1_BIGGER;
                } else {
                    return (score1.score > score2.score) ? SCORE_1_BIGGER : SCORE_2_BIGGER;
                }
            }

            return Score;
    }]);
});
