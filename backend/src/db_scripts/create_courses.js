var auth = require('../auth');
var database = require('../database');
var config = require('../config');
var login = require('../login');
var create_course = require('../create_course');

var insertCourseInfo =
  'insert into ece496.courses ' +
  '(prof_id, course_name, course_desc, active) ' +
  'values (?, ?, ?, ?)';

var insertQuestionQuery =
  'insert into ece496.questions ' +
  '(course_id, title, question_text, correct_answer, num_answers, answers_array, asked, completed) ' +
  'values (?, ?, ?, ?, ?, ?, ?, ?)';


var answer1 = {
  'course_id': 1,
  'question_id': 1,
  'time': 100,
  'answer': "this is answer 1",
  'ans_type': 1,
  'neighbours': [],
  'device_id': 12345
};
var answer2 = answer1;
answer2.answer = "this is answer2";
var answer3 = answer2;
answer3.answer = "this is answer3";
var answer4 = answer3;
answer4.answer = "this is answer4";

var genericAnswerArray = [answer1, answer2, answer3, answer4];
var emptyArray = [];
module.exports = {
  run: function(emitter, prof_id) {
    database.pool.query(
      insertCourseInfo,
      [prof_id, "Generic Engineering Course", "This is a generic engineering course.", 1],
      function(err, rows, fields) {
        if (err) throw err;
        else {
          console.log(rows);
          database.pool.query(
            insertQuestionQuery,
            [rows.insertId, "Question 1", "This question is active", 1, 4, JSON.stringify(genericAnswerArray), 1, 0],
            function(err, rows, fields) {
              if (err) throw err;
              return;
            }
          );
          database.pool.query(
            insertQuestionQuery,
            [rows.insertId, "Question 2", "This question is active and answered", 1, 4, JSON.stringify(genericAnswerArray), 1, 1],
            function(err, rows, fields) {
              if (err) throw err;
              return;
            }
          );
          database.pool.query(
            insertQuestionQuery,
            [rows.insertId, "Question 3", "This question is inactive", 1, 4, JSON.stringify(genericAnswerArray), 0, 0],
            function(err, rows, fields) {
              if (err) throw err;
              return;
            }
          );

        }
        return;
      }
    );

    database.pool.query(
      insertCourseInfo,
      [prof_id, "Generic ECE Course", "This is a generic engineering course, but in ECE.", 1],
      function(err, rows, fields) {
        if (err) throw err;
        return;
      }
    );

    database.pool.query(
      insertCourseInfo,
      [prof_id, "Inactive Course", "This course is not currently running.", 0],
      function(err, rows, fields) {
        if (err) throw err;
        return;
      }
    );

    database.pool.query(
      insertCourseInfo,
      [prof_id, "Expired Course", "This course is expired?", 0],
      function(err, rows, fields) {
        if (err) throw err;
        return;
      }
    );
  }
}
