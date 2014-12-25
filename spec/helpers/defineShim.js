!function() {
	var store = {};
    var inited = {};
	this.factory = function(name,deps,force) {
        if (inited[name] && !force) {
            return inited[name];
        }
		if (!store[name]) {
			console.log('unable to find module',name,'in store');
			console.log(JSON.stringify(store,null,2));
			return;
		}
		deps = deps||{};
		var resolvedDeps = store[name].deps.map(function(dep) {
			return deps[dep]||undefined;
		});
        inited[name] = store[name].factory.apply(this,resolvedDeps);
		return inited[name];
	};
	this.define = function(name,deps,factory) {
		//store factories in a global store
		store[name] = {
			factory: factory,
			deps: deps
		};
	};
}();
