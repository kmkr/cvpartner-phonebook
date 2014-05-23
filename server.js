if (!process.env.CVPARTNER_HOSTNAME) {
    console.log('Please set the CVPARTNER_HOSTNAME environment variable');
    return;
}
if (!process.env.CVPARTNER_TOKEN) {
    console.log('Please set the CVPARTNER_TOKEN environment variable');
    return;
}


var https = require('https');
var http = require('http');
var fs = require('fs');
var q = require('q');
var express = require('express');

var app = express();
app.get('/api/users', function(req, res) {
    fetchUsers().then(function(users) {
        console.log('Fetched %s users', users.length);
        res.send(JSON.stringify(users.map(function(user) {
            return {
                name: user.name,
                email: user.email,
                telephone: user.telephone
            };
        })));
    });
});
app.use(express.static(__dirname + '/src'));
http.createServer(app).listen(8080);
console.log('Started HTTP server on port 8080');


var fetchUsers = function() {
    console.log('Fetching production data');
    var requestOpts = {
        hostname: process.env.CVPARTNER_HOSTNAME,
        port: 443,
        path: '/api/v1/users',
        method: 'GET',
        headers: {
            Authorization: 'Token token="' + process.env.CVPARTNER_TOKEN + '"'
        }
    };
    var deferred = q.defer();
    var req = https.request(requestOpts, function(res) {
        var data = '';
        res.on('data', function(d) {
            data += d;
        });

        res.on('end', function() {
            deferred.resolve(JSON.parse(data));
        });
    });
    req.end();

    req.on('error', function(e) {
        console.error(e);
    });
    return deferred.promise;
};

var fetchMockUsers = function() {
    console.log('Fetching mock data');
    var deferred = q.defer();
    deferred.resolve([
        { name: 'Borghild Balder', email: 'Borghild.Balder@foo.com', telephone: '480 47 878' },
        { name: 'Gandalf Ask', email: 'Gandalf.Ask@foo.com', telephone: '901 52 711' },
        { name: 'Hel Gerd', email: 'Hel.Gerd@foo.com', telephone: '98665838' },
        { name: 'Thor Vidar', email: 'Thor.Vidar@foo.com', telephone: '' },
        { name: 'Sif Oden', email: 'Sif.Oden@foo.com', telephone: '+47 926 17 422' },
        { name: 'Sigurd Borghildr', email: 'Sigurd.Borghildr@foo.com', telephone: '+47-92663081' }
    ]);
    return deferred.promise;
};

if ('dev' === process.argv[2]) {
    fetchUsers = fetchMockUsers;
}
