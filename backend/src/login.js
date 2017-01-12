var crypto = require('crypto');

var database = require('./database');
var config = require('./config');

var missingParamsError = {error: 'Missing username or pass_hash'};
var unknownError = {error: 'An internal error occurred while generating the session_token, please try again'};
var invalidCredentialsError = {error: 'Invalid username or password'};

module.exports = {
  // Login handler
  handle: function(req, res) {
    var connection = database.connect();

    var username = req.query.username;
    var passHash = req.query.pass_hash;

    if (username == undefined || username == null || username == '' ||
        passHash == undefined || passHash == null || passHash == '') {
      res.send(missingParamsError);
      return;
    }

    // TODO: Clean up these nested queries
    // Verify the user's credentials
    connection.query(
        'select id from ece496.users where username=? and pass_hash=?',
        [username, passHash],
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

            // Generate a session token from the username, id, and current time
            var sessionToken = crypto.createHmac('sha256', config.auth.sessionTokenSecret)
              .update(username.toString())
              .update(id.toString())
              .update(now.toString())
              .digest('hex');

            // Set the session token expiry to be in 1 day
            var sessionTokenExpiry = now + 1000 * 60 * 60 * 24;

            // Query whether or not this session token is in use
            connection.query(
                'select session_token from ece496.users where session_token=?',
                [sessionToken],
                function(err, rows, fields) {
                  if (err) {
                    console.log(err);
                    res.send(unknownError);
                    return;
                  }

                  if (rows.length == 0) {
                    // TODO: only send the user their session token if there were no errors in the update
                    // Update the user's session token
                    connection.query(
                        'update ece496.users set session_token=?, session_token_expiry=? where id=?',
                        [sessionToken, sessionTokenExpiry, id],
                        function(err, rows, fields) {});

                    // Send the session token in response
                    res.send({session_token: sessionToken});
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

