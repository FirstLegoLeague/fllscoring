function createStagesMock() {
    var stages = [
        { id: "practice", name: "Oefenrondes", rounds: 2, $rounds: [1, 2] },
        { id: "qualifying", name: "Voorrondes", rounds: 3, $rounds: [1, 2, 3] },
        { id: "quarter", name: "Kwart finales", rounds: 0, $rounds: [] },
        { id: "semi", name: "Halve finales", rounds: 0, $rounds: [] },
        { id: "final", name: "Finale", rounds: 1, $rounds: [1] },
    ];
    return {
        stages: stages,
        get: function(id) {
            var i;
            for (i = 0; i < stages.length; i++) {
                if (stages[i].id === id) {
                    return stages[i];
                }
            }
            throw new Error("unknown stage");
        }
    };
}
