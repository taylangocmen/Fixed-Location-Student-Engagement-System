var crypto = require('crypto');
var undefsafe = require('undefsafe');

var database = require('./database');
var config = require('./config');

var missingParamsError = {error: 'Missing username or pass_hash'};
var unknownError = {error: 'An internal error occurred while generating the session_token, please try again'};
var invalidCredentialsError = {error: 'Invalid username or password'};

var selectUserInfo =
  'select id, email, utorid, first_name, last_name ' +
  'from ece496.users ' +
  'where (utorid=? or email=?) and pass_hash=?';

var selectSessionToken =
  'select session_token ' +
  'from ece496.users ' +
  'where session_token=?';

var updateSessionToken =
  'update ece496.users ' +
  'set session_token=?, session_token_expiry=? ' +
  'where id=?';

module.exports = {
  // Login handler
  handle: function(req, res) {
    var connection = database.connect();

    // TODO: Log errors (hopefully with line numbers) when validation fails

    if (!undefsafe(req, 'body.username') ||
        !undefsafe(req, 'body.pass_hash')) {
      res.send(missingParamsError);
      return;
    }

    var username = req.body.username;
    var passHash = req.body.pass_hash;

    // TODO: Clean up these nested queries
    // Verify the user's credentials
    connection.query(
        selectUserInfo,
        [username, username, passHash],
        function(err, rows, fields) {
          if (err) {
            console.log(err);
            res.send(unknownError);
            return;
          }

          // If the user's credentials were correct
          if (rows.length == 1) {
            var id = rows[0].id;

            // Get the current time
            var now = (new Date()).getTime();

            // TODO: make sure each of these fields exist
            // Generate a session token from the user's information,
            // the current time, and a random number
            var sessionToken = crypto.createHmac('sha256',
                                                 config.auth.sessionTokenSecret)
              .update(rows[0].email.toString())
              .update(rows[0].utorid.toString())
              .update(rows[0].first_name.toString())
              .update(rows[0].last_name.toString())
              .update(rows[0].id.toString())
              .update(now.toString())
              .update(Math.random().toString())
              .digest('hex');

            // Set the session token expiry to be in 1 day
            var sessionTokenExpiry = now + 1000 * 60 * 60 * 24;

            // Query whether or not this session token is in use
            connection.query(
                selectSessionToken,
                [sessionToken],
                function(err, rows, fields) {
                  if (err) {
                    console.log(err);
                    res.send(unknownError);
                    return;
                  }

                  if (rows.length == 0) {
                    // Update the user's session token
                    connection.query(
                        updateSessionToken,
                        [sessionToken, sessionTokenExpiry, id],
                        function(err, rows, fields) {
                          if (err) {
                            console.log(err);
                            res.send(unknownError);
                            return;
                          }

                          // Send the session token in response
                          res.send({session_token: sessionToken});
                        }
                    );
                  } else {
                    res.send(unknownError);
                  }
                }
            );
          } else {
            res.send(invalidCredentialsError);
          }
        }
    );
  }
};

