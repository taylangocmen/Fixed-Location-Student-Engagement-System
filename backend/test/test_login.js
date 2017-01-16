var assert = require('assert');
var rewire = require('rewire');
var sinon = require('sinon');

var mockdb = require('./mockdb');

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

    it('should handle missing parameters', function() {
      var req = { body: { } };
      var res = { send: sinon.spy() };

      login.handle(req, res);

      // TODO the error message should be specified in a common module
      assert(res.send.calledWith(login.__get__('missingParamsError')));
    });

    it('should check credentials', function() {
      var req = { body: { username:'hello', pass_hash:'1234' } };
      var res = { send: sinon.spy() };

      // The first query returns an empty list
      mockdb.query.onCall(0)
                  .callsArgWith(2, null, [], null);

      login.handle(req, res);

      // TODO the error message should be specified in a common module
      assert(res.send.calledWith(login.__get__('invalidCredentialsError')));
    });

    it('should not allow session tokens to be assigned to multiple users', function() {
      var req = { body: { username:'hello', pass_hash:'1234' } };
      var res = { send: sinon.spy() };

      mockdb.query.onCall(0)
                  .callsArgWith(2, null, [validUserInfo], null);
      mockdb.query.onCall(1)
                  .callsArgWith(2, null, [validSessionToken], null); 

      login.handle(req, res);

      // TODO the error message should be specified in a common module
      assert(res.send.calledWith(login.__get__('unknownError')));
    });

    it('should generate a session token for correct credentials', function() {
      var req = { body: { username:'hello', pass_hash:'1234' } };
      var res = { send: sinon.spy() };

      mockdb.query.onCall(0)
                  .callsArgWith(2, null, [validUserInfo], null);
      mockdb.query.onCall(1)
                  .callsArgWith(2, null, [], null); 
      mockdb.query.onCall(2)
                  .callsArgWith(2, null, null, null); 

      login.handle(req, res);

      assert(res.send.calledWith(sessionTokenMatcher));
    });

    // TODO: Add tests for query() returning an err at each stage
  });
});

