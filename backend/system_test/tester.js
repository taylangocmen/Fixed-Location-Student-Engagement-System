var assert = require('assert');
var proc = require('child_process');
var CondVar = require('condvar');

var database = require('../src/database');
var request = require('./request');

var test_user = {
  first_name: 'system',
  last_name: 'test',
  email: 'system_test0@mail.utoronto.ca',
  utorid: 'system_test0',
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
var question1 = {
  course_id: undefined, // Populated later
  timeout: 1000,
  question: {
    title: 'System Test Question 1',
    text: 'This is a system test question?',
    correct_answer: 1,
    answers: [
      'Yes, this is a system test question.',
      'No, this is not a system test question.'
    ]
  }
};
var updated_question1 = {
  course_id: undefined, // Populated later
  question_id: undefined, // Populated later
  timeout: 2000,
  question: {
    title: 'System Test Question 4',
    text: 'This is a system test question????',
    correct_answer: 2,
    answers: [
      'Yes, this is a system test question....',
      'No, this is not a system test question....',
      'Hello world!'
    ]
  }
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
  var serverProcess = null, serverPid = null;

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
    // Iterate over all courses that have the system test course name
    for (var i = 0; i < course_ids.length; i++) {
      db('delete from ece496.submissions where course_id=?', [course_ids[i].id]);
      db('delete from ece496.users_courses where course_id=?', [course_ids[i].id]);
      db('delete from ece496.questions where course_id=?', [course_ids[i].id]);
    }
    db('delete from ece496.courses where course_name=?', [test_course.course_name]);
    db('delete from ece496.users where utorid like \'system_test%\'', [test_user.utorid]);
  });

  var createAndEnrolNewUser = function(id) {
    var user = JSON.parse(JSON.stringify(test_user));
    user.utorid = 'system_test' + id;
    user.email = user.utorid + '@mail.utoronto.ca';

    var response = request('/register', 'POST', user);
    assert.deepEqual(response, {});

    response = request('/login', 'POST', {
      username: user.utorid,
      pass_hash: user.pass_hash
    });
    var session_token = response.session_token;
    assert.deepEqual(response, {session_token: session_token});
    assertMatches(session_token, /[a-f0-9]+/);

    response = request('/enrol', 'POST', {course_id: test_course.course_id}, session_token);
    assert.deepEqual(response, {});

    return {session_token: session_token, user: user};
  };

  describe('Functionality Tests', function() {
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
      question1.course_id = test_course.course_id;
      updated_question1.course_id = test_course.course_id;

      // Expect that the course was actually created
      var dbResults = db('select id ' +
                         'from ece496.courses ' +
                         'where id=?',
                         [test_course.course_id]);
      assert.equal(dbResults.length, 1);

      // Verify that the course exists
      response = request('/questions?course_id=' + response.course_id, 'GET', '', session_token);
      assert.deepEqual(response, {active_questions: [], inactive_questions: []});
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

    var verifyQuestion = function(dbResult, question) {
      assert.equal(dbResult.id, question.question_id);
      assert.equal(dbResult.course_id, question.course_id);
      assert.equal(dbResult.timeout, question.timeout);
      assert.equal(dbResult.title, question.question.title);
      assert.equal(dbResult.question_text, question.question.text);
      assert.equal(dbResult.correct_answer, question.question.correct_answer);
      assert.equal(dbResult.answers_array, JSON.stringify(question.question.answers));
    };

    it("successfully creates a question", function() {
      var session_token = login();

      var response = request('/question', 'POST', question1, session_token);
      assert.deepEqual(response, {course_id: test_course.course_id, question_id: response.question_id});
      assert.equal(typeof response.question_id, 'number');

      question1.question_id = response.question_id;
      updated_question1.question_id = question1.question_id;

      // Expect the question to be created
      var dbResults = db('select * ' +
                         'from ece496.questions ' +
                         'where id=?',
                         [response.question_id]);
      assert.equal(dbResults.length, 1);
      verifyQuestion(dbResults[0], question1);
    });

    it("successfully updates a question", function() {
      var session_token = login();

      var response = request('/question', 'POST', updated_question1, session_token);
      assert.deepEqual(response, {course_id: test_course.course_id, question_id: response.question_id});
      assert.equal(typeof response.question_id, 'number');

      // Expect the question to be created
      var dbResults = db('select * ' +
                         'from ece496.questions ' +
                         'where id=?',
                         [response.question_id]);
      assert.equal(dbResults.length, 1);
      verifyQuestion(dbResults[0], updated_question1);
    });

    it('successfully poses a question', function() {
      var session_token = login();

      // Expect the response to be empty - no error
      var response = request('/question', 'PUT', {course_id: test_course.course_id, question_id: updated_question1.question_id}, session_token);
      assert.deepEqual(response, {});

      // Verify that the course exists
      response = request('/questions?course_id=' + test_course.course_id, 'GET', '', session_token);
      assert.deepEqual(response, {
        active_questions: [{
            answers: updated_question1.question.answers,
            body: updated_question1.question.text,
            title: updated_question1.question.title,
            question_id: updated_question1.question_id
        }],
        inactive_questions: []
      });
    });

    it('successfully accepts answers to a question', function() {
      var validAnswer = {
        course_id: test_course.course_id,
        question_id: updated_question1.question_id
      };
      for (var i = 1; i <= 10; i++) {
        var info = createAndEnrolNewUser(i);
        validAnswer.answer = i % 3;
        // Set up the neighbours so that all users see each other
        validAnswer.neighbours = [];
        for (var j = 1; j <= 10; j++) {
          // Users do not see themselves, and no one sees system_test4 or system_test8
          if (i !== j && j % 4 !== 0) {
            validAnswer.neighbours.push('system_test' + j + ' device');
          }
        }
        validAnswer.device_id = 'system_test' + i + ' device';

        var response = request('/answer', 'POST', validAnswer, info.session_token);
        // Expect the response to be empty - no error
        assert.deepEqual(response, {});
      }
    });

    it('successfully closes a question', function() {
      var session_token = login();
      var questionToClose = {
        course_id: test_course.course_id,
        question_id: updated_question1.question_id
      };
      var response = request('/close_question', 'PUT', questionToClose, session_token);
      // Expect the response to be empty - no error
      assert.deepEqual(response, {});

      for (var i = 1; i <= 10; i++) {
        // Login as the user
        response = request('/login', 'POST', {
          username: 'system_test' + i,
          pass_hash: test_user.pass_hash
        });
        session_token = response.session_token;
        assert.deepEqual(response, {session_token: session_token});
        assertMatches(session_token, /[a-f0-9]+/);

        response = request('/questions?course_id=' + test_course.course_id, 'GET', '', session_token);
        // Expect the response to be empty - no error
        assert.deepEqual(response, {
          active_questions: [],
          inactive_questions: [{
              answers: updated_question1.question.answers,
              body: updated_question1.question.text,
              title: updated_question1.question.title,
              question_id: updated_question1.question_id,
              answer: i % 3,
              answer_accepted: i % 4 === 0 ? false : true,
              correct_answer: 2
          }]
        });
      }
    });
  });

  describe('Performance Tests', function() {
    var numLoginRequests = 500;
    it('handles ' + numLoginRequests + ' login requests at once', function() {
      this.timeout(5000);

      var responses = [];
      var cv = new CondVar;
      for (var i = 0; i < numLoginRequests; i++) {
        cv.begin();
        request('/login', 'POST', credentials, null, function(response) {
          responses.push(response);
          cv.end();
        });
      }
      // Wait for all of the requests to finish
      cv.recv();

      assert.equal(responses.length, numLoginRequests);

      for (var i = 0; i < responses.length; i++) {
        assert.deepEqual(responses[i], {session_token: responses[i].session_token});
        assertMatches(responses[i].session_token, /[a-f0-9]+/);
      }
    });

    var numAnswerRequests = 500;
    it('handles ' + numAnswerRequests + ' answer requests at once', function() {
      this.timeout(12000);

      db('update ece496.questions set asked=true, completed=false where id=?', [updated_question1.question_id]);

      var responses = [];
      var cv = new CondVar;
      for (var k = 0; k < numAnswerRequests / 10; k++) {
        var validAnswer = {
          course_id: test_course.course_id,
          question_id: updated_question1.question_id
        };
        for (var i = 1; i <= 10; i++) {
          cv.begin();

          // Login as the user
          response = request('/login', 'POST', {
            username: 'system_test' + i,
            pass_hash: test_user.pass_hash
          });
          session_token = response.session_token;
          validAnswer.answer = (i * k) % 3;
          // Set up the neighbours so that all users see each other
          validAnswer.neighbours = [];
          for (var j = 1; j <= 10; j++) {
            // Users do not see themselves, and no one sees system_test4 or system_test8
            if (i !== j && j % 4 !== 0) {
              validAnswer.neighbours.push('system_test' + j + ' device');
            }
          }
          validAnswer.device_id = 'system_test' + i + ' device';

          request('/answer', 'POST', validAnswer, session_token, function(response) {
            responses.push(response);
            cv.end();
          });
        }
      }

      cv.recv();

      assert.equal(responses.length, numAnswerRequests);

      for (var i = 0; i < responses.length; i++) {
        assert.deepEqual(responses[i], {});
      }
    });
  });
});
