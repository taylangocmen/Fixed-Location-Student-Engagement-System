var sinon = require('sinon');

module.exports = {
  query: null,
  reset: function() {
    module.exports.query = sinon.stub();
  },
  connect: function() {
    return {
      query: module.exports.query
    };
  }
};
