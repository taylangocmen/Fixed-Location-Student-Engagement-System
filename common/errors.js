module.exports = {
  POST: {
    login: {
      missingParamsError: {error: 'Missing username or pass_hash'},
      unknownError: {error: 'An internal error occurred while generating the session_token, please try again'},
      invalidCredentialsError: {error: 'Invalid username or password'}
    },
    register: {
      missingParamsError: {error: 'Missing pass_hash, first_name, last_name, email, or utorid'},
      unknownError: {error: 'An internal error occurred while registering, please try again'},
      utoridTakenError: {error: 'Utorid taken'},
      invalidFirstNameError: {error: 'First name must only contain alphabetical characters'},
      invalidLastNameError: {error: 'Last name must only contain alphabetical characters'},
      emailTakenError: {error: 'Email taken'},
      invalidEmailError: {error: 'Invalid email'},
      unsupportedEmailError: {error: 'Only mail.utoronto.ca emails are currently supported'}
    },
    session_token: {
      missingSessionTokenError: {error: 'Missing session_token'},
      validateSessionTokenError: {error: 'Could not validate session_token'},
      expiredSessionTokenError: {error: 'Expired session token'},
      invalidSessionTokenError: {error: 'Invalid session token'}
    }
  }
};
