cvpartner-phonebook
===================

Explore public API of https://[redacted].cvpartner.no/help/api# to create
a phonebook of all listed users.

software
========

When using a browser

- Node.js (http://nodejs.org/)
- PhantomJS for running tests (http://phantomjs.org/)

When using a phone

In addition to the ones for a browser:

- Java (https://www.java.com/en/download/)
- Ant (http://ant.apache.org/bindownload.cgi)
- Android SDK (http://developer.android.com/sdk/index.html)

setup
=====
- npm install -g grunt && npm install -g grunt-cli
- npm install
- set the environment value CVPARTNER_TOKEN to the auth token for the CV API
- set the environment value CVPARTNER_HOSTNAME the hostname of the CV API

run
===
- node server.js starts a server on localhost:8080
- node server.js dev starts a server on localhost:8080 with mock-data

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

suggested tasks
===============

1. Create a list of phone numbers. Let the user filter the list both by the owner's partial name and phone number.
2. Make each name clickable and open a new view containing user data.
3. Buy the organizers a beer.
