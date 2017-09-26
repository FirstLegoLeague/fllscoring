describe('settings', function() {

    var module = factory('views/settings', {
        'services/log': logMock,
        'controllers/NewStageDialogController': factory('controllers/NewStageDialogController')
    });

    var $scope, controller;

    var settingsMock, handshakeMock, stagesMock, challengesMock, scoresMock;

    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.inject(function($controller, $rootScope, $q) {
            $scope = $rootScope.$new();
            settingsMock = createSettingsMock($q, {});
            handshakeMock = createHandshakeMock($q);
            stagesMock = createStagesMock();
            challengesMock = createChallengeMock();
            scoresMock = createScoreMock();
            controller = $controller('settingsCtrl', {
                '$scope': $scope,
                '$stages': stagesMock,
                '$settings': settingsMock,
                '$handshake': handshakeMock,
                '$challenge': challengesMock,
                '$scores': scoresMock
            });
        });
    });

    describe('initialization', function() {
        it('should initialize', function() {
            //let $settings init
            $scope.$digest();
            expect($scope.addItem).not.toBe(undefined);
            expect($scope.addTable).not.toBe(undefined);
            expect($scope.removeItem).not.toBe(undefined);
            expect($scope.save).not.toBe(undefined);
            expect($scope.removeStage).not.toBe(undefined);
            expect($scope.moveDown).not.toBe(undefined);
            expect($scope.moveUp).not.toBe(undefined);
            expect($scope.createStage).not.toBe(undefined);
        });

    });

    describe('missing settings.json on storage',function() {
        beforeEach(function() {
            fsMock.read = jasmine.createSpy('fsReadSpy').andCallFake(function() {
                return Q.reject(new Error('fake file-not-found for settings'));
            });
        });
        xit('should initialize in editmode when no teams found on storage', function() {
            //TODO: check state after reading
        });
    });

    describe('addItem',function() {
        it('should push an empty object to a collection',function() {
            var coll = [];
            $scope.addItem(coll);
            expect(coll).toEqual([{}]);
        })
    });

    describe('removeItem',function() {
        it('should remove the given index from a collection',function() {
            var coll = [1,2,3];
            $scope.removeItem(coll,1);
            expect(coll).toEqual([1,3]);
        })
    });

    describe('saving',function() {
        it('should write to the file system',function() {
            $scope.settings = 'data';
            $scope.allStages = [1,2,3];
            $scope.save();
            expect(settingsMock.save).toHaveBeenCalledWith();
            expect(stagesMock.clear).toHaveBeenCalled();
            expect(stagesMock.add).toHaveBeenCalled();
            expect(stagesMock.save).toHaveBeenCalledWith();
        });
    });

    describe('removeStage',function() {
        it('should call the servive',function() {
            var stage = {id: 'foo'}
            $scope.removeStage(stage);
            expect(stagesMock.remove).toHaveBeenCalledWith('foo');
        });
    });

    describe('moveDown',function() {
        it('should call the servive',function() {
            var stage = {id: 'foo'}
            $scope.moveDown(stage);
            expect(stagesMock.moveStage).toHaveBeenCalledWith(stage,1);
        });
    });

    describe('moveUp',function() {
        it('should call the servive',function() {
            var stage = {id: 'foo'}
            $scope.moveUp(stage);
            expect(stagesMock.moveStage).toHaveBeenCalledWith(stage,-1);
        });
    });

    describe('createStage',function() {
        it('should emit the newStage handshake and add stage on result',function() {
            handshakeMock.respond({
                stage: {name:'foo',rounds:42}
            });
            $scope.createStage();
            expect(handshakeMock.$emit).toHaveBeenCalledWith('newStage');
            $scope.$digest();
            expect(stagesMock.add).toHaveBeenCalledWith({name:'foo',rounds:42});
        });
        it('should do nothing if no result',function() {
            handshakeMock.respond();
            $scope.createStage();
            expect(handshakeMock.$emit).toHaveBeenCalledWith('newStage');
            $scope.$digest();
            expect(stagesMock.add).not.toHaveBeenCalled();
        });
    })
});
