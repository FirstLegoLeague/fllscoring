function requireCommon(className) {
    let constructor = require(`../common/${className}`);
    return constructor(className.deps.map(requireCommon));
}
