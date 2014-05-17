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
- generate a self-signed sertificate
  - openssl req -newkey rsa:2048 -new -nodes -x509 -days 365 -keyout serverkey.pem -out servercert.pem
  - place in 'server/ssh' folder.

run
===
- node server/server.js starts a server on localhost:8000
- node server/server.js dev starts a server on localhost:8000 with mock-data
