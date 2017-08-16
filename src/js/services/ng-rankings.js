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

            const EMPTY = '---';

            function Rank(rank, team, stage) {
                this.team = team;
                this.stage = stage;
                this.empty = EMPTY;

                this.scores = new Array(stage.rounds).fill('score').map((u,i) => {
                    let score = rank.filter(score => score.round === (i + 1))[0];
                    return score ? score.score : EMPTY;
                });

                this.highest = rank.sort($score.compare)[0] || EMPTY;
            }

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
                                return new Rank(((ranks[stage.id] || {})[team.number] || []), team, stage);
                            })

                            // Sorting by the highest score
                            .sort((rank1, rank2) => rank1.highest - rank2.highest)

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
