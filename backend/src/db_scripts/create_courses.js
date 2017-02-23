Object.assign = require('object-assign');
var auth = require('../auth');
var database = require('../database');
var config = require('../config');
var login = require('../login');
var create_course = require('../create_course');

var insertCourseQuery =
  'insert into ece496.courses ' +
  '(prof_id, course_name, course_desc, active) ' +
  'values (?, ?, ?, ?)';

var insertQuestionQuery =
  'insert into ece496.questions ' +
  '(course_id, title, question_text, correct_answer, num_answers, answers_array, asked, completed) ' +
  'values (?, ?, ?, ?, ?, ?, ?, ?)';

var insertQuestionNoAnswerQuery =
  'insert into ece496.questions ' +
  '(course_id, title, question_text, num_answers, answers_array, asked, completed) ' +
  'values (?, ?, ?, ?, ?, ?, ?)';

var genericAnswer = {
  'course_id': 0,
  'question_id': 0,
  'answer': "this is an answer",
  'neighbours': [],
  'device_id': 12345
};

function questionWithCallback(emitter, course_id, asked, completed, correct_answer) {
  //TODO: Add question ids to these answers? is that necessary when they're attached
  //to the questions?
  var answer1 = Object.assign({}, genericAnswer);
  answer1.course_id = course_id;
  var answer2 = Object.assign({}, answer1);
  var answer3 = Object.assign({}, answer1);
  var answer4 = Object.assign({}, answer1);

  answers = [answer1, answer2, answer3, answer4];
  if(correct_answer == null) {
    database.pool.query(
      insertQuestionNoAnswerQuery,
      [course_id, 'Question title', 'This is a question', 4, JSON.stringify(answers), asked, completed],
      function(err, rows, fields) {
        if (err) {
          console.log(err);
          throw err;
        }
        else {
          emitter.emit('finished_question');
        }
      }
    );
  }
  else {
    database.pool.query(
      insertQuestionQuery,
      [course_id, 'Question title', 'This is a question', 1, 4, JSON.stringify(answers), asked, completed],
      function(err, rows, fields) {
        if (err) {
          console.log(err);
          throw err;
        }
        else {
          emitter.emit('finished_question');
        }
      }
    );
  }
}

module.exports = {
  run: function(emitter, prof_id) {
    database.pool.query(
      insertCourseQuery,
      [prof_id, "Generic Engineering Course", "This is a generic engineering course.", 1],
      function(err, rows, fields) {
        if (err) throw err;
        else {
          questionWithCallback(emitter, rows.insertId, 1, 0, null);
          questionWithCallback(emitter, rows.insertId, 1, 0, null);
          questionWithCallback(emitter, rows.insertId, 1, 0, null);
          questionWithCallback(emitter, rows.insertId, 1, 1, 1);
        }
        return;
      }
    );

    database.pool.query(
      insertCourseQuery,
      [prof_id, "Generic ECE Course", "This is a generic engineering course, but in ECE.", 1],
      function(err, rows, fields) {
        if (err) throw err;
        else {
          questionWithCallback(emitter, rows.insertId, 1, 0, null);
          questionWithCallback(emitter, rows.insertId, 1, 1, 1);
          questionWithCallback(emitter, rows.insertId, 1, 1, 1);
          questionWithCallback(emitter, rows.insertId, 1, 1, 1);
        }
        return;
      }
    );

    database.pool.query(
      insertCourseQuery,
      [prof_id, "Inactive Course", "This course is not currently running.", 0],
      function(err, rows, fields) {
        if (err) throw err;
        else {
          questionWithCallback(emitter, rows.insertId, 1, 1, 1);
          questionWithCallback(emitter, rows.insertId, 1, 1, 1);
          questionWithCallback(emitter, rows.insertId, 1, 1, 1);
          questionWithCallback(emitter, rows.insertId, 1, 1, 1);
        }
        return;
      }
    );

    database.pool.query(
      insertCourseQuery,
      [prof_id, "Expired Course", "This course is expired?", 0],
      function(err, rows, fields) {
        if (err) throw err;
        else {
          questionWithCallback(emitter, rows.insertId, 1, 1, 1);
          questionWithCallback(emitter, rows.insertId, 1, 1, 1);
          questionWithCallback(emitter, rows.insertId, 1, 1, 1);
          questionWithCallback(emitter, rows.insertId, 1, 1, 1);
        }
        return;
      }
    );
  }
}
