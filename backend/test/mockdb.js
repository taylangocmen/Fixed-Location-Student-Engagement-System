var sinon = require('sinon');

module.exports = {
  reset: function() {
    module.exports.pool.query = sinon.stub();
  },
  pool: {
    query: null
  }
};

