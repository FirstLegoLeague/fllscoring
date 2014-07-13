"use strict";

function getDummyStages() {
    // Stage setup.
    // 0 rounds means the stage-type isn't used for this tournament.
    var stages = [
        { id: "practice", name: "Oefenrondes", rounds: 2 },
        { id: "qualifying", name: "Voorrondes", rounds: 3 },
        { id: "quarter", name: "Kwart finales", rounds: 0 },
        { id: "semi", name: "Halve finales", rounds: 0 },
        { id: "final", name: "Finale", rounds: 1 },
    ];
    return stages;
}

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
    //  - "DSQ"    Team Disqualified (i.e. were not allowed to start, or removed during round)
    //  - "DNC"    Team Did Not Compete (i.e. didn't show up when they had to)
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
                scores: ["DNC", "DSQ", "DNC"],
                rank: 3,
                highest: "bla",
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

define([
    'services/log',
    'services/ng-scores',
    'angular'
],function(log) {
    var moduleName = 'ranking';
    return angular.module(moduleName,[]).controller(moduleName+'Ctrl',[
        '$scope', '$scores',
        function($scope, $scores) {
            log('init ranking ctrl');

            $scope.sort = 'score';
            $scope.rev = true;

            var stages = getDummyStages();
            var scoreboard = getDummyScoreboard();

            // Workaround for lack of 'numbered' for loop in angular
            stages.map(function(stage) {
                stage._rounds = new Array(stage.rounds);
                for (var i = 0; i < stage.rounds; i++) {
                    stage._rounds[i] = i + 1;
                }
            });

            $scope.stages = stages;
            $scope.scoreboard = getDummyScoreboard();
        }
    ]);
});
