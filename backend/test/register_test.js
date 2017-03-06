var assert = require('assert');
var rewire = require('rewire');
var sinon = require('sinon');

var stubdb = require('./stubdb');
var errors = require('../../common/errors').POST.register;

var register = rewire('../src/register');
register.__set__('database', stubdb);

// TODO: write tests to make sure each field gets tested
var validUserInfo = {
  id:1,
  email:'test@test.com',
  utorid:'test',
  first_name:'Test',
  last_name:'Test'
};

describe('Register', function() {
  describe('#handle()', function() {
    // Reset the database before each test
    beforeEach(function() {
      stubdb.reset();
    });

    it('handles missing parameters', function() {
      var req = { body: { } };
      var res = { send: sinon.spy() };

      register.handle(req, res);

      // TODO improve this test by making it check each of the fields of the request
      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.equal(res.send.args[0][0], errors.validationError);
    });

    it('validates alphabetic first names', function() {
      var req = { body: { } };
      var res = { send: sinon.spy() };

      register.handle(req, res);

      // TODO get rid of this assert false and complete the test
      assert(false, 'TODO: implement this test');

      assert(res.send.calledWith());
      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.equal(res.send.args[0][0], errors.validationError);
    });

    it('validates alphabetic last names', function() {
      var req = { body: { } };
      var res = { send: sinon.spy() };

      register.handle(req, res);

      // TODO get rid of this assert false and complete the test
      assert(false, 'TODO: implement this test');

      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.equal(res.send.args[0][0], errors.validationError);
    });

    it('validates emails', function() {
      var req = { body: { } };
      var res = { send: sinon.spy() };

      register.handle(req, res);

      // TODO get rid of this assert false and complete the test
      assert(false, 'TODO: implement this test');

      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.equal(res.send.args[0][0], errors.validationError);
    });

    it('validates emails end with mail.utoronto.ca', function() {
      var req = { body: { } };
      var res = { send: sinon.spy() };

      register.handle(req, res);

      // TODO get rid of this assert false and complete the test
      assert(false, 'TODO: implement this test');

      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.equal(res.send.args[0][0], errors.validationError);
    });

    it('handles duplicate utorids', function() {
      // Attempt to login with valid credentials
      var req = { body: { } };
      var res = { send: sinon.spy() };

      register.handle(req, res);

      // TODO get rid of this assert false and complete the test
      assert(false, 'TODO: implement this test');

      // Verify that an empty response was returned
      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.equal(res.send.args[0][0], errors.validationError);
    });

    it('handles duplicate emails', function() {
      // Attempt to login with valid credentials
      var req = { body: { } };
      var res = { send: sinon.spy() };

      register.handle(req, res);

      // TODO get rid of this assert false and complete the test
      assert(false, 'TODO: implement this test');

      // Verify that an empty response was returned
      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.equal(res.send.args[0][0], errors.validationError);
    });

    it('successfully registers if all validation passes', function() {
      // Attempt to login with valid credentials
      var req = { body: { } };
      var res = { send: sinon.spy() };

      register.handle(req, res);

      // TODO get rid of this assert false and complete the test
      assert(false, 'TODO: implement this test');

      // Verify that an empty response was returned
      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.equal(res.send.args[0][0], errors.validationError);
    });

    // TODO: Add tests for query() returning an err at each stage
  });
});

