module.exports = {
  POST: {
    login: {
    },
    register: {
    },
    session_token: {
    },
    enrol: {
      'type': 'object',
      'additionalProperties': false,
      'properties': {
        'utorid': {
          'type': 'integer',
          'required': true
        },
        'course_name': {
          'type': 'string',
          'required': true
        }
      }
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
        'ask_immediately': {
          'type': 'boolean',
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
  }
};
