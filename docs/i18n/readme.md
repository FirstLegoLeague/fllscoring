Internationalization (i18n)
===========================

To prevent a performance hit during runtime, we need i18n to be done before runtime.

For node, a nice library is [i18n-2](https://github.com/jeresig/i18n-node-2), however, for the phonegap instance, there is no server.

An approach could be to generate internationalized versions of html files using templates and a grunt task. Much like the approach in [this repo](https://github.com/ca77y/grunt-i18n). Maybe we can contribute on the project. After generating localized versions, we can either create localized distributions or add a language setting somewhere in the app.

The latter option would require us to include all localized files in the builds, which would result in bigger builds.

Lastly, we should be careful not to include any ui strings in js libraries.