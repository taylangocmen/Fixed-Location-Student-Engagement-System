const EventEmitter = require('events').EventEmitter;
var createCourses = require('./create_courses.js');
var createInstructor = require('./create_instructor.js');

//class DBEvents extends EventEmitter {}

var dbsync = new EventEmitter();

dbsync.on('do_courses', function(prof_id) {
  console.log("hello from do_courses");
  this.emit('done')
  //createCourses.run(this, prof_id);
});

dbsync.on('do_professor', function() {
  createInstructor.run(this);
  console.log("hello from do_professor");
});

dbsync.on('done', function () {
  console.log('done')
  process.exit(0);
});

dbsync.emit('do_professor');
