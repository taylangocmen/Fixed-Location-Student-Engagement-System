var assert = require('assert');
var Promise = require('promise');
var rewire = require('rewire');
var sinon = require('sinon');

var mockdb = require('./mockdb');
var mockSessionToken = require('./mock_session_token');
var errors = require('../../common/errors').POST.question;
var createUpdateQuestion = rewire('../src/create_update_question');

createUpdateQuestion.__set__('database', mockdb);
createUpdateQuestion.__set__('auth.validateSessionToken', mockSessionToken);

var newQuestionBody = {
  course_id: 5,
  timeout: 1000,
  question: {
    text: 'This is a question?',
    correct_answer: 1,
    answers: [
      'Yes, it is.'
    ]
  }
};

describe('Question', function() {
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

      createUpdateQuestion.handle(req, res);

      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.equal(res.send.args[0][0], errors.validationError);
    });

    it('handles create question', function() {
      var req = {
        query: { session_token: '' },
        body: JSON.parse(JSON.stringify(newQuestionBody))
      };
      var res = { send: sinon.spy() };

      // Return that the user is authorized to create questions for this class
      mockdb.query.onCall(0)
                  .callsArgWith(2, null, [{id: 5}], null);

      // When the new question gets inserted, return that its id is 100
      mockdb.query.onCall(1)
                  .callsArgWith(2, null, {insertId: 100}, null);

      createUpdateQuestion.handle(req, res);

      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.deepEqual(res.send.args[0][0], {course_id: 5, question_id: 100});
    });

    it('handles update invalid question', function() {
      var req = {
        query: { session_token: '' },
        body: JSON.parse(JSON.stringify(newQuestionBody))
      };
      var res = { send: sinon.spy() };

      req.body.question_id = 10;

      // Return that the user is authorized to create questions for this class
      mockdb.query.onCall(0)
                  .callsArgWith(2, null, [{id: 5}], null);

      // When the question_id gets checked, return that it is invalid
      mockdb.query.onCall(1)
                  .callsArgWith(2, null, [], null);

      createUpdateQuestion.handle(req, res);

      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.equal(res.send.args[0][0], errors.invalidQuestionError);
    });

    it('handles update asked question', function() {
      var req = {
        query: { session_token: '' },
        body: JSON.parse(JSON.stringify(newQuestionBody))
      };
      var res = { send: sinon.spy() };

      req.body.question_id = 10;

      // Return that the user is authorized to create questions for this class
      mockdb.query.onCall(0)
                  .callsArgWith(2, null, [{id: 5}], null);

      // When the question_id gets checked, return that it has already been asked
      mockdb.query.onCall(1)
                  .callsArgWith(2, null, [{asked: true}], null);


      createUpdateQuestion.handle(req, res);

      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.equal(res.send.args[0][0], errors.updatingAskedQuestion);
    });

    it('handles update question', function() {
      var req = {
        query: { session_token: '' },
        body: JSON.parse(JSON.stringify(newQuestionBody))
      };
      var res = { send: sinon.spy() };

      req.body.question_id = 10;

      // Return that the user is authorized to create questions for this class
      mockdb.query.onCall(0)
                  .callsArgWith(2, null, [{id: 5}], null);

      // When the question_id gets checked, return that it hasn't been asked
      mockdb.query.onCall(1)
                  .callsArgWith(2, null, [{asked: false}], null);

      // When the question gets updated, return success
      mockdb.query.onCall(2)
                  .callsArgWith(2, null, null, null);

      createUpdateQuestion.handle(req, res);

      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.deepEqual(res.send.args[0][0], {course_id: 5, question_id: 10});
    });

    it('handles unauthorized users', function() {
      var req = {
        query: { session_token: '' },
        body: JSON.parse(JSON.stringify(newQuestionBody))
      };
      var res = { send: sinon.spy() };

      // Return that the user is authorized to create questions for this class
      mockdb.query.onCall(0)
                  .callsArgWith(2, null, [], null);

      createUpdateQuestion.handle(req, res);

      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.equal(res.send.args[0][0], errors.authorizationError);
    });

  });
});

