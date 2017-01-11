var crypto = require('crypto');
var database = require('./database');

var SESSION_TOKEN_SECRET = 'SP[2qD%zB/8u!nXUb-`Z'

module.exports = {
  // Login handler
  handleLogin: function(req, res) {
    var connection = database.connect();

    var username = req.query.username;
    var passHash = req.query.pass_hash;

    // Verify the user's credentials
    connection.query(
        'select id from ece496.users where username=? and pass_hash=?',
        [username, passHash],
        function(err, rows, fields) {
          if (err) throw err;

          // If the user's credentials were correct
          if (rows.length == 1) {
            var id = rows[0].id;

            var now = (new Date()).getTime();

            // Generate a session token from the username, id, and current time
            var sessionToken = crypto.createHmac('sha256', SESSION_TOKEN_SECRET)
              .update(username)
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
                  if (err) throw err;

                  if (rows.length == 0) {
                    // Update the user's session token
                    connection.query(
                        'update ece496.users set session_token=?, session_token_expiry=? where id=?',
                        [sessionToken, sessionTokenExpiry, id],
                        function(err, rows, fields) {});

                    // Send the session token in response
                    res.send({session_token: sessionToken});
                  } else {
                    res.send({error: 'An error occurred while generating the session_token, please try again'});
                  }
                }
            );
          } else {
            res.send({error: 'Invalid username or password'});
          }
        }
    );
  }
};

