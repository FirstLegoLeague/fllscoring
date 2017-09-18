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

            function Score(entry) {

                //Adding the data from the entry, snitizing it if needed.
                (function(score, entry) {
                    let sanitized = Score.sanitize(entry);
                    for(var key in sanitized) {
                        score[key] = sanitized[key];
                    }
                }) (this, entry);

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
                if(score1 === undefined && score2 === undefined){
                    // if both score1 and score2 are undefined so they are equals
                    return 0;
                } else if(score1 === undefined && score2 !== undefined){
                    // if score1 is undefined and score2 is defined so score2 is "bigger"
                    return 1;
                } else if(score1 !== undefined && score2 === undefined){
                    // if score2 is undefined and score1 is defined so score1 is "bigger"
                    return -1;
                }
                return score2.score - score1.score;
            };

            // These two functions has no reason to be public except for UT.

            // Calculating the unique ID for this sanitized score.
            // The uid is an 8-hex-digit combination of
            // The current date and a random number.
            Score.generateUniqueId = function() {
                //The max uid in the range
                let max = 0x100000000;
                // The numeric form of the uid
                let num = (Math.floor(Math.random() * max) + Date.now()) % max;
                // The string uid, by adding the max value and then removing it we make sure the stringification of the number
                return (num + max).toString(16).slice(1);
            };

            // This function is meant to make sure the score is set according to
            // the correct structure in order to save it.
            // score that doesn't match the fields in this function,
            // cannot be saved in the scores summery.
            Score.sanitize = function(entry) {
                return {
                    id: entry.id || Score.generateUniqueId(),
                    file: Boolean(entry.file) ? String(entry.file) : '',
                    teamNumber: Number(entry.teamNumber || (entry.team ? entry.team.number : 0)),
                    stageId: String(entry.stageId || (entry.stage ? entry.stage.id : '')),
                    round: Number(entry.round),
                    score: isFinite(entry.score) ? Number(entry.score) : undefined,
                    originalScore: Number(entry.originalScore || entry.score),
                    edited: Boolean(entry.edited) ? String(entry.edited) : undefined, // timestamp, e.g. "Wed Nov 26 2014 21:11:43 GMT+0100 (CET)"
                    table: entry.table,
                    published: Boolean(entry.published)
                };
            };

            return Score;
    }]);
});
