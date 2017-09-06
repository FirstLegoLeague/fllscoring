var createScoreMock = function (defaultScore) {
    Score = jasmine.createSpy('$score').and.returnValue(defaultScore);
    Score.compare = jasmine.createSpy('$scoreCompare');
    Score.generateUniqueId = jasmine.createSpy('$scoreGenerateUID').and.returnValue(String(0x100000000));
    Score.sanitize = jasmine.createSpy('$scoreSanitize');
    return Score;
};
