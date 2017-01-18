var validator = require('validator');

var database = require('./database');
var config = require('./config');


var missingParamsError = {error: 'Missing pass_hash, first_name, last_name, email, or utorid'};

var unknownError = {error: 'An internal error occurred while registering, please try again'};

var utoridTakenError = {error: 'Utorid taken'};

var invalidFirstNameError = {error: 'First name must only contain alphabetical characters'};
var invalidLastNameError = {error: 'Last name must only contain alphabetical characters'};

var emailTakenError = {error: 'Email taken'};
var invalidEmailError = {error: 'Invalid email'};
var unsupportedEmailError = {error: 'Only mail.utoronto.ca emails are currently supported'};

module.exports = {
  // Register handler
  handle: function(req, res) {
    // TODO: Find a way to prevent bots from spamming this endpoint

    var passHash = req.body.pass_hash;
    var firstName = req.body.first_name;
    var lastName = req.body.last_name;
    var email = req.body.email;
    var utorID = req.body.utorid;

    // TODO: Log errors (hopefully with line numbers) when validation fails

    // Make sure all of the required parameters are present
    if (passHash == undefined || passHash == null || passHash == '' ||
        firstName == undefined || firstName == null || firstName == '' ||
        lastName == undefined || lastName == null || lastName == '' ||
        email == undefined || email == null || email == '' ||
        utorID == undefined || utorID == null || utorID == '') {
      res.send(missingParamsError);
      return;
    }

    // First name must only contain alphabetical characters
    if (!validator.isAlpha(firstName)) {
      res.send(invalidFirstNameError);
      return;
    }

    // Last name must only contain alphabetical characters
    if (!validator.isAlpha(lastName)) {
      res.send(invalidLastNameError);
      return;
    }

    // Make sure the email is a valid format
    if (!validator.isEmail(email)) {
      res.send(invalidEmailError);
      return;
    }

    // Make sure the email ends in 'mail.utoronto.ca'
    if (!/mail\.utoronto\.ca$/.test(email)) {
      res.send(unsupportedEmailError);
      return;
    }

    var connection = database.connect();

    // Check if the utorid is taken
    connection.query(
      'select id from ece496.users where utorid=?',
      [utorID],
      function(err, rows, fields) {
        if (err) {
          console.log(err);
          res.send(unknownError);
          return;
        }

        if (rows.length == 0) {
          // Check if the email is taken
          connection.query(
            'select id from ece496.users where email=?',
            [email],
            function(err, rows, fields) {
              if (err) {
                console.log(err);
                res.send(unknownError);
                return;
              }

              if (rows.length == 0) {
                // Insert the new user into the database
                connection.query(
                  'insert into ece496.users(pass_hash, first_name, last_name, email, utorid) values(?, ?, ?, ?, ?)',
                  [passHash, firstName, lastName, email, utorID],
                  function(err, rows, fields) {
                    if (err) {
                      console.log(err);
                      res.send(unknownError);
                      return;
                    }

                    // Successfully registered
                    res.send({});

                    // TODO: Send a confirmation email to the user and determine how that will work
                  }
                );
              } else {
                res.send(emailTakenError);
              }
            }
          );
        } else {
          res.send(utoridTakenError);
        }
      }
    );
  }
};

