var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');

var auth = require('./auth');
var config = require('./config');

// Handle the SSL certificate settings
var privateKey  = fs.readFileSync(config.server.privateKey, 'utf8');
var certificate = fs.readFileSync(config.server.certificate, 'utf8');
var credentials = {
  key: privateKey,
  cert: certificate,
  passphrase: config.server.passphrase
};

// Create an https server
var app = express();
var httpsServer = https.createServer(credentials, app);

// Handle each endpoint
app.get('/login', auth.handleLogin)

// By default return a 404 Not Found
app.use(function(req, res){
  res.sendStatus(404);
});

// TODO: This is convenient for testing but should probably be removed
process.on('uncaughtException', function (err) {
  console.log(err);
});

// Start the https server
httpsServer.listen(config.server.port);
