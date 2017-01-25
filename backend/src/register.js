var validator = require('validator');
var validate = require('jsonschema').validate;

var database = require('./database');
var config = require('./config');
var errors = require('../../common/errors').POST.register;
var schema = require('../../common/schemas').POST.register;

var selectUtorID =
    'select utorid from ece496.users where utorid=?';

var selectEmail =
    'select email from ece496.users where email=?';

var insertUser =
    'insert into ece496.users ' +
    '(pass_hash, first_name, last_name, email, utorid) ' +
    'values (?, ?, ?, ?, ?)';

module.exports = {
  // Register handler
  handle: function(req, res) {
    // TODO: Find a way to prevent bots from spamming this endpoint
    // TODO: Log errors (hopefully with line numbers) when validation fails

    // Validate the request body
    var result = validate(req.body, schema);
    if (result.errors.length !== 0) {
      res.send(errors.validationError);
      return;
    }

    var passHash = req.body.pass_hash;
    var firstName = req.body.first_name;
    var lastName = req.body.last_name;
    var email = req.body.email;
    var utorID = req.body.utorid;

    // First name must only contain alphabetical characters
    if (!validator.isAlpha(firstName)) {
      res.send(errors.invalidFirstNameError);
      return;
    }

    // Last name must only contain alphabetical characters
    if (!validator.isAlpha(lastName)) {
      res.send(errors.invalidLastNameError);
      return;
    }

    // Make sure the email is a valid format
    if (!validator.isEmail(email)) {
      res.send(errors.invalidEmailError);
      return;
    }

    // Make sure the email ends in 'mail.utoronto.ca'
    if (!/mail\.utoronto\.ca$/.test(email)) {
      res.send(errors.unsupportedEmailError);
      return;
    }

    // Check if the utorid is taken
    database.pool.query(
      selectUtorID,
      [utorID],
      function(err, rows, fields) {
        if (err) {
          console.log(err);
          res.send(errors.unknownError);
          return;
        }

        if (rows.length === 0) {
          // Check if the email is taken
          database.pool.query(
            selectEmail,
            [email],
            function(err, rows, fields) {
              if (err) {
                console.log(err);
                res.send(errors.unknownError);
                return;
              }

              if (rows.length === 0) {
                // Insert the new user into the database
                database.pool.query(
                  insertUser,
                  [passHash, firstName, lastName, email, utorID],
                  function(err, rows, fields) {
                    if (err) {
                      console.log(err);
                      res.send(errors.unknownError);
                      return;
                    }

                    // Successfully registered
                    // TODO Send back meaningful stuff?
                    res.send({});

                    // TODO: Send a confirmation email to the user and determine how that will work
                  }
                );
              } else {
                res.send(errors.emailTakenError);
              }
            }
          );
        } else {
          res.send(errors.utoridTakenError);
        }
      }
    );
  }
};

