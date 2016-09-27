function createSettingsMock($q, settings) {
    return {
        settings: settings,
        init: jasmine.createSpy('settingsInitSpy').and.returnValue($q.when(settings)),
        save: jasmine.createSpy('settingsSaveSpy').and.returnValue($q.when())
    };
}
