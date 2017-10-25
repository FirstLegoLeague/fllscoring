describe('ng-stages',function() {
    "use strict";

    var ngServices = factory('services/ng-services');
    var module = factory('services/ng-stages',{
        'services/ng-services': ngServices,
        'services/log': logMock
    });

    var $rootScope;
    var $stages;
    var $q;
    var mockStage;
    var mockStageSanitized;
    var unusedMockStage;
    var unusedMockStageSanitized;
        

    //initialize
    beforeEach(function() {
        mockStage = { id: "practice", name: "Practice Rounds", rounds: 2 };
        mockStageSanitized = { index: 0, id: "practice", name: "Practice Rounds", rounds: 2, $rounds: [1, 2] };
        unusedMockStage = { id: "unused", name: "Foobar", rounds: 0 };
        unusedMockStageSanitized = { index: 1, id: "unused", name: "Foobar", rounds: 0, $rounds: [] };
    })
    var httpMock = createHttpMock({
        get: {
            '/stages': { data: [mockStageSanitized] }
        },
        post: {
            '/stages/save': {stages: [mockStageSanitized]}
        }
    });
    beforeEach(function() {
        angular.mock.module(module.name);
        httpMock.resetResponses();
        angular.mock.module(function($provide) {
            $provide.value('$http', httpMock);
        });
        angular.mock.inject(["$q", "$stages", "$rootScope", function(_$q_, _$stages_, _$rootScope_) {
            $q = _$q_;
            $rootScope = _$rootScope_;
            $stages = _$stages_;
        }]);
    });

    describe('init',function() {
        it('should load stages by default', function(done) {
            return $stages.init().then(function(){
                expect(httpMock.get).toHaveBeenCalledWith('/stages');
                expect($stages.stages).toEqual([mockStageSanitized]);
                done();
            });
            
        });
    });

    describe('save',function() {

        // beforeEach(function(done){
        //     $stages.init().then(()=>{done();});
        // });

        it('should write stages to stages.json',function(done) {
            $stages.stages = [mockStageSanitized];
            return $stages.save().then(function() {
                expect(httpMock.post).toHaveBeenCalledWith('/stages/save',{stages: [mockStageSanitized]});
                done();
            });
        });
        it('should log an error if writing fails',function(done) {
            httpMock.post.and.returnValue(Q.reject('aargh'));
            return $stages.save().then(function() {
                expect(logMock).toHaveBeenCalledWith('stages write error','aargh');
                done();
            });
        });
    });

    describe('load', function() {
        beforeEach(function(done){
            $stages.init().then(()=>{done();});
        });

        it('should load and sanitize stages',function(done) {
            return $stages.load().then(function() {
                expect($stages.stages).toEqual([mockStageSanitized]);
                done();
            });
        });
        it('should log an error if reading fails',function(done) {
            httpMock.get.and.returnValue(Q.reject('squeek'));
            return $stages.load().then(function() {
                expect(logMock).toHaveBeenCalledWith('stages read error','squeek');
                done();
            });
        });
        it('should initialize with default stages if reading fails',function(done) {
            httpMock.get.and.returnValue(Q.reject('squeek'));
            return $stages.load().then(function() {
                expect(logMock).toHaveBeenCalledWith('stages using defaults');
                expect($stages.allStages).toEqual([
                    {index:0,id:"practice",name:"Practice Rounds",rounds:1,$rounds:[1]},
                    {index:1,id:"qualifying",name:"Qualification Rounds",rounds:3,$rounds:[1,2,3]},
                    {index:2,id:"quarter",name:"Quarterfinals",rounds:0,$rounds:[]},
                    {index:3,id:"semi",name:"Semifinals",rounds:0,$rounds:[]},
                    {index:4,id:"final",name:"Final",rounds:0,$rounds:[]}
                ]);
                done();
            });
        });
    });

    describe('remove',function() {

        beforeEach(function(done){
            $stages.init().then(()=>{done();});
        });

        it('should remove the provided id',function() {
            expect($stages.stages).toEqual([mockStageSanitized]);
            $stages.remove("practice");
            expect($stages.stages).toEqual([]);
        });
        it('should do nothing if id not found',function() {
            expect($stages.stages).toEqual([mockStageSanitized]);
            $stages.remove("foobar");
            expect($stages.stages).toEqual([mockStageSanitized]);
        });
    });

    describe('add',function() {

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
        it('should reject a stage without an id, name, or rounds',function() {
            $stages.clear();
            $stages.add({ id: "foo", name: "bar", rounds: 0 });
            expect(function() {
                $stages.add(null);
            }).toThrow();
            expect(function() {
                $stages.add("meh");
            }).toThrow();
            expect(function() {
                $stages.add({ id: "foo", name: "bar" });
            }).toThrow();
            expect(function() {
                $stages.add({ id: "foo", rounds: 0 });
            }).toThrow();
            expect(function() {
                $stages.add({ name: "bar", rounds: 0 });
            }).toThrow();
        });
        it('should reject a stage with non-string id or name',function() {
            $stages.clear();
            expect(function() {
                $stages.add({ id: 1, name: "bar" });
            }).toThrow();
            expect(function() {
                $stages.add({ id: "foo", name: 2 });
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

    describe('moveStage',function() {
        beforeEach(function() {
            //setup two stages
            $stages.clear();
            $stages.add(mockStage);
            $stages.add(unusedMockStage);
        })
        it('move down 1 step',function() {
            $stages.moveStage(mockStageSanitized,1);
            expect($stages.allStages).toEqual([
                { index: 0, id: "unused", name: "Foobar", rounds: 0, $rounds: [] },
                {index:1,id:"practice",name:"Practice Rounds",rounds:2,$rounds:[1,2]}
            ]);
        });
        it('move up 1 step',function() {
            $stages.moveStage(unusedMockStageSanitized,-1);
            expect($stages.allStages).toEqual([
                { index: 0, id: "unused", name: "Foobar", rounds: 0, $rounds: [] },
                {index:1,id:"practice",name:"Practice Rounds",rounds:2,$rounds:[1,2]}
            ]);
        });
    });

    describe('get',function() {
        it('should get a sanitized stage', function() {
            expect($stages.get("practice")).toEqual(mockStageSanitized);
        });
    });

    describe('_update',function() {
        it('should throw an error if stage is present twice',function() {
            $stages._rawStages = [mockStage,mockStage];
            expect(function() {
                $stages._update();
            }).toThrowError('duplicate stage id practice');
        });
    });
});
