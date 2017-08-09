/**
 * This is a service that searches for errors in the scores before ranking
 */
define('services/ng-validation',[
    'services/ng-services',
    'services/ng-stages',
    'services/ng-teams'
],function(module) {
    "use strict";

    return module.service('$validation',
        ['$stages','$teams',
        function($stages, $teams) {

            const VALIDATORS = [{
                validate: (score) => $stages.get(score.stageId),
                error:(score) => {
                    return {
                        name: 'UnknownStageError',
                        stageId: score.stageId,
                        message: `unknown stage '${String(score.stageId)}'`
                    };
                }
            }, {
                validate: (score) => score.round >= 1 && score.round <= $stages.get(score.stageId).rounds,
                error: (score) => {
                    return {
                        name: 'UnknownRoundError',
                        round: score.round,
                        message: `unknown round '${String(score.round)}'`
                    };
                }
            }, {
                validate: (score) => isFinite(score.score),
                error: (score) => {
                    return {
                        name: 'InvalidScoreError',
                        score: score.score,
                        message: `invalid score '${String(score.score)}'`
                    };
                }
            }, {
                validate: (score) => $teams.get(score.teamNumber),
                error: (score) => {
                    return {
                        name: 'UnknownTeamError',
                        team: score.teamNumber,
                        message: `invalid team '${String(score.teamNumber)}'`
                    };
                }
            }, {
                validate: (score, scores) => scores.filter((s) => s.teamNumber === score.teamNumber && s.stageId === score.stageId && s.round === score.round).length === 1,
                error: (score, stages) => {
                    return {
                        name: 'DuplicateScoreError',
                        team: score.team,
                        stage: score.stageId,
                        round: score.round,
                        message: `duplicate score for team '${score.team.name}' (${String(score.team.number)}), stage ${score.stage.name}, round ${score.round}`
                    };
                }
            }];

            return {
                validate: function(scores) {
                    var errors = [];
                    scores.forEach(function(score) {
                        validators: for(var i = 0; i < VALIDATORS.length; i++) {
                            var validator = VALIDATORS[i]
                            if(!validator.validate(score, scores)) {
                                score.error = validator.error(score, scores);
                                errors.push(score.error);
                                break validators;
                            }
                        }
                    });
                    return errors;
                }
            };

    }]);
});
