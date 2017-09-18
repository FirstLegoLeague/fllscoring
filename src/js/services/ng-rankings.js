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

            function Rank(rank, team, stage, filter) {
                this.team = team;
                this.stage = stage;

                this.scores = [];
                for(let i = 0; i < (filter[stage.id] || stage.rounds); i++) {
                    this.scores[i] = rank.filter(score => score.round === (i + 1))[0];
                }

                this.ordered = rank.sort($score.compare);
                this.highest = this.ordered[0];
            }

            Rank.compare = function(rank1, rank2) {
                // A rank is bigger then other iff his highest score is bigger than the other's highest score
                return $score.compare(rank1.highest, rank2.highest);
            };

            return {
                calculate: function(scores, filter) {
                    scores = scores.filter(score => score.published);
                    return $teams.init().then(() => $stages.init())
                    .then(function() {
                        let teams = $teams.teams;
                        let stages = $stages.stages;
                        let ranks = $groups.multigroup(scores, [score => score.stageId, score => score.teamNumber]);
                        let stageRanks = {};
                        stages.forEach(function(stage) {
                            let rankNumber = 1;
                            let stageRank = ranks[stage.id] || {};

                            // Mapping to Rank objects
                            stageRanks[stage.id] = teams.map(function(team) {
                                let teamRank = stageRank[team.number] || [];
                                return new Rank(teamRank, team, stage, filter || {});
                            });

                            // Sorting by the highest score
                            stageRanks[stage.id].sort(Rank.compare);

                            // Adding rank number
                            stageRanks[stage.id].forEach((rank) => {
                                rank.rank = rankNumber++;
                                return rank;
                            });

                        });
                        return stageRanks;
                    });
                }
            };

    }]);
});
