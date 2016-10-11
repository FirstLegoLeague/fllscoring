describe('NewStageDialogController',function() {

    var module = factory('controllers/NewStageDialogController',{
        'services/log': logMock,
    });

    var $scope, controller, handshakeMock;

    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.inject(function($controller,$rootScope,$q) {
            $scope = $rootScope.$new();
            handshakeMock = createHandshakeMock($q);
            controller = $controller('NewStageDialogController', {
                '$scope': $scope,
                '$handshake': handshakeMock
            });
        });
    });

    describe('handshake receive',function() {
        it('should show the dialog',function() {
            handshakeMock.fire('newStage');
            expect($scope.stage).toEqual({rounds:1});
            expect($scope.dialogVisible).toBe(true);
            expect($scope.generateId).toBe(true);
        });
    });

    describe('nameChanged',function() {
        it('should generate an id if id is not manually set',function() {
            $scope.generateId = true;
            $scope.stage.name = 'foo';
            expect($scope.stage.id).toBeUndefined();
            $scope.nameChanged();
            expect($scope.stage.id).toBe('foo');
        });
        it('should not generate an id if id is manually set',function() {
            $scope.generateId = false;
            $scope.stage.name = 'foo';
            expect($scope.stage.id).toBeUndefined();
            $scope.nameChanged();
            expect($scope.stage.id).toBeUndefined();
        });
        it('should create underscores for spaces and remove anything not valid as id',function() {
            $scope.generateId = true;
            $scope.stage.name = 'foo bar %&!baz[]//?';
            $scope.nameChanged();
            expect($scope.stage.id).toBe('foo_bar_baz');
        });
    });

    describe('idChanged',function() {
        it('should set the generateId flag to false as id is manually provided',function() {
            $scope.idChanged();
            expect($scope.generateId).toBe(false);
        });
    });

    describe('ok ',function() {
        it('should hide the dialog',function() {
            handshakeMock.fire('newStage',{});
            $scope.dialogVisible = true;
            $scope.stage = {
                name: 'foo',
                rounds: 42
            };
            $scope.ok();
            expect($scope.dialogVisible).toBe(false);
            expect(handshakeMock.getPromise().resolve).toHaveBeenCalledWith({
                stage: {
                    name: 'foo',
                    rounds: 42
                }
            });
        });
    });

    describe('cancel',function() {
        it('should hide the dialog',function() {
            handshakeMock.fire('newStage',{});
            $scope.dialogVisible = true;
            $scope.cancel();
            expect($scope.dialogVisible).toBe(false);
            expect(handshakeMock.getPromise().resolve).toHaveBeenCalled();
        });
    });

    describe('stageDefValid',function() {
        it('should return false if id not filled in',function() {
            $scope.stage = {
                id: '',
                name: 'foo'
            };
            expect($scope.stageDefValid()).toBe(false);
        });
        it('should return false if name not filled in',function() {
            $scope.stage = {
                id: 'foo',
                name: ''
            };
            expect($scope.stageDefValid()).toBe(false);
        });
        it('should return true if name and id present not filled in',function() {
            $scope.stage = {
                id: 'foo',
                name: 'foo'
            };
            expect($scope.stageDefValid()).toBe(true);
        });
    })
});
