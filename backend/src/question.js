var undefsafe = require('undefsafe');
var validate = require('jsonschema').validate;

var auth = require('./auth');
var database = require('./database');
var config = require('./config');
var errors = require('../../common/errors').POST.question;
var schemas = require('../../common/schemas');

module.exports = {
  // Question handler
  handle: function(req, res) {
    auth.validateSessionToken(req.query.session_token)
      .then(function(id) {
        if (validate(req.body, schemas.POST.question)) {
          var courseID = undefsafe(req, 'body.course_id');
          var questionID = undefsafe(req, 'body.question_id');
          var timeout = undefsafe(req, 'body.timeout');
          var askImmediately = undefsafe(req, 'body.ask_immediately');

          var question = undefsafe(req, 'body.question');
          var questionText = undefsafe(req, 'body.question.text');
          var questionCorrectAnswer = undefsafe(req, 'body.question.correct_answer');
          var questionAnswers = undefsafe(req, 'body.question.answers');

          if (questionID === undefined && question === undefined) {
            res.send(errors.missingQuestionError);
            return;
          }

          // TODO actually create/update the question

          res.send({
            course_id: courseID,
            question_id: questionID
          });
        } else {
          res.send(errors.validationError);
        }
      })
      .catch(function(err) {
        res.send(err);
      });
  },
};

