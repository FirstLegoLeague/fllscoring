var createServerlogMock = function() {
    let log = {};

    ['debug','info','warn','error','fatal'].forEach(level => {
        log[level] = jasmine.createSpy(`log.${level}`);
    });

    return log;
};
