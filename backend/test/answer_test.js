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
var validUser = {user_id: 1};
var sqlQuestionAsked1 = { asked: 0, completed: 0};
var sqlQuestionAsked2 = { asked: 1, completed: 1};
var sqlQuestionAsked3 = { asked: 1, completed: 0};

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
	
	// Verify that the user can't submit an answer to a question that
	// doesn't exist
	it('verifies that the question exists', function() {
	  var req = validRequest;
	  var res = { send: sinon.spy() };
	  
	  //inform the program that the user is a valid user and is allowed to answer the question.
	  
	  stubdb.pool.query.onCall(0)
                  .callsArgWith(2, null, [validUser], null);
	  
	  // When the database is queried for whether the question exists,
      // return an empty result
	  
      stubdb.pool.query.onCall(1)
                  .callsArgWith(2, null, [], null);
	  
	  
	  answer.handle(req, res);
	  
	  assert.equal(res.send.args.length, 1);
	  assert.equal(res.send.args[0].length, 1);
	  assert.deepEqual(res.send.args[0][0], errors.invalidQuestionError);
    });
	
	// Verify that the user can't submit if the question is 
	// not accepting answers
	
	it('verifies that the question has been asked', function() {
	  var req = validRequest;
	  var res = { send: sinon.spy() };
	  
	  //inform the program that the user is a valid user and is allowed to answer the question.
	  
	  stubdb.pool.query.onCall(0)
                  .callsArgWith(2, null, [validUser], null);
	  
	  // When the database is queried for whether the question exists,
      // return a row that says the question hasn't been asked yet
      stubdb.pool.query.onCall(1)
                  .callsArgWith(2, null, [sqlQuestionAsked1], null);
	  
	  answer.handle(req, res);
	  
	  assert.equal(res.send.args.length, 1);
	  assert.equal(res.send.args[0].length, 1);
	  assert.deepEqual(res.send.args[0][0], errors.notAcceptingError);
    });
	
	it('verifies that the question has been asked and is still accepting answers', function() {
	  var req = validRequest;
	  var res = { send: sinon.spy() };
	  
	  //inform the program that the user is a valid user and is allowed to answer the question.
	  
	  stubdb.pool.query.onCall(0)
                  .callsArgWith(2, null, [validUser], null);
	  
	  // When the database is queried for whether the question exists,
      // return a row that says the question answering period has closed
      stubdb.pool.query.onCall(1)
                  .callsArgWith(2, null, [sqlQuestionAsked2], null);
	  
	  
	  answer.handle(req, res);
	  
	  assert.equal(res.send.args.length, 1);
	  assert.equal(res.send.args[0].length, 1);
	  assert.deepEqual(res.send.args[0][0], errors.notAcceptingError);
    });
	
	// Verify that the user can successfully update a question that
	// has a submitted answer.
	
	it('verifies that an answer can be updated', function() {
	  var req = validRequest;
	  var res = { send: sinon.spy() };
	  
	  //inform the program that the user is a valid user and is allowed to answer the question.
	  
	  stubdb.pool.query.onCall(0)
                  .callsArgWith(2, null, [validUser], null);
	  
	  // When the database is queried for whether the question exists,
      // return a row that says the question exists and is accepting answers
      stubdb.pool.query.onCall(1)
                  .callsArgWith(2, null, [sqlQuestionAsked3], null);
	  
	  // Indicate that the question has already been answered by returning
	  // a submission id
      stubdb.pool.query.onCall(2)
				  .callsArgWith(2, null, [{id: 1, device_list: '[]'}], null);
	  
	  // Return that there were no errors updating the answer
      stubdb.pool.query.onCall(3)
                  .callsArgWith(2, null, null, null);
    // Return a success upon updating the database
      stubdb.pool.query.onCall(4)
                  .callsArgWith(2, null,null,null);

	  answer.handle(req, res);
	  
	  // Verify that an empty response was returned
      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.deepEqual(res.send.args[0][0], {});
    });
	
	// Verify that a user can answer a question given all of the 
	// parameters are valid and the answer has not been provided yet
	
	it('verifies that an submission can be added', function() {
	  var req = validRequest;
	  var res = { send: sinon.spy() };
	  
	  //inform the program that the user is a valid user and is allowed to answer the question.
	  
	  stubdb.pool.query.onCall(0)
                  .callsArgWith(2, null, [validUser], null);
	  
	  // When the database is queried for whether the question exists,
      // return a row that says the question exists but isn't accepting answers
      stubdb.pool.query.onCall(1)
                  .callsArgWith(2, null, [sqlQuestionAsked3], null);
	  
	  // Indicate that the question has not been answered yet by returning
	  // an empty set
      stubdb.pool.query.onCall(2)
				  .callsArgWith(2, null, [], null);
	  
	  // Return that there were no errors adding the submission
      stubdb.pool.query.onCall(3)
                  .callsArgWith(2, null, null, null);
		// When the submission gets updated, return success 

      stubdb.pool.query.onCall(4)
                  .callsArgWith(2, null, null, null);

      answer.handle(req, res);
	  
	  // Verify that an empty response was returned

      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.deepEqual(res.send.args[0][0], {});
    });
	
	// TODO: Add tests for query() returning an err at each stage

  });
});

