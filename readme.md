[![Build Status](https://travis-ci.org/FirstLegoLeague/fllscoring.png?branch=master)](https://travis-ci.org/FirstLegoLeague/fllscoring)
[![Coverage Status](https://coveralls.io/repos/FirstLegoLeague/fllscoring/badge.png?branch=master)](https://coveralls.io/r/FirstLegoLeague/fllscoring?branch=master)
[![Dependency Status](https://david-dm.org/FirstLegoLeague/fllscoring.png)](https://david-dm.org/FirstLegoLeague/fllscoring)
[![devDependency Status](https://david-dm.org/FirstLegoLeague/fllscoring/dev-status.png)](https://david-dm.org/FirstLegoLeague/fllscoring#info=devDependencies)

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
- `bower install` (this should be done automatically by npm install)

Building
--------

- for a desktop build: `grunt nodewebkit`
- for a mobile build: `grunt phonegap`
 - to build only one of iOS or Android, use `grunt phonegap:ios` or `grunt phonegap:android` respectively

For the phonegap build, copy `pgbuildconfig.example.json` to `pgbuildconfig.json` and adjust your phonegap build credentials. You can create an account on [phonegap build](http://build.phonegap.com/). Also, make sure you you copy .cordova/config.example.json to .cordova/config.json and insert your application ID from phonegap build into it. The first time you build the app you must comment the app ID line out, it will generate one for you. Afterwards check the Phonegap build website for the generated app ID.

For iOS, see [Building for iOS](https://github.com/FirstLegoLeague/fllscoring/wiki/Building-for-iOS)

To build js challenge files from the xml description files, use

	 node tools\buildchallenge.js challenges\xml\2014.xml > challenges\js\2014.js

Run local
--------

- `node localserver.js` then open [localhost:1390](http://localhost:1390)
	- to specify another port, use `node localserver.js -p 8000`

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

Generating HTML and PDF scoresheets
-----------------------------

- run `grunt html`
- run `grunt pdf`

These files are also included in the repo: `challenges/html` and `challenges/pdf`

TODO's
--------

See [case issues](https://github.com/FirstLegoLeague/fllscoring/issues?direction=desc&labels=case&page=1&sort=updated&state=open)

Help is welcome. Please comment on the case if you plan to start working on one.

Authors
--------

- [Rikkert Koppes](mailto:rikkert@rikkertkoppes.com)
