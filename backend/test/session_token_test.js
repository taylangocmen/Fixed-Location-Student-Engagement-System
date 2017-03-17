var assert = require('assert');
var rewire = require('rewire');
var sinon = require('sinon');

var stubdb = require('./stubdb');
var errors = require('../../common/errors').POST.session_token;

var sessionToken = rewire('../src/session_token');
sessionToken.__set__('database', stubdb);

var createToken = function(token) {
  var req = { get: sinon.stub() };
  req.get.returns(token);
  return req;
};

describe('SessionToken', function() {
  describe('#validate()', function() {
    // Reset the database before each test
    beforeEach(function() {
      stubdb.reset();
    });

    it('handles missing parameters', function() {
      var token = createToken(undefined);

      var promise = sessionToken.validate(token);

      return promise.then(
        function(id) { assert(false, 'Promise unexpectedly resolved') },
        function(err) { assert.equal(err, errors.missingSessionTokenError) }
      );
    });

    it('handles non-Bearer session tokens', function() {
      var token = createToken('token');

      var promise = sessionToken.validate(token);

      return promise.then(
        function(id) { assert(false, 'Promise unexpectedly resolved') },
        function(err) { assert.equal(err, errors.missingSessionTokenError) }
      );
    });

    it('handles non-hex session tokens', function() {
      var token = createToken('Bearer g');

      var promise = sessionToken.validate(token);

      return promise.then(
        function(id) { assert(false, 'Promise unexpectedly resolved') },
        function(err) { assert.equal(err, errors.missingSessionTokenError) }
      );
    });

    it('handles invalid session tokens', function() {
      var token = createToken('Bearer abcdef0123456789');

      // The database returns no data matching the session token
      stubdb.pool.query.onCall(0)
                  .callsArgWith(2, null, [], null);

      var promise = sessionToken.validate(token);

      return promise.then(
        function(id) { assert(false, 'Promise unexpectedly resolved') },
        function(err) { assert.equal(err, errors.invalidSessionTokenError) }
      );
    });

    it('handles database errors', function() {
      var token = createToken('Bearer abcdef0123456789');

      // The database returns an error
      stubdb.pool.query.onCall(0)
                  .callsArgWith(2, 'database error', null, null);

      var promise = sessionToken.validate(token);

      return promise.then(
        function(id) { assert(false, 'Promise unexpectedly resolved') },
        function(err) { assert.equal(err, errors.unknownError) }
      );
    });

    it('validates the database response', function() {
      var token = createToken('Bearer abcdef0123456789');

      // The database returns invalid data matching the session token
      stubdb.pool.query.onCall(0)
                  .callsArgWith(2, null, [{}], null);

      var promise = sessionToken.validate(token);

      return promise.then(
        function(id) { assert(false, 'Promise unexpectedly resolved') },
        function(err) { assert.equal(err, errors.validateSessionTokenError) }
      );
    });

    it('handles expired session tokens', function() {
      var token = createToken('Bearer abcdef0123456789');

      var databaseResponse = [{
        id: 1,
        session_token_expiry: ((new Date()).getTime() - 1)
      }];

      // The database returns valid data matching the session token
      // The data indicates that the session token is expired
      stubdb.pool.query.onCall(0)
                  .callsArgWith(2, null, databaseResponse, null);

      var promise = sessionToken.validate(token);

      return promise.then(
        function(id) { assert(false, 'Promise unexpectedly resolved') },
        function(err) { assert.equal(err, errors.expiredSessionTokenError) }
      );
    });

    it('handles valid session tokens', function() {
      var token = createToken('Bearer abcdef0123456789');

      var databaseResponse = [{
        id: 1,
        session_token_expiry: ((new Date()).getTime() + 1000 * 60 * 60 * 24)
      }];

      // The database returns valid data matching the session token
      // The data indicates that the session token is not expired
      stubdb.pool.query.onCall(0)
                  .callsArgWith(2, null, databaseResponse, null);

      var promise = sessionToken.validate(token);

      return promise.then(
        function(id) { assert.equal(id, 1); }
      );
    });

  });
});

