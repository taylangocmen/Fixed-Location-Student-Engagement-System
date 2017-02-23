const EventEmitter = require('events').EventEmitter;
var createCourses = require('./create_courses.js');
var createUsers = require('./create_users.js');

const NUM_QUESTIONS = 22;
const NUM_ANSWERS = 18;

var questions_callbacks = 0;
var answers_callbacks = 0;

var dbsync = new EventEmitter();

dbsync.on('do_users', function() {
  console.log('hello from do_users')
  createUsers.run(this);
});

dbsync.on('do_courses', function(prof_id, student_id) {
  console.log('hello from do_courses');
  this.emit('done');
  createCourses.run(this, prof_id);
});

dbsync.on('do_answers', function() {
  //TODO: write answer functionality
});

dbsync.on('finished_question', function() {
  questions_callbacks++;
  if (questions_callbacks >= NUM_QUESTIONS) this.emit('do_answers');
});

dbsync.on('finished_answer', function() {
  if (answers_callbacks >= NUM_ANSWERS) this.emit('done');
});

dbsync.on('done', function () {
  console.log('done');
  //TODO: make process finish gracefully
  process.exitCode = 1;
});

dbsync.emit('do_users');
