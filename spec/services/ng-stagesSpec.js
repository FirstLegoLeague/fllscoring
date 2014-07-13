"use strict";

describe('ng-stages',function() {
    var ngServices = factory('services/ng-services');
    var module = factory('services/ng-stages',{
        'services/ng-services': ngServices,
        'services/log': logMock
    });

    var $stages;
    var mockStage = { id: "practice", name: "Oefenrondes", rounds: 2 };
    var mockStageSanitized = { id: "practice", name: "Oefenrondes", rounds: 2, _rounds:[1,2] };
    var fsMock;

    beforeEach(function() {
        fsMock = createFsMock([mockStage]);
        angular.mock.module(module.name);
        angular.mock.module(function($provide) {
            $provide.value('$fs', fsMock);
        });
        angular.mock.inject(["$stages", function(_$stages_) {
            $stages = _$stages_;
        }]);
    });

    describe('initals',function() {
        it('should give empty scores initially',function(done) {
            $stages.load().then(function() {
                expect($stages.stages).toEqual([mockStageSanitized]);
                done();
            }).done();
        });
    });

    describe('adding stages',function() {
        it('should add a stage to the list, sanitze and save',function() {
            $stages.save = jasmine.createSpy('saveSpy').andReturn(42);
            var res = $stages.add(mockStage);
            expect($stages.stages).toEqual([mockStageSanitized]);
            expect(res).toBe(42);
            expect($stages.save).toHaveBeenCalled();
        });
    });

    describe('saving',function() {
        it('should write stages to stages.json',function(done) {
            $stages.load().then(function() {
                return $stages.save();
            }).then(function() {
                expect(fsMock.write).toHaveBeenCalledWith('stages.json',[mockStage])
                done();
            }).done();
        });
    });

    describe('removing',function() {
        it('should remove the provided index and save',function(done) {
            $stages.save = jasmine.createSpy('saveSpy');
            $stages.load().then(function() {
                expect($stages.stages).toEqual([mockStageSanitized]);
                return $stages.remove(0);
            }).then(function() {
                expect($stages.stages).toEqual([]);
                expect($stages.save).toHaveBeenCalled();
                done();
            }).done();
        });
    });

});
