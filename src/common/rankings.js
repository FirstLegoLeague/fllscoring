import './score.js'

function Rankings() {

    function group(arr, func) {
        return arr.reduce((groups, item) => {
            let key = func(item);
            if(!groups.hasOwnProperty(key)) {
                groups[key] = [];
            }
            groups[key].push(item);
            return groups;
        }, {});
    }

    function multigroup(arr, funcs) {
        let currFunc = funcs.shift();
        let result = group(arr, currFunc);
        if(funcs.length > 0) {
            for(let key in result) {
                result[key] = multigroup(result[key], funcs);
            }
        }
        return result;
    }

    function compareRanks(rank1, rank2) {
        let sortedRank1Scores = rank1
    }

    function Rank(rank, team, stage) {
        this.team = team;
        this.stage = stage;

        this.scores = new Array(stage.rounds).map((u,i) => {
            let score = rank.filter(score => score.round === i)[0];
            return score ? score.score : 0;
        });

        this.highest = rank.sort(Score.compare)[0];
    }

    this.calculate = function(scores, stages, teams) {
        let ranks = multigroup(scores, [score => score.stageId, score => score.teamNumber]);
        return stages.map(function(stage) {
            let rankNumber = 0;
            let lastHighest = null;

            // Mapping to Rank objects
            return teams.map(function(team) {
                return new Rank(ranks[stage.id][team.number], team, stage);
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
    };
}
