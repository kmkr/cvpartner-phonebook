cvpartner-phonebook
===================

Explore public API of https://[redacted].cvpartner.no/help/api# to create
a phonebook of all listed users.

requirements
============
- Node.js (http://nodejs.org/)
- PhantomJS (http://phantomjs.org/)

setup
=====
- npm install -g grunt && npm install -g grunt-cli
- npm install
- create a file *server/api-token* containing the auth token for the CV API
- create a file *server/api-hostname* containing the hostname of the CV API

run
===
- grunt server starts a server on localhost:8000
- Enable mockdata by changing `phonebook` in `body ng-app="phonebook"` with `phonebookMock`

emulate android
===============
- Install Android SDK
- Set ANDROID_HOME to sdk folder
- Add /tools and /platform-tools to PATH
- npm install -g cordova
- android list targets
- android create avd -n <name> -t <targetID>

run emulation
=============
- grunt dist
- cd cordova-phonebook
- cordova run
