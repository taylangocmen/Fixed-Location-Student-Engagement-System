var validate = require('jsonschema').validate;

var auth = require('./auth');
var database = require('./database');
var config = require('./config');
var errors = require('../../common/errors').POST.create_course;
var schema = require('../../common/schemas').POST.create_course;

var verifyAuthorizedUserQuery =
  'select id ' +
  'from ece496.users ' +
  'where id=? and create_courses=true';

var createCourseQuery =
  'insert into ece496.courses ' +
  '(prof_id, course_name, course_desc) ' +
  'values (?, ?, ?)';

module.exports = {
  // Question handler
  handle: function(req, res) {
    // Validate the request body
    var result = validate(req.body, schema);
    if (result.errors.length !== 0) {
      res.send(errors.validationError);
      return;
    }

    auth.validateSessionToken(req.query.session_token)
      .then(function(user_id) {
        // Verify that the user has permission to create new courses
        database.pool.query(
          verifyAuthorizedUserQuery,
          [user_id],
          function(err, rows, fields) {
            if (err) {
              console.log(err);
              res.send(errors.unknownError);
              return;
            }

            // If the user is authorized to create new courses
            if (rows.length == 1) {
              database.pool.query(
                createCourseQuery,
                [user_id,
                 req.body.course_name,
                 req.body.course_desc],
                function(err, rows, fields) {
                  if (err) {
                    console.log(err);
                    res.send(errors.unknownError);
                    return;
                  }

                  // Get the id of the newly inserted course
                  var course_id = rows.insertId;
                  res.send({
                    course_id: course_id,
                    course_name: req.body.course_name
                  });
                }
              );
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

