var Promise = require('bluebird');

var database = require('./database');

var missingSessionTokenError = {error: 'Missing session_token'};
var couldNotValidateSessionTokenError = {error: 'Could not validate session_token'};
var expiredSessionTokenError = {error: 'Expired session token'};
var invalidSessionTokenError = {error: 'Invalid session token'};

// TODO: Write tests to exercise each error and a successful validation
module.exports = {
  validate: function(sessionToken) {
    // Return a promise for whether or not the session token is valid
    return new Promise(function(resolve, reject) {
      // Verify that the sessionToken exists
      if (sessionToken == undefined || sessionToken == null || sessionToken == "") {
        reject(missingSessionTokenError);
        return;
      }

      var connection = database.connect();

      // Select the user that has the given session_token
      connection.query(
        'select id, session_token_expiry from ece496.users where session_token=?',
        [sessionToken],
        function(err, rows, fields) {
          // A mysql error occurred
          if (err) {
            console.log(err);
            reject(couldNotValidateSessionTokenError);
            return;
          }

          // Check that there was 1 row returned
          if (rows.length == 1) {
            var id = rows[0].id;
            var expiry = rows[0].session_token_expiry;
            if (id != undefined && expiry != undefined) {
              // Check expiry
              if (expiry > (new Date()).getTime()) {
                // Return the user's id
                resolve(id);
              } else {
                // Expired session token
                reject(expiredSessionTokenError);
              }
            } else {
              // Could not get id or expiry
              reject(couldNotValidateSessionTokenError);
            }
          } else {
            // Invalid session token if rows.length != 1
            reject(invalidSessionTokenError);
          }
        });
    });
  }
};

