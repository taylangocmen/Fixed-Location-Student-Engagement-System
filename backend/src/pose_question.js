var undefsafe = require('undefsafe');
var validate = require('jsonschema').validate;

var auth = require('./auth');
var database = require('./database');
var config = require('./config');
var errors = require('../../common/errors').PUT.question;
var schema = require('../../common/schemas').PUT.question;

var verifyAuthorizedUserQuery =
  'select id ' +
  'from ece496.courses ' +
  'where id=? and prof_id=?';

var selectQuestionAskedQuery =
  'select asked, timeout ' +
  'from ece496.questions ' +
  'where course_id=? and id=?';

var poseQuestionQuery =
  'update ece496.questions ' +
  'set asked=true, time_opened=NOW() ' +
  'where course_id=? and id=?';

module.exports = {
  // Pose question handler
  handle: function(req, res) {
    auth.validateSessionToken(req.query.session_token)
      .then(function(user_id) {
        // Validate the request body
        var result = validate(req.body, schema);
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
                // Determine whether the question exists and has been asked yet
                connection.query(
                  selectQuestionAskedQuery,
                  [req.body.course_id, req.body.question_id],
                  function(err, rows, fields) {
                    if (err) {
                      console.log(err);
                      res.send(errors.unknownError);
                      return;
                    }

                    if (rows.length === 1) {
                      // If the question has not yet been asked
                      if (rows[0].asked === 0) {
                        var timeout = rows[0].timeout;
                        // Update the question to have asked=true
                        connection.query(
                          poseQuestionQuery,
                          [req.body.course_id, req.body.question_id],
                          function(err, rows, fields) {
                            if (err) {
                              console.log(err);
                              res.send(errors.unknownError);
                              return;
                            }

                            // If a timeout is set then schedule the question to be closed automatically
                            if (timeout !== undefined && timeout !== null) {
                              // TODO Schedule asynchronous timer event to run at the end of the question
                            }

                            // TODO if we eventually use websockets, dispatch an event to all users
                            // in this class that the question was just asked
                            res.send({});
                          }
                        );
                      } else {
                        res.send(errors.posingAskedQuestion);
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

