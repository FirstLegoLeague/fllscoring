FLL Scoring
=============

To have a look at what we are at, see [Testing](https://github.com/FirstLegoLeague/fllscoring/wiki/Testing). No guarantees.

Development prerequisites
---------------

- nodejs [nodejs.org](http://nodejs.org). Make sure you have a recent version (>.10)
- bower (`npm install -g bower`)
- grunt (`npm install -g grunt-cli`)

Steps
------

- Clone the repository
- `npm install`
- `bower install`

Building
--------

- for a desktop build: `grunt nodewebkit`
- for a mobile build: `grunt phonegap`

For the phonegap build, copy `pgbuildconfig.example.json` to `pgbuildconfig` and adjust your phonegap build credentials. You can create an account on [phonegap build](http://build.phonegap.com/)

For iOS, see [Building for iOS](https://github.com/FirstLegoLeague/fllscoring/wiki/Building-for-iOS)

Run local
--------

- `node localserver.js` then open [localhost:1390](http://localhost:1390)

Testing
-------

- run `karma start`
- or run `grunt karma`

Documentation
-------------

- [original proposal](docs/proposal/Scoring System project proposal-v2.pdf)
- [architecture documents](docs/architecture/readme.md)
- [templating](docs/templating/readme.md)
- [interface](docs/user_interface/readme.md)
- [internationalization](docs/i18n/readme.md)

TODO's
--------

See [case issues](https://github.com/FirstLegoLeague/fllscoring/issues?direction=desc&labels=case&page=1&sort=updated&state=open)

Help is welcome. Please comment on the case if you plan to start working on one.

Authors
--------

- [Rikkert Koppes](mailto:rikkert@rikkertkoppes.com)
