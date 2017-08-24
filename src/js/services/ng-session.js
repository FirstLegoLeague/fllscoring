define('services/session',[
	'services/ng-services',
], function(module) {

	return module.service('$session', [
		'$http',
		function($http) {

		var eventListeners = [];
		var session = {};

		$http.get('/session').then(function(response) {
			for(var key in response.data) {
				session[key] = response.data[key];
			}

			eventListeners.forEach(function(eventListener) {
				eventListener();
			});
		});

	    return {
	    	get: function(key) {
	    		return session[key];
		    },
		    keys: function() {
		    	return Object.keys(session);
		    },
		    onload: function(func) {
		    	if(typeof func === 'function') {
		    		eventListeners.push(func);
		    	}
		    }
		};

	}]);
});
