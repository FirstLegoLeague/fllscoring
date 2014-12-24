function createSettingsMock($q, settings) {
    return {
        settings: settings,
        init: jasmine.createSpy('settingsInitSpy').andReturn($q.when(settings)),
        save: jasmine.createSpy('settingsSaveSpy').andReturn($q.when())
    };
}
