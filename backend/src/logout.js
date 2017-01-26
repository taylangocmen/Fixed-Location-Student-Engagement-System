var validate = require('jsonschema').validate;

var database = require('./database');
var config = require('./config');
var auth = require('./auth');
var errors = require('../../common/errors').PUT.logout;

var invalidateTokenQuery =
  'update ece496.users ' +
  'set session_token_expiry=? '
  'where id=?';

module.exports = {
  handle: function(req, res) {
    auth.validateSessionToken(req.query.session_token)
      .then(function(user_id) {
          //do not need to validate body since there is none
          var now = (new Date()).getTime();
          database.pool.query(
            invalidateTokenQuery,
            [now, user_id],
            function(err, rows, fields) {
              if(err) {
                console.log(err);
                res.send(errors.unknownError);
                return;
              }
              else {
                res.send({"Success": "Logout successful"});
                return;
              }
            }
          )
      });
  }
}
