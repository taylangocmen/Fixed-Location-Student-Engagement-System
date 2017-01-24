module.exports = {
  GET: {
    courses: {
      'type': 'object',
      'additionalProperties': false,
      'properties': {
        'session_token': {
          'type': 'string',
          'required': true
        }
      }
    }
  },
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
    create_course: {
      'type': 'object',
      'additionalProperties': false,
      'properties': {
        'course_name': {
          'type': 'string',
          'required': true
        },
        'course_desc': {
          'type': 'string',
          'required': true
        }
      }
    },
    enrol: {
      'type': 'object',
      'additionalProperties': false,
      'properties': {
        'course_id': {
          'type': 'integer',
          'required': true
        }
      }
    },
    unenrol: {
      'type': 'object',
      'additionalProperties': false,
      'properties': {
        'course_id': {
          'type': 'integer',
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
        'question': {
          'type': 'object',
          'required': true,
          'additionalProperties': false,
          'properties': {
            'title': {
              'type': 'string',
              'required': true
            },
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
