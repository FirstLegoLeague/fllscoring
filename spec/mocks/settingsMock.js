function createSettingsMock(settings) {
    return {
        settings: settings,
        init: jasmine.createSpy('settingsInitSpy').andReturn(Q.when(settings)),
        save: jasmine.createSpy('settingsSaveSpy').andReturn(Q.when())
    };
}
