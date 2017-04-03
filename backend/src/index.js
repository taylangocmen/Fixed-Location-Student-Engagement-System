var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');
var bodyParser = require('body-parser');

var getCourses = require('./get_courses');
var getQuestions = require('./get_questions');

var auth = require('./auth');
var config = require('./config');
var enrol = require('./enrol');
var unenrol = require('./unenrol');
var createUpdateQuestion = require('./create_update_question');
var poseQuestion = require('./pose_question');
var closeQuestion = require('./close_question');
var logout = require('./logout');

var createCourse = require('./create_course');
var answer = require('./answer');

// Handle the SSL certificate settings
var privateKey  = fs.readFileSync(config.server.privateKey, 'utf8');
var certificate = fs.readFileSync(config.server.certificate, 'utf8');
var credentials = {
  key: privateKey,
  cert: certificate,
  passphrase: config.server.passphrase
};

// Create http + https servers
var app = express();
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Handle each endpoint
app.get('/courses', getCourses.handle);
app.get('/questions', getQuestions.handle);

app.post('/login', auth.handleLogin);
app.post('/register', auth.handleRegister);
app.post('/enrol', enrol.handle);
app.post('/unenrol', unenrol.handle);
app.post('/question', createUpdateQuestion.handle);
app.post('/create_course', createCourse.handle);
app.post('/answer', answer.handle);

app.put('/logout', logout.handle);
app.put('/question', poseQuestion.handle);
app.put('/close_question', closeQuestion.handle);

// By default return a 404 Not Found
app.use(function(req, res){
  res.sendStatus(404);
});

// TODO: This is convenient for testing but should probably be removed
process.on('uncaughtException', function (err) {
  console.log(err);
});

// Start the http + https servers
httpServer.listen(config.server.http_port);
httpsServer.listen(config.server.https_port);
