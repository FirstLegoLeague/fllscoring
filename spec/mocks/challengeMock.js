var challengeMock = (function() {
    var field = {
        missions: {
            'test': {
                _keys: 'test',
                objectives: ['moo'],
                score: function() { return 0; }
            }
        },
        title: 'test field'
    };
    var definition = {
        field: field,
        missionIndex: field.missions,
        missions: [ field.missions['test'] ],
        objectiveIndex: {} // todo
    };
    return {
        load: function() { return Q.when(definition); },
        getDependencies: function() { return []; }, // todo
    };
})();
