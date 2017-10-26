/**
 * This shim replaces RequireJS (which is used outside the tests), and allows
 * modules to be injected with e.g. mocks instead of the 'real deal', if necessary.
 *
 * It adds two functions to the global namespace: define() and factory().
 */
!function() {
    var store = {};

    /**
     * Resolve the relative path of the require'd module
     * to the current module's basename.
     * e.g. if name = "common/foo" and dep = "./bar",
     * result will be "common/bar".
     */
    function resolveRelativeDependency(name, dep) {
        var base = name.split("/");
        var relative = dep.split("/");
        base.pop(); // take the 'filename' off, leaving the 'current folder'
        if (relative[0] !== "." && relative[0] !== "..") {
            throw new Error("invalid dependency '" + dep + "' in module '" + name + "': relative path expected");
        }
        while (relative.length > 0) {
            var part = relative.shift();
            if (part === "" || part === ".") {
                continue;
            } else if (part === "..") {
                if (base.length === 0) {
                    throw new Error("invalid dependency '" + dep + "' in module '" + name + "': cannot go up this far");
                }
                base.pop();
            } else {
                base.push(part);
            }
        }
        return base.join("/");
    }

    function resolve(name, deps, cache) {
        if (typeof name !== "string") {
            throw new Error("factory(): invalid module name: " + name);
        }

        if (cache[name]) {
            return cache[name];
        }

        if (!store[name]) {
            throw new Error("factory(): module " + name + " is not yet define()'ed");
        }

        if (store[name].deps !== undefined) {
            // 'Normal' AMD module, as used in all of our front-end code.

            // Resolve dependencies of this module to either the
            // passed in custom dependencies, or the 'real' ones.
            var resolvedDeps = store[name].deps.map(function(dep) {
                // Use custom deps, if passed
                if (deps && dep in deps) {
                    return deps[dep];
                }
                // Use the 'real' module instead, but make sure that if
                // that real module uses a dependency that we want to
                // override, we use that instead.
                return resolve(dep, deps, cache);
            });

            // Instantiate module
            cache[name] = store[name].factory.apply(this, resolvedDeps);
        } else {
            // UMD style module, as used in our common (client+server) code.

            function require(dep) {
                if (typeof dep !== "string" || dep === "") {
                    throw new Error("invalid dependency '" + dep + "' in module '" + name + "'");
                }
                return resolve(resolveRelativeDependency(name, dep), deps, cache);
            }
            var module = { exports: {} };
            var exports = module.exports;

            // Instantiate module
            store[name].factory.call(this, require, exports, module);
            cache[name] = module.exports;
        }

        return cache[name];
    }

    /**
     * Instantiate module including dependencies.
     *
     * Obtain reference to module, optionally passing in an object of dependencyName => object pairs to
     * instantiate a version of the module using any 'custom' dependency (e.g. mocked versions).
     *
     * All modules (including dependencies) created during the call to factory() are guaranteed to be
     * instantiated just once within this call to factory(), but the next call to factory() will
     * use a new module cache.
     *
     * Note that the angular and jquery modules behave special, in that they are global instances
     * that are not (re)created for each call to factory().
     * This means that every factory call for a module using e.g. ng-services will create a new instance
     * of the ng-services angular module (angular.module('ng-services', [])), so later calls to
     * factory() will 'disconnect' that earlier module.
     * Thus, you must make sure that any call to factory() immediately precedes the tests you're
     * running, e.g. by placing it in a beforeEach() (not directly in the body of e.g. describe()).
     *
     * Shim for RequireJS functionality.
     *
     * @param name {string} Name of module to instantiate
     * @param deps {Object} Optional key-value pairs of dependencies to override
     */
    this.factory = function(name, deps) {
        return resolve(name, deps, {});
    };

    /**
     * Define a module to be instantiated later using `factory()`.
     *
     * Shim for RequireJS define functionality.
     *
     * @see documentation of `factory()` for caveats.
     *
     * @param name {string} Name of module, e.g. "services/ng-scores"
     * @param deps {Array<string>} Optional array of dependencies. @see `factory`
     * @param factory {Function} When deps are given, function receiving deps as args, returning the module, when
     *            no deps are given, function receiving `require`, `exports`, `module`, returning nothing
     *            (setting its exports through `exports` or `module.exports`).
     */
    this.define = function(name, deps, factory) {
        if (typeof name !== "string") {
            throw new Error("factory(): invalid module name: " + name);
        }
        if (store[name]) {
            throw new Error("factory(): duplicate module name: " + name);
        }
        if (typeof deps === "function") {
            // This is a UMD-style call, which only passes the module name
            // and a factory function which expects to receive
            // `require`, `exports`, and `module`.
            factory = deps;
            deps = undefined;
        } else {
            if (!Array.isArray(deps)) {
                throw new Error("factory(): invalid dependencies (expected an array): " + deps);
            }
        }
        //store factories in a global store
        store[name] = {
            factory: factory,
            deps: deps
        };
    };
}();

// Pre-register 'well-known' modules
define("jquery", [], function() { return $; });
define("angular", [], function () { return angular; });
