var validate = require('jsonschema').validate;

var auth = require('./auth');
var database = require('./database');
var config = require('./config');
var errors = require('../../common/errors').GET.questions;
var schema = require('../../common/schemas').GET.questions;

// TODO Write unit tests and test script for /questions

var getQuestionsQuery =
  'select a.id as question_id, a.title, a.question_text, a.asked, a.completed, a.answers_array, a.correct_answer, ' +
  '       b.answer_mc, b.accepted ' +
  'from ece496.questions a ' +
  'left join ece496.submissions b ' +
  'on a.id=b.question_id and b.user_id=? ' +
  'where a.course_id=?';

module.exports = {
  // Get courses handler
  handle: function(req, res) {
    // Validate the request query
    var result = validate(req.query, schema);
    if (result.errors.length === 0) {
      auth.validateSessionToken(req)
        .then(function(user_id) {
          database.pool.query(
              getQuestionsQuery,
              [user_id, req.query.course_id],
              function(err, rows, fields) {
                if (err) {
                  console.log(err);
                  res.send(errors.unknownError);
                  return;
                }

                var response = {
                  active_questions: [],
                  inactive_questions: []
                };

                for (var i = 0; i < rows.length; i++) {
                  if (rows[i].asked === 1) {
                    // Build the question info object
                    var question_details = {
                      question_id: rows[i].question_id,
                      title: rows[i].title,
                      body: rows[i].question_text,
                      answers: JSON.parse(rows[i].answers_array),
                    };

                    // Add the user's answer if it exists
                    if (rows[i].answer_mc !== null) {
                      question_details.answer = rows[i].answer_mc;
                    }

                    if (rows[i].accepted !== null) {
                      question_details.answer_accepted = rows[i].accepted === 1;
                    }

                    // Add the question to active/inactive questions
                    if (rows[i].completed === 0) {
                      response.active_questions.push(question_details);
                    } else {
                      question_details.correct_answer = rows[i].correct_answer;
                      response.inactive_questions.push(question_details);
                    }
                  }
                }

                res.send(response);
              }
            );
        })
        .catch(function(err) {
          res.send(err);
        });
    } else {
      res.send(errors.validationError);
    }
  }
};
