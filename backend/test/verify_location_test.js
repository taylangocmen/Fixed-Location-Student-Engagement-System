var assert = require('assert');
var rewire = require('rewire');
var sinon = require('sinon');

var mockdb = require('./mockdb');

var verifyLocation = rewire('../src/verify_location');
verifyLocation.__set__('database', mockdb);

var acceptAnswerQuery = verifyLocation.__get__('acceptAnswerQuery');

var validData = [
  {
    user_id: 1,
    device_id: 'abc',
    device_list: '["def","ghi","jkl"]'
  },
  {
    user_id: 2,
    device_id: 'def',
    device_list: '["abc","ghi","jkl"]'
  },
  {
    user_id: 3,
    device_id: 'ghi',
    device_list: '["abc","def","jkl"]'
  },
  {
    user_id: 4,
    device_id: 'jkl',
    device_list: '["abc","def","ghi"]'
  }
];

var missingIncomingEdgesData = [
  {
    user_id: 1,
    device_id: 'abc',
    device_list: '["def","ghi"]'
  },
  {
    user_id: 2,
    device_id: 'def',
    device_list: '["abc","ghi"]'
  },
  {
    user_id: 3,
    device_id: 'ghi',
    device_list: '["abc","def"]'
  },
  {
    user_id: 4,
    device_id: 'jkl',
    device_list: '["abc","def","ghi"]'
  }
];

describe('Verify Location', function() {
  describe('#verify()', function() {
    // Reset the database before each test
    beforeEach(function() {
      mockdb.reset();
    });

    it('accepts full clique', function() {
      var course_id = 1, question_id = 2;

      var expectation = mockdb.mock.expects('query').exactly(5);

      // When the database is queried for the response data, return the dataset
      expectation.onCall(0)
                 .callsArgWith(2, null, validData, null);

      verifyLocation.verify(course_id, question_id);

      // Verify the mock
      mockdb.mock.verify();

      // Verify that the correct users' answers were accepted
      assert(expectation.calledWith(acceptAnswerQuery, [course_id, question_id, 1]));
      assert(expectation.calledWith(acceptAnswerQuery, [course_id, question_id, 2]));
      assert(expectation.calledWith(acceptAnswerQuery, [course_id, question_id, 3]));
      assert(expectation.calledWith(acceptAnswerQuery, [course_id, question_id, 4]));
    });

    it('rejects for missing incoming edges', function() {
      var course_id = 1, question_id = 2;

      var expectation = mockdb.mock.expects('query').exactly(4);

      // When the database is queried for the response data, return the dataset
      expectation.onCall(0)
                 .callsArgWith(2, null, missingIncomingEdgesData, null);

      verifyLocation.verify(course_id, question_id);

      // Verify the mock
      mockdb.mock.verify();

      // Verify that the correct users' answers were accepted
      assert(expectation.calledWith(acceptAnswerQuery, [course_id, question_id, 1]));
      assert(expectation.calledWith(acceptAnswerQuery, [course_id, question_id, 2]));
      assert(expectation.calledWith(acceptAnswerQuery, [course_id, question_id, 3]));
      assert(expectation.neverCalledWith(acceptAnswerQuery, [course_id, question_id, 4]));
    });

    it('does not fail for null device lists', function() {
      var course_id = 1, question_id = 2;

      var expectation = mockdb.mock.expects('query').exactly(5);

      var nullDeviceListData = JSON.parse(JSON.stringify(validData));
      for (var i = 0; i < nullDeviceListData.length; i++) {
        nullDeviceListData[i].device_list = JSON.stringify(nullDeviceListData[i].device_list);
      }
      nullDeviceListData[3].device_list = null;

      // When the database is queried for the response data, return the dataset
      expectation.onCall(0)
                 .callsArgWith(2, null, nullDeviceListData, null);

      verifyLocation.verify(course_id, question_id);

      // Verify the mock
      mockdb.mock.verify();

      // Verify that the correct users' answers were accepted
      assert(expectation.calledWith(acceptAnswerQuery, [course_id, question_id, 1]));
      assert(expectation.calledWith(acceptAnswerQuery, [course_id, question_id, 2]));
      assert(expectation.calledWith(acceptAnswerQuery, [course_id, question_id, 3]));
      assert(expectation.calledWith(acceptAnswerQuery, [course_id, question_id, 4]));
    });

    it('works for single null device_id', function() {
      var course_id = 1, question_id = 2;

      var expectation = mockdb.mock.expects('query').exactly(4);

      // Create the data with some parts nulled out
      var nullDeviceIdData = JSON.parse(JSON.stringify(validData));
      for (var i = 0; i < nullDeviceIdData.length; i++) {
        nullDeviceIdData[i].device_list = JSON.stringify(nullDeviceIdData[i].device_list);
      }
      nullDeviceIdData[3].device_id = null;

      // When the database is queried for the response data, return the dataset
      expectation.onCall(0)
                 .callsArgWith(2, null, nullDeviceIdData, null);

      verifyLocation.verify(course_id, question_id);

      // Verify the mock
      mockdb.mock.verify();

      // Verify that the correct users' answers were accepted
      assert(expectation.calledWith(acceptAnswerQuery, [course_id, question_id, 1]));
      assert(expectation.calledWith(acceptAnswerQuery, [course_id, question_id, 2]));
      assert(expectation.calledWith(acceptAnswerQuery, [course_id, question_id, 3]));
      assert(expectation.neverCalledWith(acceptAnswerQuery, [course_id, question_id, 4]));
    });

    it('works for null device_id and nulls in device_list', function() {
      var course_id = 1, question_id = 2;

      var expectation = mockdb.mock.expects('query').exactly(4);

      // Create the data with some parts nulled out
      var nullDeviceIdData = JSON.parse(JSON.stringify(validData));
      for (var i = 0; i < nullDeviceIdData.length; i++) {
        nullDeviceIdData[i].device_list.push(null);
        nullDeviceIdData[i].device_list = JSON.stringify(nullDeviceIdData[i].device_list);
      }
      nullDeviceIdData[3].device_id = null;

      // When the database is queried for the response data, return the dataset
      expectation.onCall(0)
                 .callsArgWith(2, null, nullDeviceIdData, null);

      verifyLocation.verify(course_id, question_id);

      // Verify the mock
      mockdb.mock.verify();

      // Verify that the correct users' answers were accepted
      assert(expectation.calledWith(acceptAnswerQuery, [course_id, question_id, 1]));
      assert(expectation.calledWith(acceptAnswerQuery, [course_id, question_id, 2]));
      assert(expectation.calledWith(acceptAnswerQuery, [course_id, question_id, 3]));
      assert(expectation.neverCalledWith(acceptAnswerQuery, [course_id, question_id, 4]));
    });

    // TODO add more tests with larger datasets

  });
});

