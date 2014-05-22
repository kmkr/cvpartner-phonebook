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
3. The API supports fetching of masterdata, such as user expertise, certifications, categories and tags. Create statistics based on some of this data, either in table form or by using graphs.
4. Buy the organizers a beer.

masterdata API
==============

These are just examples, please feel free to explore the API for other kind of data.

https://[redacted].cvpartner.no/api/v1/masterdata/certifications/name
https://[redacted].cvpartner.no/api/v1/masterdata/project_experiences/industry
https://[redacted].cvpartner.no/api/v1/masterdata/technologies/category
https://[redacted].cvpartner.no/api/v1/masterdata/technologies/category/52dd823e2f274f779b000003/tags
