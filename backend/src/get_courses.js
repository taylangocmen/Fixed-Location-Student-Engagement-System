var undefsafe = require('undefsafe');
var validate = require('jsonschema').validate;

var auth = require('./auth');
var database = require('./database');
var config = require('./config');
var errors = require('../../common/errors').GET.courses;
var schema = require('../../common/schemas').GET.courses;

var getCoursesQuery =
  'select a.id as course_id, a.course_name, a.course_desc, a.active, ' +
  '       c.id as question_id, c.title, c.question_text, c.asked, c.completed, c.answers_array ' +
  'from ece496.courses a ' +
  'join ece496.users_courses b ' +
  'on b.user_id=? and a.id=b.course_id ' +
  'left join ece496.questions c ' +
  'on a.id=c.course_id';

module.exports = {
  // Get courses handler
  handle: function(req, res) {
    // Validate the request query
    var result = validate(req.query, schema);
    if (result.errors.length === 0) {
      auth.validateSessionToken(req)
        .then(function(user_id) {
            // Verify that the user is listed as the prof for this course
            database.pool.query(
              getCoursesQuery,
              [user_id],
              function(err, rows, fields) {
                if (err) {
                  console.log(err);
                  res.send(errors.unknownError);
                  return;
                }

                // Represent mappings from course ID to index in
                // courses_registered and courses_expired
                var activeCourseIDToIndex = {};
                var inactiveCourseIDToIndex = {};

                // The structure of the returned object
                var ret = {
                  courses_registered: [],
                  courses_expired: []
                };

                for (var i = 0; i < rows.length; i++) {
                  var courseID = rows[i].course_id;

                  // Choose the correct list and map if the question is active
                  var courseList = rows[i].active === 1 ?
                    ret.courses_registered : ret.courses_expired;
                  var courseIDToIndex = rows[i].active === 1 ?
                    activeCourseIDToIndex : inactiveCourseIDToIndex;

                  // Determine the index in courses_registered for this course
                  var index;
                  if (!(courseID in courseIDToIndex)) {
                    var course = {
                      course_id: courseID,
                      course_name: rows[i].course_name,
                      course_desc: rows[i].course_desc,
                      active_questions: []
                    };
                    // Add the new course and record its index
                    index = courseList.push(course) - 1;
                    courseIDToIndex[courseID] = index;
                  } else {
                    // Lookup the course that has already been created
                    index = courseIDToIndex[courseID];
                  }

                  // If there is an active question to be added to the course
                  if (rows[i].question_id !== null &&
                      rows[i].asked === 1 &&
                      rows[i].completed === 0) {
                    // Add the question
                    courseList[index].active_questions.push({
                      question_id: rows[i].question_id,
                      title: rows[i].title,
                      body: rows[i].question_text,
                      answers: JSON.parse(rows[i].answers_array)
                    });
                  }
                }

                res.send(ret);
              }
            );
        })
        .catch(function(err) {
          res.send(err);
        });
    } else {
      res.send(errors.validationError);
    }
  },
};

