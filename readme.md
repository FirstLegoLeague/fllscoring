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

iOS build
-------
For the iOS build to work, you need a certificate and provisioning profile. To do so:
- Make sure you are a (paid) member of the iOS developer program
- Go to https://developer.apple.com/account and log in with your credentials
- If you do not have a distribution certificate yet, click on "Certificates" and then the "+". Afterwards, follow the instructions
- Afterwards, click on "App IDs" in the left column
- Click the "+" to add an app ID. You can also use the * wildcard
- Click "All" under "Provisioning Profiles" and click the "+"
- Select "Ad Hoc" distribution if you want to distribute the app ad hoc or "App Store" to distribute it to the Apple App Store
- Follow the instructions by selecting the app ID, your certificate and, in case you request an add hoc profile, the devices for which this build will be for
- Download the profile
- Open "Keychain Access.app" on your Mac
- Search for the private key belonging to your distribution certificate and right click it. Select export
- Make sure the .p12 file format is selected and save the file somewhere
- You need to have a passphrase, otherwise the Phonegap Build Service will not accept your file
- Upload both this .p12 file and the provisioning profile you downloaded to Phonegap Build (at your accout, signing keys)
- Don't forget you unlock your key with the passphrase you provided!
- If all went OK, you can now link the key to your app and you should be good to go
- Don't forget to uncomment the lines for iOS in `Gruntfile.js`

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
