var assert = require('assert');
var rewire = require('rewire');
var sinon = require('sinon');

var mockdb = require('./mockdb');
var mockSessionToken = require('./mock_session_token');
var errors = require('../../common/errors').POST.create_course;

var createCourse = rewire('../src/create_course');
createCourse.__set__('database', mockdb);
createCourse.__set__('auth.validateSessionToken', mockSessionToken);

describe('Create Course', function() {
  describe('#handle()', function() {
    // Reset the database before each test
    beforeEach(function() {
      mockdb.reset();
    });

    it('handles missing parameters', function() {
      var req = {
        query: { session_token: '' },
        body: { }
      };
      var res = { send: sinon.spy() };

      createCourse.handle(req, res);

      // TODO improve this test by making it check each of the fields of the request
      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.equal(res.send.args[0][0], errors.validationError);
    });

    it('handles unauthorized users', function() {
      var req = {
        query: { session_token: '' },
        body: { course_name: 'ece496', course_desc: 'hello!' }
      };
      var res = { send: sinon.spy() };

      // Return that the user is unauthorized to create questions for this class
      mockdb.query.onCall(0)
                  .callsArgWith(2, null, [], null);

      createCourse.handle(req, res);

      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.equal(res.send.args[0][0], errors.authorizationError);
    });

    it('handles create course', function() {
      var req = {
        query: { session_token: '' },
        body: { course_name: 'ece496', course_desc: 'hello!' }
      };
      var res = { send: sinon.spy() };

      // Return that the user is authorized to create questions for this class
      mockdb.query.onCall(0)
                  .callsArgWith(2, null, [{id: 5}], null);

      // When the new course gets inserted, return that its id is 100
      mockdb.query.onCall(1)
                  .callsArgWith(2, null, {insertId: 100}, null);

      createCourse.handle(req, res);

      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.deepEqual(res.send.args[0][0], {course_id: 100, course_name: 'ece496'});
    });

  });
});

