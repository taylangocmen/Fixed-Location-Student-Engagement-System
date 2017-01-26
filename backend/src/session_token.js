var Promise = require('promise');
var undefsafe = require('undefsafe');

var database = require('./database');
var errors = require('../../common/errors').POST.session_token;

// TODO: Write tests to exercise each error and a successful validation
module.exports = {
  validate: function(sessionToken) {
    // Return a promise for whether or not the session token is valid
    return new Promise(function(resolve, reject) {
      // Verify that the sessionToken exists
      if (sessionToken == undefined || sessionToken == null || sessionToken == '') {
        reject(errors.missingSessionTokenError);
        return;
      }

      // Select the user that has the given session_token
      database.pool.query(
        'select id, session_token_expiry from ece496.users where session_token=?',
        [sessionToken],
        function(err, rows, fields) {
          // A mysql error occurred
          if (err) {
            console.log(err);
            reject(errors.validateSessionTokenError);
            return;
          }

          // Check that there was 1 row returned
          if (rows.length === 1) {
            if (undefsafe(rows[0], 'id') && undefsafe(rows[0], 'session_token_expiry')) {
              var id = rows[0].id;
              var expiry = rows[0].session_token_expiry;

              // Check expiry
              if (expiry > (new Date()).getTime()) {
                // Return the user's id
                resolve(id);
              } else {
                // Expired session token
                reject(errors.expiredSessionTokenError);
              }
            } else {
              // Could not get id or expiry
              reject(errors.validateSessionTokenError);
            }
          } else {
            // Invalid session token if rows.length != 1
            reject(errors.invalidSessionTokenError);
          }
        });
    });
  }
};
