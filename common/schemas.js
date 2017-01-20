module.exports = {
  POST: {
    login: {
    },
    register: {
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

