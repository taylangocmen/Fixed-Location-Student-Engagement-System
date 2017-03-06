var validate = require('jsonschema').validate;

var database = require('./database');
var config = require('./config');
var auth = require('./auth');
var schema = require('../../common/schemas').POST.enrol;
var errors = require('../../common/errors').POST.enrol;

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

                    database.pool.query(
                        courseQuery, [course_id],
                        function(err, rows, fields) {
                            if (err) {
                                res.send(errors.unknownError);
                                return;
                            }
                            if (rows.length === 0) {
                                res.send(errors.invalidCourseError);
                                return;
                            } else {
                                //is the user already enrolled?
                                database.pool.query(
                                    userAlreadyEnrolledQuery, [user_id, course_id],
                                    function(err, rows, fields) {
                                        if (err) {
                                            console.log(err);
                                            res.send(errors.unknownError);
                                            return;
                                        }
                                        if (rows.length !== 0) {
                                            res.send(errors.userAlreadyEnrolledError);
                                            return;
                                        } else {
                                            //otherwise do the operation
                                            database.pool.query(
                                                insertLinkQuery, [user_id, course_id],
                                                function(err, rows, fields) {
                                                    if (err) {
                                                        res.send(errors.unknownError);
                                                        return;
                                                    } else {
                                                        res.send({});
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
