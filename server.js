var https = require('https');
var http = require('http');
var fs = require('fs');
var q = require('q');
var express = require('express');

var app = express();
app.get('/api/users', function(req, res) {
    fetchUsers().then(function(users) {
        res.send(JSON.stringify(users.map(function(user) {
            return {
                name: user.name,
                email: user.email
            };
        })));
    });
});
app.use(express.static(__dirname + '/src'));
http.createServer(app).listen(8080);
console.log('Started HTTP server on port 8080');

var fetchUsers = function() {
    var requestOpts = {
        hostname: (''+fs.readFileSync('server/api-hostname')).replace(/[\r\n]/g, ''),
        port: 443,
        path: '/api/v1/users',
        method: 'GET',
        headers: {
            Authorization: 'Token token="' + (''+fs.readFileSync('server/api-token')).replace(/[\r\n]/g, '') + '"'
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
    var deferred = q.defer();
    deferred.resolve([
        { name: 'Borghild Balder', email: 'Borghild.Balder@foo.com' },
        { name: 'Gandalf Ask', email: 'Gandalf.Ask@foo.com' },
        { name: 'Hel Gerd', email: 'Hel.Gerd@foo.com' },
        { name: 'Thor Vidar', email: 'Thor.Vidar@foo.com' },
        { name: 'Sif Oden', email: 'Sif.Oden@foo.com' },
        { name: 'Sigurd Borghildr', email: 'Sigurd.Borghildr@foo.com' }
    ]);
    return deferred.promise;
};

if ('dev' === process.argv[2]) {
    fetchUsers = fetchMockUsers;
}
