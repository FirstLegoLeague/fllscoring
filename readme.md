FLL Scoring
=============

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

Run local
--------

- `node localserver.js` then open [localhost:1390](http://localhost:1390)

Testing
-------

- run `karma start`
- or run `grunt karma`

Documentation
-------------

- [architecture documents](docs/architecture/readme.md)
- [internationalization](docs/i18n/readme.md)

TODO's
--------

1. think about a templating framework (prefer angular atm)
1. sketch up interfaces
1. create a visual language (styling rules) or use e.g. bootstrap.
1. create artwork for phonegap (see `src/res/`)
1. create uniform filesystem api module
1. come up with quantitative and qualitative scoresheet formats (as a starter)
1. come up with a team list format (should be a simple list)
1. create qualitative score sheet
1. create quantitative scoresheet
1. create ranking screen
1. create communication module (define what it should do in the first place)
1. create mission definition screen (desktop only)
1. create team administration screen (desktop only)

Authors
--------

- [Rikkert Koppes](mailto:rikkert@rikkertkoppes.com)