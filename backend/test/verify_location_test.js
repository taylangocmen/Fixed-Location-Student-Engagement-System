var assert = require('assert');
var rewire = require('rewire');
var sinon = require('sinon');

var stubdb = require('./stubdb');

var verifyLocation = rewire('../src/verify_location');
verifyLocation.__set__('database', stubdb);

var testData = [
  {
    user_id: 1,
    device_id: 'abc',
    device_list: [
      'def', 'ghi', 'jkl'
    ]
  },
  {
    user_id: 2,
    device_id: 'def',
    device_list: [
      'abc', 'ghi', 'jkl'
    ]
  },
  {
    user_id: 3,
    device_id: 'ghi',
    device_list: [
      'abc', 'def', 'jkl'
    ]
  },
  {
    user_id: 4,
    device_id: 'jkl',
    device_list: [
      'abc', 'def', 'ghi'
    ]
  }
];

describe('Verify Location', function() {
  describe('#verify()', function() {
    // Reset the database before each test
    beforeEach(function() {
      stubdb.reset();
    });

    it('handles missing parameters', function() {
      stubdb.pool.query.onCall(0)
                  .callsArgWith(2, null, testData, null);
      verifyLocation.verify(1, 2);
    });

  });
});

