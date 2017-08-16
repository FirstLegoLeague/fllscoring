/**
 * This is the object representation of a score.
 * It currently contains only the score's summary, but the goal is for it to
 * fully contain the score from creation to saving, editing and deleting.
 */
define('services/ng-score',[
    'services/ng-services'
],function(module) {
    "use strict";

    return module.factory('$score',
        [function() {


            // Calculating the unique ID for this sanitized score.
            // The uid is an 8-hex-digit combination of
            // The current date and a random number.
            function generateUniqueId() {
                //The max uid in the range
                let max = 0x100000000;
                // The numeric form of the uid
                let num = (Math.floor(Math.random() * max) + Date.now()) % max;
                // The string uid, by adding the max value and then removing it we make sure the stringification of the number
                return (num + max).toString(16).slice(1);
            }

            // This function is meant to make sure the score is set according to
            // the correct structure in order to save it.
            // score that doesn't match the fields in this function,
            // cannot be saved in the scores summery.
            function sanitize(entry) {
                return {
                    id: entry.id || generateUniqueId(),
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
