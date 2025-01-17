var crypto = require('crypto');
var validate = require('jsonschema').validate;

var database = require('./database');
var config = require('./config');
var errors = require('../../common/errors').POST.login;
var schema = require('../../common/schemas').POST.login;

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
    // TODO: Log errors (hopefully with line numbers) when validation fails

    // Validate the request body
    var result = validate(req.body, schema);
    if (result.errors.length !== 0) {
      res.send(errors.validationError);
      return;
    }

    var username = req.body.username;
    var passHash = req.body.pass_hash;

    // Verify the user's credentials
    database.pool.query(
        selectUserInfo,
        [username, username, passHash],
        function(err, rows, fields) {
          if (err) {
            console.log(err);
            res.send(errors.unknownError);
            return;
          }

          // If the user's credentials were correct
          if (rows.length === 1) {
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
            database.pool.query(
                selectSessionToken,
                [sessionToken],
                function(err, rows, fields) {
                  if (err) {
                    console.log(err);
                    res.send(errors.unknownError);
                    return;
                  }

                  if (rows.length === 0) {
                    // Update the user's session token
                    database.pool.query(
                        updateSessionToken,
                        [sessionToken, sessionTokenExpiry, id],
                        function(err, rows, fields) {
                          if (err) {
                            console.log(err);
                            res.send(errors.unknownError);
                            return;
                          }

                          // Send the session token in response
                          res.send({session_token: sessionToken});
                        }
                    );
                  } else {
                    res.send(errors.unknownError);
                  }
                }
            );
          } else {
            res.send(errors.invalidCredentialsError);
          }
        }
    );
  }
};

