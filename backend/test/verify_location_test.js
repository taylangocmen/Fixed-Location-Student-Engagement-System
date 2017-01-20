var assert = require('assert');
var rewire = require('rewire');
var sinon = require('sinon');

var mockdb = require('./mockdb');

var verifyLocation = rewire('../src/verify_location');
verifyLocation.__set__('database', mockdb);

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
      mockdb.reset();
    });

    it('handles missing parameters', function() {
      mockdb.query.onCall(0)
                  .callsArgWith(2, null, testData, null);
      verifyLocation.verify(1, 2);
    });

  });
});

