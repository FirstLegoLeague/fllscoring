function createTeamsMock(teams) {
    return {
        teams: teams,
        init: jasmine.createSpy('teamsInitSpy').and.returnValue(Q.when()),
        clear: jasmine.createSpy('teamsClearSpy'),
        add: jasmine.createSpy('teamsAddSpy'),
        remove: jasmine.createSpy('teamsRemoveSpy'),
        save: jasmine.createSpy('teamsSaveSpy').and.returnValue(Q.when()),
        get: function(teamNumber) {
            for(var i = 0; i < teams.length; i++) {
                if(teams[i].number === teamNumber) {
                    return teams[i];
                }
            }
            return undefined;
        }
    };
}
