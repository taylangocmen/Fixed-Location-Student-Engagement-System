var auth = require('./auth');

module.exports = {
  // Register handler
  handleUpdateWifiInfo: function(req, res) {
    var promise = auth.validateSessionToken(req.query.session_token);

    promise.then(function(id) {
      res.send({error: 'Update wifi info is not yet implemented'});
    }).catch(function(err) {
      res.send(err);
    });
  }
};

