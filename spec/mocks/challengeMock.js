var createChallengeMock = function() {
    var field = {
        title: 'test field',
        missions: [{
            id: 'test',
            objectives: [{id:'moo'}],
            score: [
                function() { return 0; }
            ]
        }]
    };
    var definition = {
        field: field,
        missions: field.missions,
        objectiveIndex: {} // todo
    };
    return {
        load: function() { return Q.when(definition); },
        getDependencies: function() { return []; }, // todo
    };
};
