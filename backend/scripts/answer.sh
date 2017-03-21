#!/bin/bash

SESSION_TOKEN=$(curl -s -X POST 'https://localhost:8443/login' \
     -d '{"username":"blah","pass_hash":"1234"}' \
     -H 'Content-Type: application/json' \
     --cacert ca/certs/ca.cert.pem | sed -e 's/.*session_token.*"\(.*\)".*/\1/')

ANSWER_URL='https://localhost:8443/answer'

ANSWER_REQUEST='{
  "course_id": 1,
	"question_id": 1,
  "answer": 1,
	"neighbours": [],
	"device_id": "mydevice"
}'

curl -X POST $ANSWER_URL \
     -d "$ANSWER_REQUEST" \
     -H 'Content-Type: application/json' \
     -H 'Authorization: Bearer '$SESSION_TOKEN \
     --cacert ca/certs/ca.cert.pem
