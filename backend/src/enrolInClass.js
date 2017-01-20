var validate = require('jsonschema').validate;
var undefsafe = require('undefsafe');

var database = require('./database');
var config = require('./config');
var auth = require('./auth');

var userQuery =
  'select *' +
  'from ece496.users' +
  'where utorid=?';

var courseQuery =
  'select *' +
  'from ece496.courses' +
  'where class_name=?';

var userAlreadyEnrolledQuery =
  'select id ' +
  'from ece496.users_courses' +
  'where student_id=? and course_id=?';

var insertLinkQuery =
  'insert into ece496.users_courses' +
  '(student_id, course_id)' +
  'values(?, ?)';

//EXPECTED REQUEST BODY: utorid, class name
module.exports = {
  handle: function(req,res) {
    auth.validateSessionToken(req.query.session_token)
      .then(function(user_id) {
        var result = validate(req.body, schemas.POST.enrol);
        if (result.error.length === 0) {
          var connection = database.connect();
          var utorid = req.body.utorid;
          var class_name = req.body.class_name;
          var student_id;
          var course_id;
          //does user exist?
          connection.query(
            userQuery,
            [utorid],
            function(err, rows, fields) {
              if (err) {
                res.send(errors.unknownError);
                return;
              }

              if (rows.length == 0) {
                res.send(errors.invalidUserError);
                return;
              }
              else {
                student_id = rows[0].id;
                console.log(student_id);
              }
            }
          );

          //does the course exist?
          connection.query(
            courseQuery,
            [course_name],
            function(err, rows, fields) {
              if (err) {
                res.send(errors.unknownError);
                return;
              }

              if (rows.length == 0) {
                res.send(errors.invalidCourseError);
                return;
              }
              else {
                course_id = rows[0].id;
              }
            }
          );

          //is the user already enrolled?
          connection.query(
            userAlreadyEnrolledQuery,
            [utorid, class_name],
            function(err, rows, fields) {
              if (err) {
                res.send(errors.unknownError);
                return;
              }

              if (rows.length != 0) {
                res.send(errors.userAlreadyEnrolledError);
                return;
              }
            }
          );

          //otherwise do the operation
          connection.query(
            insertLinkQuery,
            [student_id, course_id],
            function(err, rows, fields) {
              if (err) {
                res.send(errors.unknownError);
                return;
              }
              else {
                res.send("Student enrolled successfully");
                return;
              }
            }
          );
      }
    }, function(err){
      console.log(err);
      res.send(err);
      return;
    });
}
}
