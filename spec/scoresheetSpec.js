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
        		'$results': {},
                '$modal': {}
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
})
