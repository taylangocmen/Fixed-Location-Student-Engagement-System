var assert = require('assert');
var proc = require('child_process');
var CondVar = require('condvar');

var database = require('../src/database');
var request = require('./request');

var serverProcess = null, serverPid = null;

var test_user = {
  first_name: 'system',
  last_name: 'test',
  email: 'system_test@mail.utoronto.ca',
  utorid: 'system_test',
  pass_hash: '1234'
};
var credentials = {
  username: test_user.utorid,
  pass_hash: test_user.pass_hash
};
var test_course = {
  course_name: 'System Test Course',
  course_desc: 'System Test'
};

var db = function(query, params) {
  cv = new CondVar;
  database.pool.query(
    query,
    params,
    function(err, rows, fields) {
      if (err) {
        console.log(err);
      }
      cv.send(rows);
    });
  return cv.recv();
};

var assertMatches = function(string, regex) {
  assert.ok(regex.test(string), string + ' does not match ' + regex);
};

describe('System Tests', function() {
  before(function() {
    cv = new CondVar;
    proc.exec('pgrep -u $USER -f \'node src/index.js\'', function (error, stdout, stderr) {
      if (error) {
        serverProcess = proc.spawn('node', ['src/index.js'], {shell: true});
        // Give the server 1 second to start up
        setTimeout(function() { cv.send(); }, 1000);
      } else {
        serverPid = stdout;
        cv.send();
      }
    });
    cv.recv();
  });

  after(function() {
    if (serverProcess != null) {
      serverProcess.kill();
    }

    // Reset the database
    var course_ids = db('select id from ece496.courses where course_name=?', [test_course.course_name]);
    for (var i = 0; i < course_ids.length; i++) {
      db('delete from ece496.users_courses where course_id=?', [course_ids[i].id]);
    }
    db('delete from ece496.courses where course_name=?', [test_course.course_name]);
    db('delete from ece496.users where utorid=?', [test_user.utorid]);
  });

  it("successfully registers", function() {
    var response = request('/register', 'POST', test_user);
    assert.deepEqual(response, {});
    // Expect that the user was created in the database
    var dbResults = db('select first_name, last_name, email, utorid, pass_hash ' +
                       'from ece496.users ' +
                       'where utorid=?',
                       [test_user.utorid]);
    assert.equal(dbResults.length, 1);
    assert.deepEqual(dbResults[0], test_user);
  });

  var login = function() {
    var response = request('/login', 'POST', credentials);
    assert.deepEqual(response, {session_token: response.session_token});
    assertMatches(response.session_token, /[a-f0-9]+/);
    return response.session_token;
  };

  it("successfully logs in", function() {
    var session_token = login();

    // Expect that the session token is stored in the database
    var dbResults = db('select session_token, session_token_expiry ' +
                       'from ece496.users ' +
                       'where utorid=?',
                       [test_user.utorid]);
    assert.equal(dbResults.length, 1);
    assert.equal(dbResults[0].session_token, session_token);
    // The expiry should be less than one day
    var oneDay = 1000 * 60 * 60 * 24;
    assert.ok(dbResults[0].session_token_expiry <= (new Date()).getTime() + oneDay);
  });

  it("successfully creates a course", function() {
    var session_token = login();

    // Allow the user to create courses
    db('update ece496.users set create_courses=true where utorid=?', [test_user.utorid]);

    var response = request('/create_course', 'POST', test_course, session_token);
    assert.deepEqual(response, {course_id: response.course_id, course_name: test_course.course_name});
    assert.equal(typeof response.course_id, 'number');

    test_course.course_id = response.course_id;

    // Expect that the course was actually created
    var dbResults = db('select id ' +
                       'from ece496.courses ' +
                       'where id=?',
                       [test_course.course_id]);
    assert.equal(dbResults.length, 1);
  });

  it("successfully enrols in a course", function() {
    var session_token = login();

    var response = request('/enrol', 'POST', {course_id: test_course.course_id}, session_token);
    assert.deepEqual(response, {});

    // Expect the enrolment to actually enrol the user
    var dbResults = db('select utorid ' +
                       'from ece496.users_courses a join ece496.users b ' +
                       'on a.user_id=b.id ' +
                       'where course_id=?',
                       [test_course.course_id]);
    assert.equal(dbResults.length, 1);
    assert.equal(dbResults[0].utorid, test_user.utorid);
  });

  it("successfully unenrols in a course", function() {
    var session_token = login();

    var response = request('/unenrol', 'POST', {course_id: test_course.course_id}, session_token);
    assert.deepEqual(response, {});

    // Expect the enrolment to actually unenrol the user
    var dbResults = db('select utorid ' +
                       'from ece496.users_courses a join ece496.users b ' +
                       'on a.user_id=b.id ' +
                       'where course_id=?',
                       [test_course.course_id]);
    assert.equal(dbResults.length, 0);
  });
});
