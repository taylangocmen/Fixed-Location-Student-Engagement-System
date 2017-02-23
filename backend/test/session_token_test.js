var assert = require('assert');
var rewire = require('rewire');
var sinon = require('sinon');

var mockdb = require('./mockdb');
var errors = require('../../common/errors').POST.session_token;

var sessionToken = rewire('../src/session_token');
sessionToken.__set__('database', mockdb);

describe('SessionToken', function() {
  describe('#validate()', function() {
    // Reset the database before each test
    beforeEach(function() {
      mockdb.reset();
    });

    it('handles missing parameters', function() {
      var token = undefined;

      var promise = sessionToken.validate(token);

      return promise.then(
        function(id) { assert(false, 'Promise unexpectedly resolved') },
        function(err) { assert.equal(err, errors.missingSessionTokenError) }
      );
    });

    it('handles invalid session tokens', function() {
      var token = 'token';

      // The database returns no data matching the session token
      mockdb.pool.query.onCall(0)
                  .callsArgWith(2, null, [], null);

      var promise = sessionToken.validate(token);

      return promise.then(
        function(id) { assert(false, 'Promise unexpectedly resolved') },
        function(err) { assert.equal(err, errors.invalidSessionTokenError) }
      );
    });

    it('handles database errors', function() {
      var token = 'token';

      // The database returns an error
      mockdb.pool.query.onCall(0)
                  .callsArgWith(2, 'database error', null, null);

      var promise = sessionToken.validate(token);

      return promise.then(
        function(id) { assert(false, 'Promise unexpectedly resolved') },
        function(err) { assert.equal(err, errors.validateSessionTokenError) }
      );
    });

    it('validates the database response', function() {
      var token = 'token';

      // The database returns invalid data matching the session token
      mockdb.pool.query.onCall(0)
                  .callsArgWith(2, null, [{}], null);

      var promise = sessionToken.validate(token);

      return promise.then(
        function(id) { assert(false, 'Promise unexpectedly resolved') },
        function(err) { assert.equal(err, errors.validateSessionTokenError) }
      );
    });

    it('handles expired session tokens', function() {
      var token = 'token';

      var databaseResponse = [{
        id: 1,
        session_token_expiry: ((new Date()).getTime() - 1)
      }];

      // The database returns valid data matching the session token
      // The data indicates that the session token is expired
      mockdb.pool.query.onCall(0)
                  .callsArgWith(2, null, databaseResponse, null);

      var promise = sessionToken.validate(token);

      return promise.then(
        function(id) { assert(false, 'Promise unexpectedly resolved') },
        function(err) { assert.equal(err, errors.expiredSessionTokenError) }
      );
    });

    it('handles valid session tokens', function() {
      var token = 'token';

      var databaseResponse = [{
        id: 1,
        session_token_expiry: ((new Date()).getTime() + 1000 * 60 * 60 * 24)
      }];

      // The database returns valid data matching the session token
      // The data indicates that the session token is not expired
      mockdb.pool.query.onCall(0)
                  .callsArgWith(2, null, databaseResponse, null);

      var promise = sessionToken.validate(token);

      return promise.then(
        function(id) { assert.equal(id, 1); }
      );
    });

  });
});

