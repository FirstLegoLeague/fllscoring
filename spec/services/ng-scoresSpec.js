"use strict";

describe('ng-scores',function() {
    var ngServices = factory('services/ng-services');
    var module = factory('services/ng-scores',{
        'services/ng-services': ngServices,
        'services/log': logMock
    });

    var $scores;
    var mockStages = {
        init: function() { },
        stages: [
            { id: "test", rounds: 3, name: "Test stage" }
        ]
    };
    var dummyTeam =  {
        number: '123',
        name: 'foo'
    };
    var mockScore = {
        file: 'somescore.json',
        team: dummyTeam,
        stage: mockStages.stages[0],
        round: 1,
        score: 123
    };
    var fsMock;

    beforeEach(function() {
        fsMock = createFsMock([mockScore]);
        angular.mock.module(module.name);
        angular.mock.module(function($provide) {
            $provide.value('$stages', mockStages);
            $provide.value('$fs', fsMock);
        });
        angular.mock.inject(["$scores", function(_$scores_) {
            $scores = _$scores_;
        }]);
        return $scores.init();
    });

    describe('initialize',function() {
        it('should load mock score initially',function() {
            expect($scores.scores).toEqual([mockScore]);
        });
    });

    describe('adding scores',function() {
        it('should add a score to the list',function() {
            $scores.clear();
            expect($scores.scores).toEqual([]);
            $scores.add(mockScore);
            expect($scores.scores).toEqual([mockScore]);
            // Duplicate scores are allowed in this stage
            $scores.add(mockScore);
            expect($scores.scores).toEqual([mockScore, mockScore]);
        });
    });

    describe('loading',function() {
        it('should load from scores.json',function() {
            return $scores.load().then(function() {
                expect(fsMock.read).toHaveBeenCalledWith('scores.json');
                expect($scores.scores).toEqual([mockScore]);
            });
        });
    });

    describe('clearing',function() {
        it('should clear the scores',function() {
            expect($scores.scores).toEqual([mockScore]);
            $scores.clear();
            expect($scores.scores).toEqual([]);
        });
    });

    describe('saving',function() {
        it('should write scores to scores.json',function() {
            return $scores.save().then(function() {
                expect(fsMock.write).toHaveBeenCalledWith('scores.json', [mockScore])
            });
        });
    });

    describe('removing',function() {
        it('should remove the provided index', function() {
            expect($scores.scores).toEqual([mockScore]);
            $scores.remove(0);
            expect($scores.scores).toEqual([]);
        });
    });

});
