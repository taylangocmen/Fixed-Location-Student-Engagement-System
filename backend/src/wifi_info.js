var auth = require('./auth');

module.exports = {
  // Wifi info handler
  handleUpdateWifiInfo: function(req, res) {
    auth.validateSessionToken(req)
      .then(function(id) {
        res.send({error: 'Update wifi info is not yet implemented'});
      })
      .catch(function(err) {
        res.send(err);
      });
  }
};

