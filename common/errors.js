module.exports = {
  POST: {
    login: {
      missingParamsError: {error: 'Missing username or pass_hash'},
      unknownError: {error: 'An internal error occurred, please try again'},
      invalidCredentialsError: {error: 'Invalid username or password'}
    },
    register: {
      missingParamsError: {error: 'Missing pass_hash, first_name, last_name, email, or utorid'},
      unknownError: {error: 'An internal error occurred, please try again'},
      utoridTakenError: {error: 'Utorid taken'},
      invalidFirstNameError: {error: 'First name must only contain alphabetical characters'},
      invalidLastNameError: {error: 'Last name must only contain alphabetical characters'},
      emailTakenError: {error: 'Email taken'},
      invalidEmailError: {error: 'Invalid email'},
      unsupportedEmailError: {error: 'Only mail.utoronto.ca emails are currently supported'}
    },
    session_token: {
      unknownError: {error: 'An internal error occured, please try again'},
      missingSessionTokenError: {error: 'Missing session_token'},
      validateSessionTokenError: {error: 'Could not validate session_token'},
      expiredSessionTokenError: {error: 'Expired session token'},
      invalidSessionTokenError: {error: 'Invalid session token'}
    },
    question: {
      unknownError: {error: 'An internal error occurred, please try again'},
      validationError: {error: 'Could not validate question request'},
      invalidQuestionError: {error: 'Invalid question_id'},
      updatingAskedQuestion: {error: 'Cannot update a question that has already been asked'},
      authorizationError: {error: 'You are not authorized to create or modify questions in this course'}
    },
    enrol: {
      invalidUserError: {error: 'The user you specified does not exist'},
      unknownError: {error: 'An internal error occurred, please try again'},
      invalidCourseError: {error: 'The course you specified does not exist'},
      userAlreadyEnrolledError: {error: 'The user you specified is already enrolled in this course'},
      authorizationError: {error: 'Authorization failed. Are you sure you have permissions for this action?'},
      schemaError: {error: 'The arguments you provided do not match expected. Please refer to API.md'}
    }
  }
};
