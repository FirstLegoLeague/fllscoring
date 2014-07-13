describe('scoresheet',function() {

	var module = factory('views/scoresheet',{
		'services/log': logMock
    });

	var $scope, controller;
	var dummyTeam =  {
		number: '123',
		name: 'foo'
	};
	var fsMock = createFsMock();

    beforeEach(function() {
        angular.mock.module(module.name);
        angular.mock.inject(function($controller,$rootScope) {
        	$scope = $rootScope.$new();
        	controller = $controller('scoresheetCtrl', {
        		'$scope': $scope,
        		'$fs': fsMock,
        		'$scores': {},
                '$modal': {},
                '$challenge': {},
                '$window': {
                    Date: function() {
                        this.valueOf = function() {
                            return 42;
                        };
                    }
                }
        	});
        });
    });

    beforeEach(function() {
    	//spy setPage method;
    	$scope.setPage = jasmine.createSpy('setPage');
    });

    describe('initialization',function() {
    	it('should initialize',function() {

    	});
    });

    describe('showteams', function() {
        it('shoud select the teams page', function() {
            $scope.showTeams();
            expect($scope.setPage).toHaveBeenCalledWith('teams');
        });
    });

    describe('selectTeam', function() {
        it('shoud set the team on the scope', function() {
            $scope.selectTeam(dummyTeam);
            expect($scope.team).toBe(dummyTeam);
        });

        it('should call the selectTeam method on selectTeam event',function() {
            $scope.selectTeam = jasmine.createSpy('selectTeam');
            $scope.$root.$emit('selectTeam',dummyTeam);
            expect($scope.selectTeam).toHaveBeenCalledWith(dummyTeam);
        });
    });

    describe('saving',function() {
        it('should not save when no team is selected',function() {
            $scope.save();
            expect(fsMock.write).not.toHaveBeenCalled();
        });
        it('should save',function() {
            $scope.team = dummyTeam;
            $scope.field = {};
            $scope.match = 1;
            $scope.settings = {
                table: 3
            };
            spyOn(Date,'valueOf').andReturn(42);
            $scope.signature = [1,2,3,4];
            $scope.save();
            expect(fsMock.write.mostRecentCall.args[0]).toEqual('score_3_123_42.json');
            expect(fsMock.write.mostRecentCall.args[1]).toEqual({
                team: dummyTeam,
                match: $scope.match,
                table: $scope.settings.table,
                signature: $scope.signature
            });
        });
    });
})
