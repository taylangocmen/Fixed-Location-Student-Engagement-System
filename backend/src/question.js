var undefsafe = require('undefsafe');
var validate = require('jsonschema').validate;

var auth = require('./auth');
var database = require('./database');
var config = require('./config');
var errors = require('../../common/errors').POST.question;
var schemas = require('../../common/schemas');

var verifyAuthorizedUserQuery =
  'select id ' +
  'from ece496.courses ' +
  'where id=? and prof_id=?';

var updateQuestionQuery =
  'update ece496.questions ' +
  'set timeout=?, question=? ' +
  'where course_id=? and id=?';

var createQuestionQuery =
  'insert into ece496.questions ' +
  '(course_id, timeout, question) ' +
  'values (?, ?, ?)';

var selectQuestionAskedQuery =
  'select asked ' +
  'from ece496.questions ' +
  'where course_id=? and id=?';

var handleUpdateQuestion = function(req, res, connection) {
  // Lookup whether the question has been asked already
  connection.query(
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
          connection.query(
            updateQuestionQuery,
            [req.body.timeout,
             JSON.stringify(req.body.question),
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

var handleCreateQuestion = function(req, res, connection) {
  // Insert the new question
  connection.query(
    createQuestionQuery,
    [req.body.course_id,
     req.body.timeout,
     JSON.stringify(req.body.question)],
    function(err, rows, fields) {
      if (err) {
        console.log(err);
        res.send(errors.unknownError);
        return;
      }

      // Get the id of the newly inserted question
      var question_id = rows.insertId;

      res.send({course_id: req.body.course_id, question_id: question_id});
    }
  );
};

module.exports = {
  // Question handler
  handle: function(req, res) {
    auth.validateSessionToken(req.query.session_token)
      .then(function(user_id) {
        // Validate the request body
        var result = validate(req.body, schemas.POST.question);
        if (result.errors.length === 0) {
          var connection = database.connect();

          // Verify that the user is listed as the prof for this course
          connection.query(
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
                  handleUpdateQuestion(req, res, connection);
                } else {
                  handleCreateQuestion(req, res, connection);
                }
              } else {
                res.send(errors.authorizationError);
              }
            }
          );
        } else {
          res.send(errors.validationError);
        }
      })
      .catch(function(err) {
        res.send(err);
      });
  },
};

