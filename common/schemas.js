module.exports = {
  POST: {
    login: {
      'type': 'object',
      'additionalProperties': false,
      'properties': {
        'username': {
          'type': 'string',
          'required': true
        },
        'pass_hash': {
          'type': 'string',
          'required': true
        }
      }
    },
    register: {
      'type': 'object',
      'additionalProperties': false,
      'properties': {
        'first_name': {
          'type': 'string',
          'required': true
        },
        'last_name': {
          'type': 'string',
          'required': true
        },
        'email': {
          'type': 'string',
          'required': true
        },
        'utorid': {
          'type': 'string',
          'required': true
        },
        'pass_hash': {
          'type': 'string',
          'required': true
        }
      }
    },
    session_token: {
    },
    question: {
      'type': 'object',
      'additionalProperties': false,
      'properties': {
        'course_id': {
          'type': 'integer',
          'required': true
        },
        'question_id': {
          'type': 'integer'
        },
        'timeout': {
          'type': 'integer',
          'required': true
        },
        'question': {
          'type': 'object',
          'required': true,
          'additionalProperties': false,
          'properties': {
            'text': {
              'type': 'string',
              'required': true
            },
            'correct_answer': {
              'type': 'integer',
              'required': true
            },
            'answers': {
              'type': 'array',
              'required': true,
              'items': {
                'type': 'string',
                'minItems': 1
              }
            }
          }
        }
      }
    }
  },
  PUT: {
    question: {
      'type': 'object',
      'additionalProperties': false,
      'properties': {
        'course_id': {
          'type': 'integer',
          'required': true
        },
        'question_id': {
          'type': 'integer',
          'required': true
        }
      }
    }
  }
};

