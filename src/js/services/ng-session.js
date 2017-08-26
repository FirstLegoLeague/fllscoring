define('services/ng-session',[
	'services/ng-services',
], function(module) {

	return module.service('$session', [
		'$http',
		function($http) {

		var session = {};

	    return {
            load: function() {
                return $http.get('/session').then(function(response) {
                    session = response.data;
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
