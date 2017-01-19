var undefsafe = require('undefsafe');
var validate = require('jsonschema').validate;

var auth = require('./auth');
var database = require('./database');
var config = require('./config');
var errors = require('../../common/errors').POST.question;
var schemas = require('../../common/schemas');

var updateQuestionQuery =
  'update ece496.questions ' +
  'set timeout=?, asked=?, question=? ' +
  'where course_id=? and question_id=?';

var createQuestionQuery =
  'insert into ece496.questions ' +
  '(course_id, timeout, asked, question) ' +
  'values (?, ?, ?, ?)';

var selectQuestionAskedQuery =
  'select asked ' +
  'from ece496.questions ' +
  'where course_id=? and question_id=?';

var handleUpdateQuestion = function(req, res) {
  var connection = database.connect();
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
             req.body.ask_immediately,
             JSON.stringify(req.body.question),
             req.body.course_id,
             req.body.question_id],
            function(err, rows, fields) {
              if (err) {
                console.log(err);
                res.send(errors.unknownError);
                return;
              }

              if (req.body.ask_immediately) {
                // TODO start a timer to do stuff when the question ends
              }

              res.send({course_id: req.body.course_id, question_id: req.body.question_id});
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
  var connection = database.connect();
  connection.query(
    createQuestionQuery,
    [req.body.course_id,
     req.body.timeout,
     req.body.ask_immediately,
     JSON.stringify(req.body.question)],
    function(err, rows, fields) {
      if (err) {
        console.log(err);
        res.send(errors.unknownError);
        return;
      }

      var question_id = rows.insertId;

      if (req.body.ask_immediately) {
        // TODO start a timer to do stuff when the question ends
      }
      res.send({course_id: req.body.course_id, question_id: question_id});
    }
  );
};

module.exports = {
  // Question handler
  handle: function(req, res) {
    auth.validateSessionToken(req.query.session_token)
      .then(function(id) {
        var result = validate(req.body, schemas.POST.question);
        if (result.errors.length === 0) {
          // TODO verify that the user is allowed to create a question for course_id
          if (req.body.question_id !== undefined) {
            handleUpdateQuestion(req, res);
          } else {
            handleCreateQuestion(req, res);
          }
        } else {
          res.send(errors.validationError);
        }
      })
      .catch(function(err) {
        res.send(err);
      });
  },
};

