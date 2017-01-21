var validate = require('jsonschema').validate;
var undefsafe = require('undefsafe');

var database = require('./database');
var config = require('./config');

var userAlreadyEnrolled =
  'select id ' +
  'from ece496.users_courses' +
  'where student_id=? and course_id=?';

//EXPECTED REQUEST: utorid, class name, session token
module.exports = {
  handle: function(req,res) {
    auth.validateSessionToken(req.query.session_token)
      .then(function(user_id) {
    });
  }
}
