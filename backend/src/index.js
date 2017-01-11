var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');

var auth = require('./auth');

var privateKey  = fs.readFileSync('ca/private/localhost.key.pem', 'utf8');
var certificate = fs.readFileSync('ca/certs/localhost.cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate, passphrase: 'password'};

var app = express();

var httpsServer = https.createServer(credentials, app);

app.get('/login', auth.handleLogin)

process.on('uncaughtException', function (err) {
    console.log(err);
});

httpsServer.listen(443);
