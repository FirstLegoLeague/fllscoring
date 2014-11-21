describe('ng-teams',function() {
    var ngServices = factory('services/ng-services');
    var module = factory('services/ng-teams',{
        'services/ng-services': ngServices,
        'services/log': logMock
    });

    var $teams;
    var rawMockTeam = { number: "123", name: "Oefenrondes", cityState: "foo" };
    var savedMockTeam = {
        number: 123,
        name: "Oefenrondes",
        affiliation: "",
        cityState: "foo",
        country: "",
        coach1: "",
        coach2: "",
        judgingGroup: "",
        pitLocation: "",
        translationNeeded: false
    };
    var mockTeam = {
        index: 0,
        number: 123,
        name: "Oefenrondes",
        affiliation: "",
        cityState: "foo",
        country: "",
        coach1: "",
        coach2: "",
        judgingGroup: "",
        pitLocation: "",
        translationNeeded: false
    };
    var fsMock;

    beforeEach(function() {
        fsMock = createFsMock({"teams.json": [rawMockTeam]});
        angular.mock.module(module.name);
        angular.mock.module(function($provide) {
            $provide.value('$fs', fsMock);
        });
        angular.mock.inject(["$teams", function(_$teams_) {
            $teams = _$teams_;
        }]);
        // $teams needs to initialize itself, wait for that to
        // complete before starting each test.
        return $teams.init();
    });

    describe('initializing',function() {
        it('should load teams by default', function() {
            expect($teams.teams).toEqual([mockTeam]);
        });
    });

    describe('loading', function() {
        it('should load and sanitize teams',function() {
            return $teams.load().then(function() {
                expect($teams.teams).toEqual([mockTeam]);
            });
        });
    });

    describe('getting',function() {
        it('should get a sanitized team', function() {
            expect($teams.get(123)).toEqual(mockTeam);
        });
    });

    describe('adding',function() {
        it('should add a team to the list and add autogen properties',function() {
            $teams.clear();
            var res = $teams.add(rawMockTeam);
            expect($teams.teams).toEqual([mockTeam]);
        });
        it('should reject duplicate team ids',function() {
            $teams.clear();
            $teams.add(rawMockTeam);
            expect(function() {
                $teams.add(rawMockTeam);
            }).toThrow();
        });
        it('should maintain existing teams array', function() {
            $teams.clear();
            var teams = $teams.teams;
            expect(teams).toEqual([]);
            $teams.add(rawMockTeam);
            expect(teams).toEqual([mockTeam]);
        });
    });

    describe('saving',function() {
        it('should write teams to teams.json',function() {
            return $teams.save().then(function() {
                expect(fsMock.write).toHaveBeenCalledWith('teams.json',[savedMockTeam])
            });
        });
    });

    describe('removing',function() {
        it('should remove the provided id',function() {
            expect($teams.teams).toEqual([mockTeam]);
            $teams.remove(123);
            expect($teams.teams).toEqual([]);
        });
    });

});
