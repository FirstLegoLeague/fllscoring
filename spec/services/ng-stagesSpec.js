"use strict";

describe('ng-stages',function() {
    var ngServices = factory('services/ng-services');
    var module = factory('services/ng-stages',{
        'services/ng-services': ngServices,
        'services/log': logMock
    });

    var $rootScope;
    var $stages;
    var $q;
    var mockStage = { id: "practice", name: "Oefenrondes", rounds: 2 };
    var mockStageSanitized = { id: "practice", name: "Oefenrondes", rounds: 2, $rounds: [1, 2] };
    var unusedMockStage = { id: "unused", name: "Foobar", rounds: 0 };
    var unusedMockStageSanitized = { id: "unused", name: "Foobar", rounds: 0, $rounds: [] };
    var fsMock;

    beforeEach(function() {
        fsMock = createFsMock([mockStage]);
        angular.mock.module(module.name);
        angular.mock.module(function($provide) {
            $provide.value('$fs', fsMock);
        });
        angular.mock.inject(["$q", "$stages", "$rootScope", function(_$q_, _$stages_, _$rootScope_) {
            $q = _$q_;
            $rootScope = _$rootScope_;
            $stages = _$stages_;
        }]);
        // $stages needs to initialize itself, wait for that to
        // complete before starting each test.
        return $stages.init();
    });

    describe('initializing',function() {
        it('should load stages by default', function() {
            expect($stages.stages).toEqual([mockStageSanitized]);
        });
    });

    describe('loading', function() {
        it('should load and sanitize stages',function() {
            return $stages.load().then(function() {
                expect($stages.stages).toEqual([mockStageSanitized]);
            });
        });
    });

    describe('getting',function() {
        it('should get a sanitized stage', function() {
            expect($stages.get("practice")).toEqual(mockStageSanitized);
        });
    });

    describe('adding',function() {
        it('should add a stage to the list and add autogen properties',function() {
            $stages.clear();
            var res = $stages.add(mockStage);
            expect($stages.stages).toEqual([mockStageSanitized]);
        });
        it('should reject duplicate stage ids',function() {
            $stages.clear();
            $stages.add(mockStage);
            expect(function() {
                $stages.add(mockStage);
            }).toThrow();
        });
        it('should maintain existing stages and allStages arrays', function() {
            $stages.clear();
            var allStages = $stages.allStages;
            var stages = $stages.stages;
            expect(allStages).toEqual([]);
            expect(stages).toEqual([]);
            $stages.add(mockStage);
            $stages.add(unusedMockStage);
            expect(allStages).toEqual([mockStageSanitized, unusedMockStageSanitized]);
            expect(stages).toEqual([mockStageSanitized]);
        });
    });

    describe('saving',function() {
        it('should write stages to stages.json',function() {
            return $stages.save().then(function() {
                expect(fsMock.write).toHaveBeenCalledWith('stages.json',[mockStage])
            });
        });
    });

    describe('removing',function() {
        it('should remove the provided id',function() {
            expect($stages.stages).toEqual([mockStageSanitized]);
            $stages.remove("practice");
            expect($stages.stages).toEqual([]);
        });
    });

});
