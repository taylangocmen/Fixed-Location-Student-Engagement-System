var sinon = require('sinon');

module.exports = function(sessionToken) {
  // Stub the Promise's then function
  var ret = {
    then: sinon.stub(),
    catch: function() {}
  };
  // When then is called, call the first argument with id = 1
  ret.then.onCall(0)
          .callsArgWith(0, 1)
          .returns(ret);
  return ret;
};
