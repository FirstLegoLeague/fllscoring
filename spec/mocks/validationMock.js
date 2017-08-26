var createValidationMock = function() {
    return {
        validate: jasmine.createSpy('validationSpy').and.returnValue([])
    };
}
