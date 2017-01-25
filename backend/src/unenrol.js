var validate = require('jsonschema').validate;

var database = require('./database');
var config = require('./config');
var auth = require('./auth');
var schema = require('../../common/schemas').POST.unenrol;
var errors = require('../../common/errors').POST.enrol;

var courseQuery =
    'select id ' +
    'from ece496.courses ' +
    'where id=?';

var userAlreadyEnrolledQuery =
    'select * ' +
    'from ece496.users_courses ' +
    'where user_id=? and course_id=?';

var removeLinkQuery =
    'delete from ece496.users_courses ' +
    'where user_id=? and course_id=?';

//EXPECTED REQUEST BODY: course_id
module.exports = {
    handle: function(req, res) {
        auth.validateSessionToken(req.query.session_token)
            .then(function(user_id) {
                    var result = validate(req.body, schema);
                    if (result.errors.length !== 0) {
                        res.send(errors.schemaError);
                        return;
                    }

                    var course_id = req.body.course_id;

                    //does the course exist?
                    database.pool.query(
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
                                //is the user enrolled?
                                database.pool.query(
                                    userAlreadyEnrolledQuery, [user_id, course_id],
                                    function(err, rows, fields) {
                                        if (err) {
                                            console.log(err);
                                            res.send(errors.unknownError);
                                            return;
                                        }
                                        if (rows.length === 0) {
                                            res.send(errors.userNotEnrolledError);
                                            return;
                                        } else {
                                            //otherwise do the operation
                                            database.pool.query(
                                                removeLinkQuery, [user_id, course_id],
                                                function(err, rows, fields) {
                                                    if (err) {
                                                        res.send(errors.unknownError);
                                                        return;
                                                    } else {
                                                        res.send({
                                                            "success": "Unenrollment successful"
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
                },
                function(err) {
                    res.send(err);
                    return;
                });
    }
}
