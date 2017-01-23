var validate = require('jsonschema').validate;

var database = require('./database');
var config = require('./config');
var auth = require('./auth');
var schema = require('../../common/schemas').POST.enrol;
var errors = require('../../common/errors').POST.enrol;

var userQuery =
    'select * ' +
    'from ece496.users ' +
    'where utorid=?';

var courseQuery =
    'select id ' +
    'from ece496.courses ' +
    'where id=?';

var userAlreadyEnrolledQuery =
    'select * ' +
    'from ece496.users_courses ' +
    'where user_id=? and course_id=?';

var insertLinkQuery =
    'insert into ece496.users_courses ' +
    '(user_id, course_id) ' +
    'values(?, ?)';

var removeLinkQuery =
    'delete from ece496.users_courses ' +
    'where user_id=? and course_id=?';

//EXPECTED REQUEST BODY: utorid, course_id, command (enrol or unenrol). enrol can be null
module.exports = {
    handle: function(req, res) {
        //console.log(req.query.session_token);
        auth.validateSessionToken(req.query.session_token)
            .then(function(user_id) {
                    var result = validate(req.body, schema);
                    console.log(result.errors.length);

                    if (result.errors.length !== 0) {
                        res.send(errors.schemaError);
                        return;
                    }

                    var connection = database.connect();
                    var utorid = req.body.utorid;
                    var course_id = req.body.course_id;
                    var cmd = req.body.command;
                    var student_id;

                    //does user exist?
                    var query = connection.query(
                        userQuery, [utorid],
                        function(err, rows, fields) {
                            if (err) {
                                res.send(errors.unknownError);
                                return;
                            }
                            if (rows.length == 0) {
                                res.send(errors.invalidUserError);
                                return;
                            } else {
                                student_id = rows[0].id;
                                //does the course exist?
                                connection.query(
                                    courseQuery, [course_id],
                                    function(err, rows, fields) {
                                        if (err) {
                                            res.send(errors.unknownError);
                                            return;
                                        }
                                        if (rows.length == 0) {
                                            res.send(errors.invalidCourseError);
                                            return;
                                        } else {
                                            //is the user already enrolled?
                                            connection.query(
                                                userAlreadyEnrolledQuery, [student_id, course_id],
                                                function(err, rows, fields) {
                                                    if (err) {
                                                        console.log(err);
                                                        res.send(errors.unknownError);
                                                        return;
                                                    }
                                                    if (rows.length === 0 && cmd == 'unenrol') {
                                                      res.send(errors.userNotEnrolledError);
                                                      return;
                                                    }
                                                    //default command assumed to be 'enrol'
                                                    if (rows.length !== 0) {
                                                        //console.log(rows.length);
                                                        res.send(errors.userAlreadyEnrolledError);
                                                        return;
                                                    } else {
                                                        //otherwise do the operation
                                                        if (cmd == "enrol" || cmd == "enroll" || cmd == null) {
                                                        connection.query(
                                                            insertLinkQuery, [student_id, course_id],
                                                            function(err, rows, fields) {
                                                                if (err) {
                                                                    res.send(errors.unknownError);
                                                                    return;
                                                                } else {
                                                                    res.send({
                                                                        "success": "Enrollment successful"
                                                                    });
                                                                    return;
                                                                }
                                                            }
                                                        );
                                                      }
                                                      else if (cmd == "unenrol" || cmd == "unenroll") {
                                                        connection.query(
                                                            removeLinkQuery, [student_id, course_id],
                                                            function(err, rows, fields) {
                                                                if (err) {
                                                                    res.send(errors.unknownError);
                                                                    return;
                                                                } else {
                                                                    res.send({
                                                                        "success": "User unenroled"
                                                                    });
                                                                    return;
                                                                }
                                                            }
                                                        );
                                                      }
                                                      else {
                                                        res.send(errors.invalidCommandError);
                                                      }
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }
                        }
                    );
                },
                function(err) {
                    res.send(err);
                    return;
                });
    }
}
