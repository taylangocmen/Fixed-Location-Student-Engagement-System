var fs = require('fs');
var https = require('https');
var express = require('express');
var bodyParser = require('body-parser');

var auth = require('./auth');
var config = require('./config');
var wifiInfo = require('./wifi_info');

var question = require('./question');
var poseQuestion = require('./pose_question');

var createCourse = require('./create_course');

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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Handle each endpoint
app.post('/login', auth.handleLogin);
app.post('/register', auth.handleRegister);
app.post('/updateWifiInfo', wifiInfo.handleUpdateWifiInfo);
app.post('/question', question.handle);
app.post('/create_course', createCourse.handle);

app.put('/question', poseQuestion.handle);

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
