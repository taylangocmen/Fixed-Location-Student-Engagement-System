var undefsafe = require('undefsafe');
var validate = require('jsonschema').validate;

var auth = require('./auth');
var database = require('./database');
var verifyLocation = require('./verify_location');
var config = require('./config');
var errors = require('../../common/errors').PUT.question;
var schema = require('../../common/schemas').PUT.question;

var verifyAuthorizedUserQuery =
  'select id ' +
  'from ece496.courses ' +
  'where id=? and prof_id=?';

var selectQuestionAskedQuery =
  'select asked ' +
  'from ece496.questions ' +
  'where course_id=? and id=?';

var closeQuestionQuery =
  'update ece496.questions ' +
  'set completed=true, time_closed=NOW() ' +
  'where course_id=? and id=?';

var closeQuestion = function(req, res) {
  // Update the question to have completed=true
  database.pool.query(
    closeQuestionQuery,
    [req.body.course_id, req.body.question_id],
    function(err, rows, fields) {
      if (err) {
        console.log(err);
        res.send(errors.unknownError);
        return;
      }

      verifyLocation.verify(req.body.course_id, req.body.question_id);

      res.send({});
    }
  );
};

module.exports = {
  // Pose question handler
  handle: function(req, res) {
    auth.validateSessionToken(req.query.session_token)
      .then(function(user_id) {
        // Validate the request body
        var result = validate(req.body, schema);
        if (result.errors.length === 0) {
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
                // Determine whether the question exists and has been asked yet
                database.pool.query(
                  selectQuestionAskedQuery,
                  [req.body.course_id, req.body.question_id],
                  function(err, rows, fields) {
                    if (err) {
                      console.log(err);
                      res.send(errors.unknownError);
                      return;
                    }

                    if (rows.length === 1) {
                      // If the question has been asked
                      if (rows[0].asked === 1) {
                        closeQuestion(req, res);
                      } else {
                        res.send(errors.closingUnaskedQuestion);
                      }
                    } else {
                      res.send(errors.invalidQuestionError);
                    }
                  }
                );
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

