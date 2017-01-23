#!/bin/bash

SESSION_TOKEN=$(curl -s -X POST 'https://localhost:8443/login' \
     -d '{"username":"blah","pass_hash":"1234"}' \
     -H 'Content-Type: application/json' \
     --cacert ca/certs/ca.cert.pem | sed -e 's/.*session_token.*"\(.*\)".*/\1/')

URL='https://localhost:8443/create_course?session_token='$SESSION_TOKEN

COURSE_REQUEST='{
  "course_name":"ece496"
}'
echo $SESSION_TOKEN
curl -X POST $URL \
     -d "$COURSE_REQUEST" \
     -H 'Content-Type: application/json' \
     --cacert ca/certs/ca.cert.pem
