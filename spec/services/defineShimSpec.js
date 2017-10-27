/**
 * Tests for our RequireJS 'substitute'.
 * See defineShim.js itself for reasoning.
 */

var moduleInstanceCounter = 0;

define('test/amd_module_1', [], function () {
    return {
        name: 'amd1',
        count: moduleInstanceCounter++,
    };
});

define('test/amd_module_2', ['test/amd_module_1'], function (mod1) {
    return {
        name: 'amd2',
        mod1: mod1,
    };
});

define('test/commonjs_module_1', function (require, exports, module) {
    var mod1 = require('./amd_module_1');
    var mod2 = require('./amd_module_2');
    exports.name = 'cjs1';
    exports.mod1 = mod1;
    exports.mod2 = mod2;
});

define('test/complex', function (require, exports, module) {
    var cjs1 = require('../foo/..///test/./commonjs_module_1');
    exports.cjs1 = cjs1;
});

define('test/broken1', function (require, exports, module) {
    var cjs1 = require('../../test/commonjs_module_1'); // too deep
    exports.cjs1 = cjs1;
});

define('test/broken2', function (require, exports, module) {
    var cjs1 = require('test/commonjs_module_1'); // not relative path
    exports.cjs1 = cjs1;
});

describe('defineShim', function () {
    it('understands AMD module without dependencies', function () {
        var mod1 = factory('test/amd_module_1');
        expect(mod1.name).toBe('amd1');
    });

    it('understands AMD module with dependencies', function () {
        var mod2 = factory('test/amd_module_2');
        expect(mod2.name).toBe('amd2');
        expect(mod2.mod1.name).toBe('amd1');
    });

    it('understands commonJS module with dependencies', function () {
        var mod3 = factory('test/commonjs_module_1');
        expect(mod3.name).toBe('cjs1');
        expect(mod3.mod2.mod1.name).toBe('amd1');
    });

    it('understands commonJS module dependency relative paths', function () {
        var mod = factory('test/complex');
        expect(mod.cjs1.name).toBe('cjs1');
    });

    it('prevents commonJS module dependency going up too far', function () {
        expect(function () {
            var mod = factory('test/broken1');
        }).toThrowError(/cannot go up/);
    });

    it('prevents commonJS module dependency absolute paths', function () {
        expect(function () {
            var mod = factory('test/broken2');
        }).toThrowError(/relative path/);
    });

    it('allows customizing dependencies', function () {
        var mod2 = factory('test/amd_module_2', {
            'test/amd_module_1': { name: 'replaced' },
        });
        expect(mod2.name).toBe('amd2');
        expect(mod2.mod1.name).toBe('replaced');
    });

    it('allows customizing sub dependencies', function () {
        var mod3 = factory('test/commonjs_module_1', {
            'test/amd_module_1': { name: 'replaced' },
        });
        expect(mod3.name).toBe('cjs1');
        expect(mod3.mod2.mod1.name).toBe('replaced');
    });

    it('instantiates modules ones within one factory call', function () {
        var mod3 = factory('test/commonjs_module_1');
        expect(mod3.mod2.mod1.count).toBe(mod3.mod1.count);
    });

    it('reinstantiates modules between factory calls', function () {
        var a = factory('test/amd_module_1');
        var b = factory('test/amd_module_1');
        expect(b.count).toBe(a.count + 1);
    });

    it('throws on duplicate module name', function () {
        expect(function () {
            define('test/amd_module_1', [], function () { });
        }).toThrowError(/duplicate module name/);
    });

    it('throws on invalid module name', function () {
        expect(function () {
            define({}, [], function () { });
        }).toThrowError(/invalid module name/);
    });

    it('throws on invalid AMD dependencies', function () {
        expect(function () {
            define('test/something', {}, function () { });
        }).toThrowError(/invalid dependencies/);
    });
});
