var validate = require('jsonschema').validate;

var auth = require('./auth');
var database = require('./database');
var config = require('./config');
var errors = require('../../common/errors').POST.answer;
var schema = require('../../common/schemas').POST.answer;

var verifyUserQuery = //verify that the user exists and is enrolled in the course
  'SELECT user_id ' +
  'FROM ece496.enrol ' +
  'WHERE user_id = ? AND course_id = ?'; 

var alreadyAnsweredQuery = //check to see if an answer from the submitting user already exists
  'SELECT * FROM submissions WHERE user_id = ? AND course_id = ? AND question_id = ?';
  
  
var updateAnswerQuery =
  'UPDATE ece496.submissions ' +
  'SET answer_mc=?, answer_text=?, answer_type=?, device_id=?, device_list=?, accepted=NULL, time_recieved = NOW() ' +
  'WHERE course_id=? AND user_id=? AND question_id=?';

var createAnswerQuery = 
  'INSERT INTO ece496.questions ' +
  '(time_recieved, course_id, question_id, user_id, device_id,' +
  ' device_list, answer_type, answer_mc, answer_text, accepted) ' +
  'VALUES (NOW(), ?, ?, ?, ?, ?, ?, ?, ?, NULL)';

var selectQuestionQuery = //check to see whether or not the question exists and is accepting answers
  'SELECT * FROM ece496.questions ' +
  'WHERE course_id=? AND id=?';
  
var handleUpdateAns = function(req, res, connection, user_id) {
  // We already know from the handler that the user has already answered the question
  // we must then seek to update the answer with a new answer.
  connection.query(
    updateAnswerQuery,
    [req.body.ans_type == 0 ? (req.body.answer.charCodeAt(0) - "a".charCodeAt(0)): NULL,
	req.body.ans_type == 1 ? JSON.stringify(req.body.answer) : NULL,
	req.body.ans_type,
	JSON.stringify(req.body.device_id),
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
	  
	  //success, return an empty object
	  res.send({});
    }
  );
};

var handleCreateAnswer = function(req, res, connection, user_id) {
  // Insert the new question
  connection.query(
    createAnswerQuery,
    [req.body.course_id,
    req.body.question_id,
    JSON.stringify(user_id),
	JSON.stringify(req.body.device_id),
	JSON.stringify(req.body.neighbours),
	req.body.ans_type,
	req.body.ans_type == 0 ? (req.body.answer.charCodeAt(0) - "a".charCodeAt(0)): NULL, //type = multiple choice
	req.body.ans_type == 1 ? JSON.stringify(req.body.answer) : NULL], //type = string
    function(err, rows, fields) {
      if (err) {
        console.log(err);
        res.send(errors.sqlError);
        return;
      }

      // return an empty object
      res.send({});
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

    auth.validateSessionToken(req.query.session_token)
      .then(function(user_id) {
        var connection = database.connect();

        // Verify that the user is enrolled in the course
        connection.query(
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
			  
			  connection.query(
				selectQuestionQuery,
				[req.body.course_id, req.body.question_id],
				function(err, rows, fields) {
					if (err) {
					  console.log(err);
					  res.send(errors.sqlError);
					  return;
					}
					
					if(rows.asked == true && rows.completed == false) {
					
					  // Determine if the user has already answered
					  connection.query(
						alreadyAnsweredQuery,
						[user_id,req.body.course_id,req.body.question_id],
						function(err, rows, fields) {
							if (err) {
							  console.log(err);
							  res.send(errors.sqlError);
							  return;
							}
							
							if (rows) {
							  handleUpdateAnswer(req, res, connection, user_id);
							} else {
							  handleCreateAnswer(req, res, connection, user_id);
							}
						});
						
					} else {
					  res.send(errors.notAcceptingError);
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

