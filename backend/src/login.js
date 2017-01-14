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

    // TODO: Log errors (hopefully with line numbers) when validation fails

    if (username == undefined || username == null || username == '' ||
        passHash == undefined || passHash == null || passHash == '') {
      res.send(missingParamsError);
      return;
    }

    // TODO: Clean up these nested queries
    // Verify the user's credentials
    connection.query(
        'select id, email, utorid, first_name, last_name from ece496.users where (utorid=? or email=?) and pass_hash=?',
        [username, username, passHash],
        function(err, rows, fields) {
          if (err) {
            console.log(err);
            res.send(unknownError);
            return;
          }

          // If the user's credentials were correct
          if (rows.length == 1) {
            // Get the current time
            var now = (new Date()).getTime();

            // Generate a session token from the user's information,
            // the current time, and a random number
            var sessionToken = crypto.createHmac('sha256', config.auth.sessionTokenSecret)
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
                'select session_token from ece496.users where session_token=?',
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
                        'update ece496.users set session_token=?, session_token_expiry=? where id=?',
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

