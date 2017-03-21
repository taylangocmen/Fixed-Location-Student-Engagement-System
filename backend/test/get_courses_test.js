var assert = require('assert');
var rewire = require('rewire');
var sinon = require('sinon');

var stubdb = require('./stubdb');
var mockSessionToken = require('./mock_session_token');
var errors = require('../../common/errors').GET.courses;

var getCourses = rewire('../src/get_courses');
getCourses.__set__('database', stubdb);
getCourses.__set__('auth.validateSessionToken', mockSessionToken);

var rowData = [
  {
    course_id: 1,
    course_name: 'ece496',
    course_desc: 'Design course',
    active: 1,
    question_id: 1,
    title: 'Question 1',
    question_text: 'Is this a question?',
    asked: 1,
    completed: 0,
    answers_array: '["Yes, it is.", "No, it is not."]'
  },
  {
    course_id: 1,
    course_name: 'ece496',
    course_desc: 'Design course',
    active: 1,
    question_id: 2,
    title: 'Question 2',
    question_text: 'Is this also a question?',
    asked: 1,
    completed: 0,
    answers_array: '["Yes, it most definitely is.", "No, it most definitely is not."]'
  },
  {
    course_id: 1,
    course_name: 'ece496',
    course_desc: 'Design course',
    active: 1,
    question_id: 3,
    title: 'Asked question 3',
    question_text: 'Has this question already been asked?',
    asked: 1,
    completed: 1,
    answers_array: '["Absolutely."]'
  },
  {
    course_id: 2,
    course_name: 'ece466',
    course_desc: 'Networks II',
    active: 0,
    question_id: 4,
    title: 'Question 4',
    question_text: 'Is this a question?',
    asked: 1,
    completed: 0,
    answers_array: '["Yes, it is.", "No, it is not."]'
  },
  {
    course_id: 2,
    course_name: 'ece466',
    course_desc: 'Networks II',
    active: 0,
    question_id: 5,
    title: 'Asked question 5',
    question_text: 'Has this question already been asked?',
    asked: 1,
    completed: 1,
    answers_array: '["Absolutely."]'
  },
  {
    course_id: 3,
    course_name: 'ece521',
    course_desc: 'Inference Algorithms and Machine Learning',
    active: 1,
    question_id: null,
    title: null,
    question_text: null,
    asked: null,
    completed: null,
    answers_array: null
  },
  {
    course_id: 4,
    course_name: 'ece419',
    course_desc: 'Distributed Systems',
    active: 0,
    question_id: null,
    title: null,
    question_text: null,
    asked: null,
    completed: null,
    answers_array: null
  }
];

var expectedResponse = {
  courses_registered: [
    {
      course_id: 1,
      course_name: 'ece496',
      course_desc: 'Design course',
      active_questions: [
        {
          question_id: 1,
          title: 'Question 1',
          body: 'Is this a question?',
          answers: [
            'Yes, it is.',
            'No, it is not.'
          ]
        },
        {
          question_id: 2,
          title: 'Question 2',
          body: 'Is this also a question?',
          answers: [
            'Yes, it most definitely is.',
            'No, it most definitely is not.'
          ]
        }
      ]
    },
    {
      course_id: 3,
      course_name: 'ece521',
      course_desc: 'Inference Algorithms and Machine Learning',
      active_questions: []
    }
  ],
  courses_expired: [
    {
      course_id: 2,
      course_name: 'ece466',
      course_desc: 'Networks II',
      active_questions: [
        {
          question_id: 4,
          title: 'Question 4',
          body: 'Is this a question?',
          answers: [
            'Yes, it is.',
            'No, it is not.'
          ]
        }
      ]
    },
    {
      course_id: 4,
      course_name: 'ece419',
      course_desc: 'Distributed Systems',
      active_questions: []
    }
  ]
};

describe('Get Courses', function() {
  describe('#handle()', function() {
    // Reset the database before each test
    beforeEach(function() {
      stubdb.reset();
    });

    it('handles valid data from the database', function() {
      var req = {
        body: { course_name: 'ece496', course_desc: 'hello!' }
      };
      var res = { send: sinon.spy() };

      // When the database is queried for the course and question data, return
      // the specified rowData
      stubdb.pool.query.onCall(0)
                  .callsArgWith(2, null, rowData, null);

      getCourses.handle(req, res);

      assert.equal(res.send.args.length, 1);
      assert.equal(res.send.args[0].length, 1);
      assert.deepEqual(res.send.args[0][0], expectedResponse);
    });

  });
});

