var assert = require('assert');
var rewire = require('rewire');
var sinon = require('sinon');

var mockdb = require('./mockdb');
var errors = require('../../common/errors').POST.login;

var login = rewire('../src/login');
login.__set__('database', mockdb);

// TODO: write tests to make sure each field gets tested
var validUserInfo = {
  id:1,
  email:'test@test.com',
  utorid:'test',
  first_name:'Test',
  last_name:'Test'
};
var validSessionToken = { session_token:'1234' };

var sessionTokenMatcher = sinon.match(function(value) {
  return 'session_token' in value;
}, 'sessionToken');

describe('Login', function() {
  describe('#handle()', function() {
    // Reset the database before each test
    beforeEach(function() {
      mockdb.reset();
    });

    it('handles missing parameters', function() {
      var req = { body: { } };
      var res = { send: sinon.spy() };

      login.handle(req, res);

      // TODO improve this test by making it check each of the fields of the request
      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.equal(res.send.args[0][0], errors.validationError);
    });

    it('checks credentials', function() {
      // Attempt to login with invalid credentials
      var req = { body: { username:'test', pass_hash:'1234' } };
      var res = { send: sinon.spy() };

      // The first database query returns an empty list
      mockdb.pool.query.onCall(0)
                  .callsArgWith(2, null, [], null);

      login.handle(req, res);

      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.equal(res.send.args[0][0], errors.invalidCredentialsError);
    });

    it('does not allow session tokens to be assigned to multiple users', function() {
      // Attempt to login with valid credentials
      var req = { body: { username:'test', pass_hash:'1234' } };
      var res = { send: sinon.spy() };

      // The first database call returns a valid user
      mockdb.pool.query.onCall(0)
                  .callsArgWith(2, null, [validUserInfo], null);
      // The second database call returns that the session token has
      // already been assigned
      mockdb.pool.query.onCall(1)
                  .callsArgWith(2, null, [validSessionToken], null); 

      login.handle(req, res);

      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.equal(res.send.args[0][0], errors.unknownError);
    });

    it('generates a session token for correct credentials', function() {
      // Attempt to login with valid credentials
      var req = { body: { username:'test', pass_hash:'1234' } };
      var res = { send: sinon.spy() };

      // The first database call returns a valid user
      mockdb.pool.query.onCall(0)
                  .callsArgWith(2, null, [validUserInfo], null);
      // The second database call returns that the session token hasn't
      // already been assigned
      mockdb.pool.query.onCall(1)
                  .callsArgWith(2, null, [], null); 
      // The third database call returns that there were no errors updating
      // the database with the session token
      mockdb.pool.query.onCall(2)
                  .callsArgWith(2, null, null, null); 

      login.handle(req, res);

      // Verify that a session token was returned
      assert(res.send.calledWith(sessionTokenMatcher));
    });

    // TODO: Add tests for query() returning an err at each stage
  });
});

