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

var assertMatches = function(string, regex) {
  assert.ok(regex.test(string), string + ' does not match ' + regex);
};

describe('System Tests', function() {
  before(function() {
    cv = new CondVar;
    proc.exec('pgrep -u $USER -f \'node src/index.js\'', function (error, stdout, stderr) {
      if (error) {
        serverProcess = proc.spawn('node', ['src/index.js'], {shell: true});
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

    // Delete the user from the database
    cv = new CondVar;
    database.pool.query(
      'delete from ece496.users where utorid=?',
      [test_user.utorid],
      function(err, rows, fields) {
        cv.send();
      });
    cv.recv();
  });

  it("successfully registers", function() {
    var response = request('/register', 'POST', test_user);
    assert.deepEqual(response, {});
  });

  it("successfully logs in", function() {
    var credentials = {
      username: test_user.utorid,
      pass_hash: test_user.pass_hash
    };
    var response = request('/login', 'POST', credentials);
    assert.deepEqual(response, {session_token: response.session_token});
    assertMatches(response.session_token, /[a-f0-9]+/);
  });
});
