var validate = require('jsonschema').validate;

var auth = require('./auth');
var database = require('./database');
var config = require('./config');
var errors = require('../../common/errors').POST.question;
var schema = require('../../common/schemas').POST.question;

var verifyAuthorizedUserQuery =
  'select id ' +
  'from ece496.courses ' +
  'where id=? and prof_id=?';

var updateQuestionQuery =
  'update ece496.questions ' +
  'set timeout=?, title=?, question_text=?, correct_answer=?, num_answers=?, answers_array=? ' +
  'where course_id=? and id=?';

var createQuestionQuery =
  'insert into ece496.questions ' +
  '(course_id, timeout, title, question_text, correct_answer, num_answers, answers_array, time_created) ' +
  'values (?, ?, ?, ?, ?, ?, ?, NOW())';

var selectQuestionAskedQuery =
  'select asked ' +
  'from ece496.questions ' +
  'where course_id=? and id=?';

var handleUpdateQuestion = function(req, res) {
  // Lookup whether the question has been asked already
  database.pool.query(
    selectQuestionAskedQuery,
    [req.body.course_id, req.body.question_id],
    function(err, rows, fields) {
      if (err) {
        console.log(err);
        res.send(errors.unknownError);
        return;
      }

      // If the question_id is valid
      if (rows.length === 1) {
        // If the question has not been asked yet
        if (rows[0].asked === false) {
          // Update the question
          database.pool.query(
            updateQuestionQuery,
            [req.body.timeout,
             req.body.question.title,
             req.body.question.text,
             req.body.question.correct_answer,
             req.body.question.answers.length,
             JSON.stringify(req.body.question.answers),
             req.body.course_id,
             req.body.question_id],
            function(err, rows, fields) {
              if (err) {
                console.log(err);
                res.send(errors.unknownError);
                return;
              }

              res.send({
                course_id: req.body.course_id,
                question_id: req.body.question_id
              });
            }
          );
        } else {
          res.send(errors.updatingAskedQuestion);
        }
      } else {
        res.send(errors.invalidQuestionError);
      }
    }
  );
};

var handleCreateQuestion = function(req, res) {
  // Insert the new question
  database.pool.query(
    createQuestionQuery,
    [req.body.course_id,
     req.body.timeout,
     req.body.question.title,
     req.body.question.text,
     req.body.question.correct_answer,
     req.body.question.answers.length,
     JSON.stringify(req.body.question.answers)],
    function(err, rows, fields) {
      if (err) {
        console.log(err);
        res.send(errors.unknownError);
        return;
      }

      // Get the id of the newly inserted question
      var question_id = rows.insertId;
      res.send({
        course_id: req.body.course_id,
        question_id: question_id
      });
    }
  );
};

module.exports = {
  // Question handler
  handle: function(req, res) {
    // Validate the request body
    var result = validate(req.body, schema);
    if (result.errors.length !== 0) {
      res.send(errors.validationError);
      return;
    }

    auth.validateSessionToken(req)
      .then(function(user_id) {
        // Verify that the user is listed as the prof for this course
        database.pool.query(
          verifyAuthorizedUserQuery,
          [req.body.course_id, user_id],
          function(err, rows, fields) {
            if (err) {
              console.log(err);
              res.send(errors.unknownError);
              return;
            }

            // If the user is authorized
            if (rows.length == 1) {
              // Handle an update/create based on if question_id is present
              if (req.body.question_id !== undefined) {
                handleUpdateQuestion(req, res);
              } else {
                handleCreateQuestion(req, res);
              }
            } else {
              res.send(errors.authorizationError);
            }
          }
        );
      })
      .catch(function(err) {
        res.send(err);
      });
  },
};

