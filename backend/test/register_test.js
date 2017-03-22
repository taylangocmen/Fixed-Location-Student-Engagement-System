var assert = require('assert');
var rewire = require('rewire');
var sinon = require('sinon');

var stubdb = require('./stubdb');
var errors = require('../../common/errors').POST.register;

var register = rewire('../src/register');
register.__set__('database', stubdb);

var validUtorid = { utorid:'test1234' };
var validEmail = { email:'test1234@mail.utoronto.ca' };

describe('Register', function() {
  describe('#handle()', function() {
    // Reset the database before each test
    beforeEach(function() {
      stubdb.reset();
    });

    it('handles missing firstname', function() {
      var req = { body: {last_name: 'testLast', email: 'test@mail.utoronto.ca', utorid: 'testid', pass_hash: '1234abcd'} };
      var res = { send: sinon.spy() };

      register.handle(req, res);

	  // Verify that the correct error is returned
      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.equal(res.send.args[0][0], errors.validationError);
    });
	
	it('handles missing lastname', function() {
      var req = { body: {first_name: 'testFrist', email: 'test@mail.utoronto.ca', utorid: 'testid', pass_hash: '1234abcd'} };
      var res = { send: sinon.spy() };

      register.handle(req, res);

	  // Verify that the correct error is returned
      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.equal(res.send.args[0][0], errors.validationError);
    });
	
	it('handles missing email', function() {
      var req = { body: {first_name: 'testFrist', last_name: 'testLast', utorid: 'testid', pass_hash: '1234abcd'} };
      var res = { send: sinon.spy() };

      register.handle(req, res);

	  // Verify that the correct error is returned
      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.equal(res.send.args[0][0], errors.validationError);
    });
	
	it('handles missing utorid', function() {
      var req = { body: {first_name: 'testFrist', last_name: 'testLast', email: 'test@mail.utoronto.ca', pass_hash: '1234abcd'} };
      var res = { send: sinon.spy() };

      register.handle(req, res);

	  // Verify that the correct error is returned
      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.equal(res.send.args[0][0], errors.validationError);
    });
	
	it('handles missing password', function() {
      var req = { body: {first_name: 'testFrist', last_name: 'testLast', email: 'test@mail.utoronto.ca', utorid: 'testid'} };
      var res = { send: sinon.spy() };

      register.handle(req, res);

	  // Verify that the correct error is returned
      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.equal(res.send.args[0][0], errors.validationError);
    });

    it('validates alphabetic first names', function() {
      var req = { body: {first_name: 'testFrist1', last_name: 'testLast', 
	    email: 'test@mail.utoronto.ca', utorid: 'testid', pass_hash: '1234abcd'} };
      var res = { send: sinon.spy() };

      register.handle(req, res);

	  // Verify that the correct error is returned
      assert(res.send.calledWith());
      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.equal(res.send.args[0][0], errors.invalidFirstNameError);
    });

    it('validates alphabetic last names', function() {
      var req = { body: {first_name: 'testFrist', last_name: 'testLast1', 
	    email: 'test@mail.utoronto.ca', utorid: 'testid', pass_hash: '1234abcd'} };
      var res = { send: sinon.spy() };

      register.handle(req, res);

	  // Verify that the correct error is returned
      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.equal(res.send.args[0][0], errors.invalidLastNameError);
    });

    it('validates emails', function() {
      var req = { body: {first_name: 'testFrist', last_name: 'testLast', 
	    email: 'test', utorid: 'testid', pass_hash: '1234abcd'} };
      var res = { send: sinon.spy() };

      register.handle(req, res);

	  // Verify that the correct error is returned
      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.equal(res.send.args[0][0], errors.invalidEmailError);
    });

    it('validates emails end with mail.utoronto.ca', function() {
      var req = { body: {first_name: 'testFrist', last_name: 'testLast', 
	    email: 'test@provider.ca', utorid: 'testid', pass_hash: '1234abcd'} };
      var res = { send: sinon.spy() };

      register.handle(req, res);

	  // Verify that the correct error is returned
      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.equal(res.send.args[0][0], errors.unsupportedEmailError);
    });

    it('handles duplicate utorids', function() {
      // Attempt to login with valid credentials
      var req = { body: {first_name: 'testFrist', last_name: 'testLast', 
	    email: 'test@mail.utoronto.ca', utorid: 'testid', pass_hash: '1234abcd'} };
      var res = { send: sinon.spy() };

	  // The first database call returns a valid utorid indicating
	  // that the utorid has already been used to register a user
      stubdb.pool.query.onCall(0)
                  .callsArgWith(2, null, [validUtorid], null);
	  
      register.handle(req, res);

      // Verify that the correct error is returned
      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.equal(res.send.args[0][0], errors.utoridTakenError);
    });

    it('handles duplicate emails', function() {
      // Attempt to login with valid credentials
      var req = { body: {first_name: 'testFrist', last_name: 'testLast', 
	    email: 'test@mail.utoronto.ca', utorid: 'testid', pass_hash: '1234abcd'} };
      var res = { send: sinon.spy() };

	  // The first database call returns an empty set indiciating that
	  // the user's utorid hasn't already been assigned
      stubdb.pool.query.onCall(0)
                  .callsArgWith(2, null, [], null);
      // The second database call returns a valid email indicating that it
	  // has already been used to register a user
      stubdb.pool.query.onCall(1)
                  .callsArgWith(2, null, [validEmail], null);
	  
      register.handle(req, res);

      // Verify that the correct error is returned
      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.equal(res.send.args[0][0], errors.emailTakenError);
    });

    it('successfully registers if all validation passes', function() {
      // Attempt to login with valid credentials
      var req = { body: {first_name: 'testFrist', last_name: 'testLast', 
	    email: 'test@mail.utoronto.ca', utorid: 'testid', pass_hash: '1234abcd'} };
      var res = { send: sinon.spy() };

	  // The first database call returns an empty set indiciating that
	  // the user's utorid hasn't already been assigned
      stubdb.pool.query.onCall(0)
                  .callsArgWith(2, null, [], null);
      // The second database call returns an empty set indicating that
	  // the email of registration hasn't already been used
      stubdb.pool.query.onCall(1)
                  .callsArgWith(2, null, [], null); 
      // The third database call returns that there were no errors adding a
	  // new user to the database
      stubdb.pool.query.onCall(2)
                  .callsArgWith(2, null, null, null); 
	  
	  
      register.handle(req, res);

      // Verify that an empty response was returned


      // Verify that an empty response was returned
       assert.equal(res.send.args.length, 1);
       assert.equal(res.send.args[0].length, 1);
       assert.deepEqual(res.send.args[0][0], {});

    });

    // TODO: Add tests for query() returning an err at each stage
  });
});

