var validate = require('jsonschema').validate;

var auth = require('./auth');
var database = require('./database');
var config = require('./config');
var errors = require('../../common/errors').POST.answer;
var schema = require('../../common/schemas').POST.answer;

// Verify that the user exists and is enrolled in the course
var verifyUserQuery =
  'SELECT user_id ' +
  'FROM ece496.users_courses ' +
  'WHERE user_id = ? AND course_id = ?';

// Check to see whether or not the question exists and is accepting answers
var selectQuestionQuery =
  'SELECT asked, completed ' +
  'FROM ece496.questions ' +
  'WHERE course_id=? AND id=?';

// Check to see if an answer from the submitting user already exists
var alreadyAnsweredQuery =
  'SELECT id ' +
  'FROM ece496.submissions ' +
  'WHERE user_id = ? AND course_id = ? AND question_id = ?';

var updateAnswerQuery =
  'UPDATE ece496.submissions ' +
  'SET answer_mc=?, device_id=?, device_list=?, time_received = NOW() ' +
  'WHERE course_id=? AND user_id=? AND question_id=?';

var createAnswerQuery =
  'INSERT INTO ece496.submissions ' +
  '(time_received, course_id, question_id, user_id, device_id, ' +
  ' device_list, answer_mc) ' +
  'VALUES (NOW(), ?, ?, ?, ?, ?, ?)';

var handleUpdateAnswer = function(req, res, user_id) {
  // We already know from the handler that the user has already answered the question
  // we must then seek to update the answer with a new answer.
  database.pool.query(
    updateAnswerQuery,
    [req.body.answer,
     req.body.device_id,
     JSON.stringify(req.body.neighbours),
     req.body.course_id,
     user_id,
     req.body.question_id],
    function(err, rows, fields) {
      if (err) {
        console.log(err);
        res.send(errors.sqlError);
        return;
      }

      // Success, return an empty object
      res.send({});
      return;
    }
  );
};

var handleCreateAnswer = function(req, res, user_id) {
  // Insert the new question
  database.pool.query(
    createAnswerQuery,
    [req.body.course_id,
     req.body.question_id,
     user_id,
     req.body.device_id,
     JSON.stringify(req.body.neighbours),
     req.body.answer],
    function(err, rows, fields) {
      if (err) {
        console.log(err);
        res.send(errors.sqlError);
        return;
      }

      // Success, return an empty object
      res.send({});
      return;
    }
  );
};

module.exports = {
  // Answer handler
  handle: function(req, res) {
    // Validate the request body
    var result = validate(req.body, schema);
    if (result.errors.length !== 0) {
      res.send(errors.validationError);
      return;
    }

    auth.validateSessionToken(req)
      .then(function(user_id) {
        // Verify that the user is enrolled in the course
        database.pool.query(
          verifyUserQuery,
          [user_id, req.body.course_id],
          function(err, rows, fields) {
            if (err) {
              console.log(err);
              res.send(errors.sqlError);
              return;
            }

            // If the user is authorized
            if (rows.length == 1) {
              // Determine if the question exists and is accepting answers
              database.pool.query(
                selectQuestionQuery,
                [req.body.course_id, req.body.question_id],
                function(err, rows, fields) {
                  if (err) {
                    console.log(err);
                    res.send(errors.sqlError);
                    return;
                  }

                  if (rows.length === 1) {
                    if(rows[0].asked === 1 && rows[0].completed === 0) {
                      // Determine if the user has already answered
                      database.pool.query(
                        alreadyAnsweredQuery,
                        [user_id, req.body.course_id, req.body.question_id],
                        function(err, rows, fields) {
                          if (err) {
                            console.log(err);
                            res.send(errors.sqlError);
                            return;
                          }

                          if (rows.length === 1) {
                            handleUpdateAnswer(req, res, user_id);
                          } else {
                            handleCreateAnswer(req, res, user_id);
                          }
                        });
                    } else {
                      res.send(errors.notAcceptingError);
                    }
                  } else {
                    res.send(errors.invalidQuestionError);
                  }
                }
              );
            } else {
              res.send(errors.enrolmentError);
            }
          }
        );
      })
      .catch(function(err) {
        res.send(err);
      });
  },
};

