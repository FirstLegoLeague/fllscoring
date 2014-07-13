describe('scoresheet',function() {

	var module = factory('views/scoresheet',{
		'services/log': logMock
    });

	var $scope, controller;
	var dummyTeam =  {
		number: '123',
		name: 'foo'
	};
	var fsMock;

    beforeEach(function() {
    	fsMock = {
			read: jasmine.createSpy('fsRead').andReturn({
				then: function(){}
			}),
			write: jasmine.createSpy('fsWrite').andReturn({
				then: function(){
					return {
						then: function(){}
					}
				}
			})
		};
        angular.mock.module(module.name);
        angular.mock.inject(function($controller,$rootScope) {
        	$scope = $rootScope.$new();
        	controller = $controller('scoresheetCtrl', {
        		'$scope': $scope,
        		'$fs': fsMock,
        		'$scores': {},
                '$modal': {},
                '$challenge': {}
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
})
