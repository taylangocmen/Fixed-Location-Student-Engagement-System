var assert = require('assert');
var rewire = require('rewire');
var sinon = require('sinon');

var stubdb = require('./stubdb');
var mocktoken = require('./mock_session_token');
var errors = require('../../common/errors').POST.enrol;

var enrol = rewire('../src/enrol');

enrol.__set__('database', stubdb);
enrol.__set__('auth.validateSessionToken', mocktoken);

var validUserInfo = {
  id:1,
  email:'test@test.com',
  utorid:'test',
  first_name:'Test',
  last_name:'Test'
};

var validEnrolInfo = {
  "body": {
    "course_id": 1
  }
}

var wrongFormatEnrolInfo = {
  "body": {
    "badfield": "this input is in the wrong format"
  }
}

var tooManyArgsEnrolInfo = {
  "body": {
    "course_id":1,
    "badfield": "this input shouldn't be here"
  }
}

describe("Enrol", function() {
  describe("#handle", function(){

    beforeEach(function(){
      stubdb.reset();
    });

    it('does not recognize an invalid course', function() {
      var req = validEnrolInfo;
      var res = { send: sinon.spy() };

      //specifies behavior for the first call of stubdb.query
      //i.e. calls the second (counting from zero) argument of stubdb.query
      //and supplies it with the information specified
      stubdb.pool.query.onCall(0).callsArgWith(2, 0, [], 0);

      enrol.handle(req, res);

      assert.equal(res.send.getCall(0).args[0], errors.invalidCourseError);

    });

    it('does not allow a user to enrol twice', function() {
      var req = validEnrolInfo;
      var res = { send: sinon.spy() };

      stubdb.pool.query.onCall(0).callsArgWith(2, null, [{"id":1}], null);
      stubdb.pool.query.onCall(1).callsArgWith(2, null, [{"stuff": "nonsense"}], 0);

      enrol.handle(req, res);

      assert.equal(res.send.getCall(0).args[0], errors.userAlreadyEnrolledError);
    });

    it('recognizes bad arguments', function() {
      var req = wrongFormatEnrolInfo;
      var res = { send: sinon.spy() };

      enrol.handle(req, res);

      assert.equal(res.send.getCall(0).args[0], errors.schemaError);
    });

    it('recognizes too many arguments', function() {
      var req = tooManyArgsEnrolInfo;
      var res = { send: sinon.spy() };

      enrol.handle(req, res);

      assert.equal(res.send.getCall(0).args[0], errors.schemaError);
    });
  });
});
