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
    'where class_name=?';

var userAlreadyEnrolledQuery =
    'select * ' +
    'from ece496.users_courses ' +
    'where user_id=? and course_id=?';

var insertLinkQuery =
    'insert into ece496.users_courses ' +
    '(user_id, course_id) ' +
    'values(?, ?)';

//EXPECTED REQUEST BODY: utorid, class_name
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
                    var class_name = req.body.class_name;
                    var student_id;
                    var course_id;

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
                                    courseQuery, [class_name],
                                    function(err, rows, fields) {
                                        if (err) {
                                            res.send(errors.unknownError);
                                            return;
                                        }
                                        if (rows.length == 0) {
                                            res.send(errors.invalidCourseError);
                                            return;
                                        } else {
                                            course_id = rows[0].id;
                                            //is the user already enrolled?
                                            connection.query(
                                                userAlreadyEnrolledQuery, [student_id, course_id],
                                                function(err, rows, fields) {
                                                    if (err) {
                                                        console.log(err);
                                                        res.send(errors.unknownError);
                                                        return;
                                                    }
                                                    if (rows.length !== 0) {
                                                        console.log(rows.length);
                                                        res.send(errors.userAlreadyEnrolledError);
                                                        return;
                                                    } else {
                                                        //otherwise do the operation
                                                        //console.log("User and course OK, enrolling.");
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
