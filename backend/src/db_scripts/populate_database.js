const EventEmitter = require('events').EventEmitter;
var createCourses = require('./create_courses_and_questions.js');
var createUsers = require('./create_users.js');

const NUM_QUESTIONS = 18;
const NUM_ANSWERS = 16;

var questions_callbacks = 0;
var answers_callbacks = 0;

var dbsync = new EventEmitter();

dbsync.on('do_users', function() {
  console.log('creating users...')
  createUsers.run(this);
});

dbsync.on('do_courses_and_questions', function(prof_id, student_id) {
  console.log('creating courses and questions...');
  createCourses.run(this, prof_id, student_id);
});

dbsync.on('finished_question', function() {
  questions_callbacks++;
  if (questions_callbacks >= NUM_QUESTIONS && answers_callbacks >= NUM_ANSWERS) this.emit('done');
});

dbsync.on('finished_answer', function() {
  answers_callbacks++;
  if (answers_callbacks >= NUM_ANSWERS && questions_callbacks >= NUM_QUESTIONS) this.emit('done');
});

dbsync.on('done', function () {
  console.log('done');
  //TODO: make process finish gracefully
  process.exit(0);
});

dbsync.emit('do_users');
