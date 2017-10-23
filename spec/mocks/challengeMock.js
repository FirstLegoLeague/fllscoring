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
        load: jasmine.createSpy('challenge.load').and.callFake(function() {
            return Q.when(definition);
        }),
        getDependencies: jasmine.createSpy('challenge.getDependencies').and.callFake(function() {
            return []; // todo
        }),
        getChallenges: jasmine.createSpy('challeges.getChallenges').and.callFake(function(){
            return Q.when([]);
        })
    };
};
