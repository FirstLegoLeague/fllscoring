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
    return module.factory('$scores',['$fs', '$stages', function($fs, $stages) {
        var scores = [];
        var stages = $stages.stages;

        function clear() {
            scores.splice(0, scores.length);
        }
        function save() {
            return $fs.write('scores.json',scores).then(function() {
                log('scores saved');
            }, function(err) {
                log('scores write error', err);
            });
        }
        function load() {
            return $fs.read('scores.json').then(function(res) {
                // Replace contents of array (without creating a new object, so any
                // existing references to it remain valid)
                res.unshift(scores.length);
                res.unshift(0);
                scores.splice.apply(scores,res);
            }, function(err) {
                //error
                log('scores read error', err);
            });
        }
        function remove(index) {
            var self = this;
            // First remove the scoresheet, then re-save scores
            var score = scores.splice(index, 1)[0];
            return $fs.remove(score.file).then(function() {
                return self.save();
            }, function(err) {
                log('error removing score', err);
            });
        }
        function add(data) {
            scores.push(data);
            return this.save();
        }

        function getScoreboard() {
            return getDummyScoreboard();
        }

        load();

        return {
            scores: scores,
            clear: clear,
            load: load,
            save: save,
            remove: remove,
            add: add,
            getScoreboard: getScoreboard
        };
    }]);
});
