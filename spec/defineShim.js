!function() {
	var store = {};
	this.factory = function(name,deps) {
		var resolvedDeps = store[name].deps.map(function(dep) {
			return deps[dep]||undefined;
		});
		return store[name].factory.apply(this,resolvedDeps);
	} 
	this.define = function(name,deps,factory) {
		//store factories in a global store
		store[name] = {
			factory: factory,
			deps: deps
		}
	};
}();