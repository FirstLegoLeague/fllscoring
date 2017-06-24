define('services/session',[
	'services/ng-services',
], function(module) {

	return module.service('session', [
		'$http',
		function($http) {
	
		var session = {};
		$http.get('/session').then(function(response) {
			for(var key in response) {
				session[key] = response[key];
			}
		});

	    return {
	    	get: function(key) {
	    		return session[key];
		    },
		    keys: function() {
		    	return Object.keys(session);
		    }
		};

	}]);
});
