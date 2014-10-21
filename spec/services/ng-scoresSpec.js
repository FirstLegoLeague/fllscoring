"use strict";

describe('ng-scores',function() {
    var ngServices = factory('services/ng-services');
    var module = factory('services/ng-scores',{
        'services/ng-services': ngServices,
        'services/log': logMock
    });

    var $scores;
    var mockScore = {
        file:'bar'
    };
    var mockStages = {
        stages: [
            { id: "test", rounds: 3, name: "Test stage" }
        ]
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
    });

    describe('initialize',function() {
        it('should give empty scores initially',function() {
            expect($scores.scores).toEqual([])
        });
    });

    describe('adding scores',function() {
        it('should add a score to the list and save',function() {
            $scores.save = jasmine.createSpy('saveSpy').andReturn(42);
            var res = $scores.add(mockScore);
            expect($scores.scores).toEqual([mockScore]);
            expect(res).toBe(42);
            expect($scores.save).toHaveBeenCalled();
        });
    });

    describe('loading',function() {
        it('should load from scores.json',function(done) {
            $scores.load().then(function() {
                expect(fsMock.read).toHaveBeenCalledWith('scores.json');
                expect($scores.scores).toEqual([mockScore]);
                done();
            }).done();
        });
    });

    describe('clearing',function() {
        it('should clear the scores, not save them',function(done) {
            $scores.load().then(function() {
                expect($scores.scores).toEqual([mockScore]);
                $scores.clear();
                expect($scores.scores).toEqual([]);
                expect(fsMock.write).not.toHaveBeenCalled();
                done();
            }).done();
        });
    });

    describe('saving',function() {
        it('should write scores to scores.json',function(done) {
            $scores.load().then(function() {
                return $scores.save();
            }).then(function() {
                expect(fsMock.write).toHaveBeenCalledWith('scores.json',[mockScore])
                done();
            }).done();
        });
    });

    describe('removing',function() {
        it('should remove the provided index and save',function(done) {
            $scores.save = jasmine.createSpy('saveSpy');
            $scores.load().then(function() {
                expect($scores.scores).toEqual([mockScore]);
                return $scores.remove(0);
            }).then(function() {
                expect($scores.scores).toEqual([]);
                expect($scores.save).toHaveBeenCalled();
                expect(fsMock.remove).toHaveBeenCalledWith('bar');
                done();
            }).done();
        });
    });

});
