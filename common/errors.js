module.exports = {
  POST: {
    login: {
      validationError: {error: 'Could not validate login request'},
      unknownError: {error: 'An internal error occurred, please try again'},
      invalidCredentialsError: {error: 'Invalid username or password'}
    },
    register: {
      validationError: {error: 'Could not validate register request'},
      unknownError: {error: 'An internal error occurred, please try again'},
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
    },
    question: {
      unknownError: {error: 'An internal error occurred, please try again'},
      validationError: {error: 'Could not validate question request'},
      invalidQuestionError: {error: 'Invalid question'},
      updatingAskedQuestion: {error: 'Cannot update a question that has already been asked'},
      authorizationError: {error: 'You are not authorized to create or modify questions in this course'}
    }
  },
  PUT: {
    question: {
      unknownError: {error: 'An internal error occurred, please try again'},
      validationError: {error: 'Could not validate question pose request'},
      invalidQuestionError: {error: 'Invalid question'},
      posingAskedQuestion: {error: 'Cannot pose a question that has already been asked'},
      authorizationError: {error: 'You are not authorized to pose questions in this course'}
    }
  }
};

