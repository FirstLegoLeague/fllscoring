/**
 * This is a service that can calculate the rankings.
 */
define('services/ng-rankings',[
    'services/ng-services',
    'services/ng-stages',
    'services/ng-teams',
    'services/ng-score',
    'services/ng-groups'
],function(module) {
    "use strict";

    return module.service('$rankings',
        ['$stages','$teams','$score','$groups',
        function($stages, $teams, $score, $groups) {

            function Rank(rank, team, stage) {
                this.team = team;
                this.stage = stage;

                this.scores = [];
                for(let i = 0; i < stage.rounds; i++) {
                    this.scores[i] = rank.filter(score => score.round === (i + 1))[0];
                }

                this.ordered = rank.sort($score.compare)
                this.highest = this.oredered[0];
            }

            Rank.compare = function(rank1, rank2) {
                for(var i = 0; i < rank1.ordered.length && i < rank2.ordered.length; i++) {
                    let comparation = rank1.ordered[i] - rank2.oredered[i];
                    if(comparation !== 0) return comparation;
                }
                return 0;
            };

            return {
                calculate: function(scores) {
                    return $teams.init().then(function() {
                        return $stages.init();
                    }).then(function() {
                        let teams = $teams.teams;
                        let stages = $stages.stages;
                        let ranks = $groups.multigroup(scores, [score => score.stageId, score => score.teamNumber]);
                        let stageRanks = {};
                        stages.forEach(function(stage) {
                            let rankNumber = 1;
                            let lastHighest = null;

                            // Mapping to Rank objects
                            stageRanks[stage.id] = teams.map(function(team) {
                                let stage = ranks[stage.id] || {};
                                let rank = stage[team.number] || [];
                                return new Rank(rank, team, stage);
                            })

                            // Sorting by the highest score
                            .sort(Rank.compare)

                            // Adding rank number
                            .map((rank) => {
                                if(lastHighest !== null && lastHighest !== rank.highest) {
                                    rankNumber++;
                                }
                                rank.rank = rankNumber;
                                lastHighest = rank.highest;
                                return rank;
                            });

                        });
                        return stageRanks;
                    });
                }
            };

    }]);
});
