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
    fetch('/api/v1/users').then(function(users) {
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
app.get('/api/categories/:category', function(req, res) {
    fetch('/api/v1/search?query[0]=' + req.params.category + '&filter_fields[0]=_all&office_ids[]=52726286e79c697aa4000001&office_ids[]=51a6755f6fc6269990000001&office_ids[]=4f6074ee875b52672f000001&office_ids[]=527261e1e79c69b457000001&office_ids[]=52726121e79c6997ab000001&office_ids[]=52725fc2e79c69d555000001&office_ids[]=52726249e79c69c572000001&office_ids[]=52f16e122f274f8aa0000001&office_ids[]=5272614ce79c69e986000001&office_ids[]=51a675d46fc626e7f8000001&office_ids[]=51a675926fc626fead000001&size=1').then(function(data) {
        res.send(JSON.stringify(data.total));
    });
});
app.use(express.static(__dirname + '/src'));
http.createServer(app).listen(8080);
console.log('Started HTTP server on port 8080');


var fetch = function(url) {
    console.log('Fetching production data from ' + url);
    var requestOpts = {
        hostname: process.env.CVPARTNER_HOSTNAME,
        port: 443,
        path: url,
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
            console.log(data);
            deferred.resolve(JSON.parse(data));
        });
    });
    req.end();

    req.on('error', function(e) {
        console.error(e);
    });
    return deferred.promise;
};

var fetchMock = function(url) {
    console.log('Fetching mock data');

    var deferred = q.defer();
    if (url.match(/users/)) {
        deferred.resolve([
            { name: 'Borghild Balder', email: 'Borghild.Balder@foo.com', telephone: '480 47 878' },
            { name: 'Gandalf Ask', email: 'Gandalf.Ask@foo.com', telephone: '901 52 711' },
            { name: 'Hel Gerd', email: 'Hel.Gerd@foo.com', telephone: '98665838' },
            { name: 'Thor Vidar', email: 'Thor.Vidar@foo.com', telephone: '' },
            { name: 'Sif Oden', email: 'Sif.Oden@foo.com', telephone: '+47 926 17 422' },
            { name: 'Sigurd Borghildr', email: 'Sigurd.Borghildr@foo.com', telephone: '+47-92663081' }
        ]);
    } else {
        deferred.resolve(3);
    }
    return deferred.promise;
};

if ('dev' === process.argv[2]) {
    fetch = fetchMock;
}
