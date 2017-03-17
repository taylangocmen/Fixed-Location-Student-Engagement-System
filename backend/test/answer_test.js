var assert = require('assert');
var rewire = require('rewire');
var sinon = require('sinon');

var stubdb = require('./stubdb');
var mockSessionToken = require('./mock_session_token');
var errors = require('../../common/errors').POST.answer;

var answer = rewire('../src/answer');
answer.__set__('database', stubdb);
answer.__set__('auth.validateSessionToken', mockSessionToken);

var validRequest = {
  body: {
    course_id: 496,
    question_id: 1,
    answer: 5,
    neighbours: [],
    device_id: 'device'
  }
};

describe('Answer', function() {
  describe('#handle()', function() {
    // Reset the database before each test
    beforeEach(function() {
      stubdb.reset();
    });

    it('handles missing parameters', function() {
      var req = {
        body: { }
      };
      var res = { send: sinon.spy() };

      answer.handle(req, res);

      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.equal(res.send.args[0][0], errors.validationError);
    });

    it('verifies that the user is enrolled', function() {
      var req = validRequest;
      var res = { send: sinon.spy() };

      // When the database is queried for whether the user is enrolled,
      // return an empty result
      stubdb.pool.query.onCall(0)
                  .callsArgWith(2, null, [], null);

      answer.handle(req, res);

      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.deepEqual(res.send.args[0][0], errors.enrolmentError);
    });

    // TODO Add more tests

  });
});

