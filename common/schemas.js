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
      'properties': {
        'course_id': { 'type': 'integer' },
        'question_id': { 'type': 'integer' },
        'timeout': { 'type': 'integer' },
        'ask_immediately': { 'type': 'boolean' },
        'question': {
          'type': 'object',
          'properties': {
            'text': { 'type': 'string' },
            'correct_answer': { 'type': 'integer' },
            'answers': {
              'type': 'array',
              'items': {
                'type': 'string',
                'minItems': 1
              }
            }
          },
          'required': [
            'text',
            'correct_answer',
            'answers'
          ]
        }
      },
      'required': [
        'course_id',
        'timeout',
        'ask_immediately'
      ]
    }
  }
};

