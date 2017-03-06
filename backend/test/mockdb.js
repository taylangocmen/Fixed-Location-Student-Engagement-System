var sinon = require('sinon');

module.exports = {
  reset: function() {
    module.exports.mock = sinon.mock(module.exports.pool);
  },
  mock: null,
  pool: {
    query: function(querystring, argarray, callback) {}
  }
};

