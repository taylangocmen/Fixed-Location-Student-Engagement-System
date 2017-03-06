module.exports = {
  GET: {
    courses: {
      validationError: {error: 'Could not validate get courses request'}
    },
    questions: {
      validationError: {error: 'Could not validate get questions request'}
    }
  },
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
      unknownError: {error: 'An internal error occured, please try again'},
      missingSessionTokenError: {error: 'Missing session_token'},
      validateSessionTokenError: {error: 'Could not validate session_token'},
      expiredSessionTokenError: {error: 'Expired session token'},
      invalidSessionTokenError: {error: 'Invalid session token'}
    },
    create_course: {
      validationError: {error: 'Could not validate create course request'},
      unknownError: {error: 'An internal error occurred, please try again'},
      authorizationError: {error: 'You are not authorized to create courses'}
    },
    question: {
      unknownError: {error: 'An internal error occurred, please try again'},
      validationError: {error: 'Could not validate question request'},
      invalidQuestionError: {error: 'Invalid question'},
      updatingAskedQuestion: {error: 'Cannot update a question that has already been asked'},
      authorizationError: {error: 'You are not authorized to create or modify questions in this course'}
    },
    enrol: {
      invalidUserError: {error: 'The user you specified does not exist'},
      unknownError: {error: 'An internal error occurred, please try again'},
      invalidCourseError: {error: 'The course you specified does not exist'},
      userAlreadyEnrolledError: {error: 'The user you specified is already enrolled in this course'},
      authorizationError: {error: 'Authorization failed. Are you sure you have permissions for this action?'},
      schemaError: {error: 'The arguments you provided do not match expected. Please refer to API.md'},
      userNotEnrolledError: {error: 'The user you specified is not enrolled in this course'},
    },
    answer: {
      unknownError: {error: 'An internal error occurred, please try again'},
      validationError: {error: 'Could not validate answer request'},
      invalidQuestionError: {error: 'Invalid question'},
      locationError: {error: 'You are not located within the classroom'},
      enrolmentError: {error: 'You are not enrolled in the course you are attempting to submit an answer for.'},
      sqlError: {error: 'There was an unknown error in executing the SQL query'},
      notAcceptingError: {error: 'The question that you attempted to answer is not currently accepting answers!'},
      schemaError: {error: 'The arguments you provided do not match expected. Please refer to API.md'},
      userNotEnrolledError: {error: 'The user you specified is not enrolled in this course'}
    }
  },
  PUT: {
    question: {
      unknownError: {error: 'An internal error occurred, please try again'},
      validationError: {error: 'Could not validate question pose/close request'},
      invalidQuestionError: {error: 'Invalid question'},
      posingAskedQuestion: {error: 'Cannot pose a question that has already been asked'},
      closingUnaskedQuestion: {error: 'Cannot close a question that has not yet been asked'},
      authorizationError: {error: 'You are not authorized to pose/close questions in this course'}
    },
    logout: {
      unknownError: {error: 'An internal error occurred, please try again'}
    }
  }
};
