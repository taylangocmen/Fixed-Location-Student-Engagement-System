var assert = require('assert');
var Promise = require('promise');
var rewire = require('rewire');
var sinon = require('sinon');

var mockdb = require('./mockdb');
var mockSessionToken = require('./mock_session_token');
var errors = require('../../common/errors').POST.question;
var question = rewire('../src/question');

question.__set__('database', mockdb);
question.__set__('auth.validateSessionToken', mockSessionToken);

var newQuestionBody = {
  course_id: 5,
  timeout: 1000,
  ask_immediately: false,
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

    it('handles create with missing question', function() {
      var req = {
        query: { session_token: '' },
        body: JSON.parse(JSON.stringify(newQuestionBody))
      };
      var res = { send: sinon.spy() };

      req.body.question = undefined;

      question.handle(req, res);

      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.equal(res.send.args[0][0], errors.missingQuestionError);
    });

    it('handles update with missing question', function() {
      var req = {
        query: { session_token: '' },
        body: JSON.parse(JSON.stringify(newQuestionBody))
      };
      var res = { send: sinon.spy() };

      req.body.question_id = 10;
      req.body.question = undefined;

      question.handle(req, res);

      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.equal(res.send.args[0][0].course_id, 5);
      assert.equal(res.send.args[0][0].question_id, 10);
    });

    it('successfully validates all parameters', function() {
      var req = {
        query: { session_token: '' },
        body: JSON.parse(JSON.stringify(newQuestionBody))
      };
      var res = { send: sinon.spy() };

      question.handle(req, res);

      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.equal(res.send.args[0][0].course_id, 5);
      assert.equal(res.send.args[0][0].question_id, 1);
    });
  });
});

