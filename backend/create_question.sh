#!/bin/bash

SESSION_TOKEN=$(curl -s -X POST 'https://localhost:8443/login' \
     -d '{"username":"blah","pass_hash":"1234"}' \
     -H 'Content-Type: application/json' \
     --cacert ca/certs/ca.cert.pem | sed -e 's/.*session_token.*"\(.*\)".*/\1/')

QUESTION_URL='https://localhost:8443/question?session_token='$SESSION_TOKEN

QUESTION_REQUEST='{
  "course_id":1,
  "timeout":1000,
  "ask_immediately":false,
  "question": {
    "text": "Is this a question?",
    "correct_answer": 1,
    "answers": [
      "Yes, this is."
    ]
  }
}'

curl -X POST $QUESTION_URL \
     -d "$QUESTION_REQUEST" \
     -H 'Content-Type: application/json' \
     --cacert ca/certs/ca.cert.pem
