var bodyParser = require('body-parser');

var database = require('./database');
var config = require('./config');

module.exports = {
  // Register handler
  handle: function(req, res) {
    var connection = database.connect();

    res.send({error: 'Registration is not yet implemented'});
  }
};

