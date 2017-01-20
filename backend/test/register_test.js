var assert = require('assert');
var rewire = require('rewire');
var sinon = require('sinon');

var mockdb = require('./mockdb');
var errors = require('../../common/errors').POST.register;

var register = rewire('../src/register');
register.__set__('database', mockdb);

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
      mockdb.reset();
    });

    it('handles missing parameters', function() {
      var req = { body: { } };
      var res = { send: sinon.spy() };

      register.handle(req, res);

      // TODO the error message should be specified in a common module
      assert(res.send.calledWith(errors.missingParamsError));
    });

    it('validates alphabetic first names', function() {
      var req = { body: { } };
      var res = { send: sinon.spy() };

      register.handle(req, res);

      // TODO get rid of this assert false and complete the test
      assert(false);

      assert(res.send.calledWith());
    });

    it('validates alphabetic last names', function() {
      var req = { body: { } };
      var res = { send: sinon.spy() };

      register.handle(req, res);

      // TODO get rid of this assert false and complete the test
      assert(false);

      assert(res.send.calledWith());
    });

    it('validates emails', function() {
      var req = { body: { } };
      var res = { send: sinon.spy() };

      register.handle(req, res);

      // TODO get rid of this assert false and complete the test
      assert(false);

      assert(res.send.calledWith());
    });

    it('validates emails end with mail.utoronto.ca', function() {
      var req = { body: { } };
      var res = { send: sinon.spy() };

      register.handle(req, res);

      // TODO get rid of this assert false and complete the test
      assert(false);

      assert(res.send.calledWith());
    });

    it('handles duplicate utorids', function() {
      // Attempt to login with valid credentials
      var req = { body: { } };
      var res = { send: sinon.spy() };

      register.handle(req, res);

      // TODO get rid of this assert false and complete the test
      assert(false);

      // Verify that an empty response was returned
      assert(res.send.calledWith({}));
    });

    it('handles duplicate emails', function() {
      // Attempt to login with valid credentials
      var req = { body: { } };
      var res = { send: sinon.spy() };

      register.handle(req, res);

      // TODO get rid of this assert false and complete the test
      assert(false);

      // Verify that an empty response was returned
      assert(res.send.calledWith({}));
    });

    it('successfully registers if all validation passes', function() {
      // Attempt to login with valid credentials
      var req = { body: { } };
      var res = { send: sinon.spy() };

      register.handle(req, res);

      // TODO get rid of this assert false and complete the test
      assert(false);

      // Verify that an empty response was returned
      assert(res.send.calledWith({}));
    });

    // TODO: Add tests for query() returning an err at each stage
  });
});

