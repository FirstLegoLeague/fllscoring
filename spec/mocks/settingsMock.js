function createSettingsMock($q, settings) {
    return {
        settings: angular.copy(settings),
        init: jasmine.createSpy('settingsInitSpy').and.returnValue($q.when(settings)),
        save: jasmine.createSpy('settingsSaveSpy').and.returnValue($q.when())
    };
}
