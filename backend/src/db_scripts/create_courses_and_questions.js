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

var insertAnswerQuery =
  'insert into ece496.submissions ' +
  '(course_id, question_id, user_id, answer_type, answer_mc, accepted) '+
  'values(?, ?, ?, ?, ?, ?)';

var genericAnswer = {
  'course_id': 0,
  'question_id': 0,
  'answer': "this is an answer",
  'neighbours': [],
  'device_id': 12345
};

function questionWithCallback(emitter, course_id, user_id, asked, completed, correct_answer, make_answer, answer) {
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
          if(make_answer) {
            createAnswer(emitter, course_id, rows.insertId, user_id, answer);
          }
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
          if(make_answer) {
            createAnswer(emitter, course_id, rows.insertId, user_id, answer);
          }
          emitter.emit('finished_question');
        }
      }
    );
  }
}

function createAnswer(emitter, course_id, question_id, user_id, answer_mc) {
  database.pool.query(
    insertAnswerQuery,
    [course_id, question_id, user_id, 1, answer_mc, 1],
    function(err, rows, fields) {
      if (err) throw err;
      else {
        emitter.emit('finished_answer');
      }
    }
  )
}

module.exports = {
  run: function(emitter, prof_id, user_id) {
    database.pool.query(
      insertCourseQuery,
      [prof_id, "Generic Engineering Course", "This is a generic engineering course.", 1],
      function(err, rows, fields) {
        if (err) throw err;
        else {
          questionWithCallback(emitter, rows.insertId, user_id, 1, 0, null, false, 0);
          questionWithCallback(emitter, rows.insertId, user_id, 1, 0, null, true, 1);
          questionWithCallback(emitter, rows.insertId, user_id, 1, 0, null, true, 2);
          questionWithCallback(emitter, rows.insertId, user_id, 1, 1, 1, true, 3);
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
          questionWithCallback(emitter, rows.insertId, user_id, 1, 0, null, false, 0);
          questionWithCallback(emitter, rows.insertId, user_id, 1, 1, 1, true, 1);
          questionWithCallback(emitter, rows.insertId, user_id, 1, 1, 1, true, 1);
          questionWithCallback(emitter, rows.insertId, user_id, 1, 1, 1, true, 2);
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
          questionWithCallback(emitter, rows.insertId, user_id, 1, 1, 1, true, 1);
          questionWithCallback(emitter, rows.insertId, user_id, 1, 1, 1, true, 2);
          questionWithCallback(emitter, rows.insertId, user_id, 1, 1, 1, true, 1);
          questionWithCallback(emitter, rows.insertId, user_id, 1, 1, 1, true, 3);
          questionWithCallback(emitter, rows.insertId, user_id, 1, 1, 1, true, 4);
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
          questionWithCallback(emitter, rows.insertId, user_id, 1, 1, 1, true, 1);
          questionWithCallback(emitter, rows.insertId, user_id, 1, 1, 1, true, 2);
          questionWithCallback(emitter, rows.insertId, user_id, 1, 1, 1, true, 2);
          questionWithCallback(emitter, rows.insertId, user_id, 1, 1, 1, true, 3);
          questionWithCallback(emitter, rows.insertId, user_id, 1, 1, 1, true, 4);
        }
        return;
      }
    );
  }
}
