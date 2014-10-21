function getDummyScoreboard() {
    // Scoreboard contains scores for each stage of the tournament.
    // For each of these stages, there's a list of teams who have played
    // in this round, each recording all invidual round scores and an overal
    // highest score for that stage.
    // Teams are sorted by rank, but note that some teams may have the
    // same rank, if they have the exact same ordered list of scores.
    //
    // Possible score values and their ordering from high to low:
    //  - <number> Integer score (can be negative)
    //  - "dnc"    Team Did Not Compete (i.e. didn't show up when they had to)
    //  - "dsq"    Team Disqualified (i.e. were not allowed to start, or removed during round)
    //  - null     Team did not play yet for this round
    var scoreboard = {
        "practice": [
            /* teams... */
        ],
        "qualifying": [
            {
                team: { number: "4", name: "Volta" },
                scores: [280, 100, 300],
                rank: 1,
                highest: 300,
            },
            {
                team: { number: "23", name: "Superteam" },
                scores: [300, 100, 280],
                rank: 1,
                highest: 300,
            },
            {
                team: { number: "1", name: "NXT Generation" },
                scores: [120, 200, null],
                rank: 2,
                highest: 200,
            },
            {
                team: { number: "20", name: "Utter Failure" },
                scores: ["dnc", "dsq", "dnc"],
                rank: 3,
                highest: "dnc",
            }
        ],
        "final": [
            {
                team: { number: "4", name: "Volta" },
                scores: [250],
                rank: 2,
                highest: 250,
            },
            {
                team: { number: "23", name: "Superteam" },
                scores: [280],
                rank: 1,
                highest: 280,
            }
        ]
    };
    return scoreboard;
}

/**
 * Service handling all access to scores, including scoreboard
 * and ranking computation.
 */
define('services/ng-scores',[
    'services/ng-services',
    'services/log',
    'services/ng-fs',
    'services/ng-stages'
],function(module,log) {
    "use strict";

    return module.service('$scores', ['$fs', '$stages', '$q', function($fs, $stages, $q) {

        function Scores() {
            /**
             * Current list of scores.
             * Each score is an object describing which team scored that
             * score in which round, and possibly contains a reference to the
             * scoresheet file.
             * You can use directly use this property in e.g. views, as
             * the reference will remain valid.
             */
            this.scores = [];

            this.scoreboard = getDummyScoreboard();

            // TODO: add a $watch on $stages.stages to call this._update()?
            // See also the _update() call in this.init().
            this._stages = $stages.stages;

            this._rawScores = [];

            this._updating = 0;
            this._initialized = null; // Promise<void>
            this.init();
        }

        /**
         * Initialize service, if not initialized already.
         * @returns Promise<void> that is resolved when init is complete.
         */
        Scores.prototype.init = function() {
            var self = this;
            if (!this._initialized) {
                this._initialized = this.load()
                    .then(function() {
                        return $stages.init();
                    }).then(function() {
                        self._update();
                    })
            }
            return this._initialized;
        }


        Scores.prototype.clear = function() {
            this._rawScores = [];
            this._update();
        };

        Scores.prototype.save = function() {
            return $fs.write('scores.json', this._rawScores).then(function() {
                log('scores saved');
            }, function(err) {
                log('scores write error', err);
            });
        };

        Scores.prototype.load = function() {
            var self = this;
            return $fs.read('scores.json').then(function(res) {
                self.beginupdate();
                try {
                    self.clear();
                    res.forEach(self.add.bind(self));
                } finally {
                    self.endupdate();
                }
            }, function(err) {
                log('scores read error', err);
            });
        };

        Scores.prototype.remove = function(index) {
            // TODO: this function used to remove an associated
            // score sheet file.
            // However, as creating that scoresheet was not
            // the concern of this class, I (Martin) decided
            // that removing it should not be its concern either.
            // Note that e.g. the clear() method also did not
            // remove 'obsolete' scoresheet files.
            // Additionally note that a scoresheet may be the digital
            // representation of a 'physical' scoresheet, something
            // with a signature even, and may indeed be a very different
            // beast than 'merely' a score entry.
            this._rawScores.splice(index, 1);
            this._update();
        };

        Scores.prototype.add = function(score) {
            // Create a copy of the score, in case the
            // original score is being modified...
            // TODO: recursively do that for the stages etc. as well?
            // Or maybe e.g. only store the stage ID and team number?
            this._rawScores.push({
                file: score.file,
                team: score.team,
                stage: score.stage,
                round: score.round,
                score: score.score
            });
            this._update();
        };

        Scores.prototype.beginupdate = function() {
            this._updating++;
        };

        Scores.prototype.endupdate = function() {
            if (this._updating <= 0) {
                throw new Error("beginupdate()/endupdate() calls mismatched");
            }
            this._updating--;
            if (this._updating === 0) {
                this._update();
            }
        };

        Scores.prototype._update = function() {
            var self = this;
            if (this._updating > 0) {
                return;
            }
            this.scores.splice(0, this.scores.length); // clear without creating new object
            this._rawScores.forEach(function(score) {
                self.scores.push(score);
            });
        }

        return new Scores();
    }]);
});
