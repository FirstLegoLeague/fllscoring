define('services/session',[
	'services/ng-services',
], function(module) {

	return module.service('$session', [
		'$http',
		function($http) {

		var session = {};

	    return {
            load: function() {
                return $http.get('/session').then(function(response) {
                    for(var key in response.data) {
                        session[key] = response.data[key];
                    }
                    return session;
                });
            },
	    	get: function(key) {
	    		return session[key];
		    },
		    keys: function() {
		    	return Object.keys(session);
		    }
		};

	}]);
});
