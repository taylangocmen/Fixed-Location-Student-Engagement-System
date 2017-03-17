var Promise = require('promise');
var undefsafe = require('undefsafe');

var database = require('./database');
var errors = require('../../common/errors').POST.session_token;

var parseAuthorizationHeader = function(req) {
  var header = req.get("Authorization");

  if (header === undefined || header === null) {
    return null;
  }

  // Extract the session token from the Authorization header
  var matches = /Bearer ([a-fA-F0-9]+)/.exec(header);
  // If there was a session token present
  if (matches !== null && matches.length > 1) {
    // Convert it to lower case and return it
    return matches[1].toLowerCase();
  }

  // No authentication token
  return null;
};

module.exports = {
  validate: function(req) {
    // Return a promise for whether or not the session token is valid
    return new Promise(function(resolve, reject) {
      var sessionToken = parseAuthorizationHeader(req);
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
            reject(errors.unknownError);
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
