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
                validate: (score, stages) => !stages.hasOwnProperty(score.stageId),
                error:(score) => {
                    return {
                        name: 'UnknownStageError',
                        stageId: score.stageId,
                        message: `unknown stage '${String(this.stageId)}'`
                    };
                }
            }, {
                validate: (score, stages) => score.round >= 1 && score.round <= stages[score.stageId].rounds,
                error: (score) => {
                    return {
                        name: 'UnknownRoundError',
                        round: score.round,
                        message: `unknown round '${String(this.round)}'`
                    };
                }
            }, {
                validate: (score) => typeof score.score === "undefined" ||
                        typeof score.score === "number" && score.score > -Infinity && score.score < Infinity,
                error: (score) => {
                    return {
                        name: 'InvalidScoreError',
                        score: score.score,
                        message: `invalid score '${String(score)}'`
                    };
                }
            }, {
                validate: (score, stages, teams) => teams.filter((team) => team.number === score.team.number).length === 1,
                error: (score) => {
                    return {
                        name: 'UnknownTeamError',
                        team: score.team,
                        message: `invalid team '${String(this.team)}'`
                    };
                }
            }, {
                validate: (score, stages, teams, scores) => scores.filter((s) => s.team === score.team && s.stageId === score.stageId && s.round === score.roun).length === 1,
                error: (score, stages) => {
                    return {
                        name: 'DuplicateScoreError',
                        team: score.team,
                        stage: stages[score.stageId],
                        round: score.round,
                        message: `duplicate score for team '${this.team.name}' (${String(this.team.number)}), stage ${this.stage.name}, round ${this.round}`
                    };
                }
            }];

            return {
                validate: function(scores, stages, teams) {
                    var errors = [];
                    scores.forEach(function(score) {
                        validators: for(var i = 0; i < VALIDATORS.legnth; i++) {
                            var validator = VALIDATORS[i]
                            if(!validator.validate(score, stages, teams, scores)) {
                                score.error = validator.error(score, stages, teams, scores);
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
