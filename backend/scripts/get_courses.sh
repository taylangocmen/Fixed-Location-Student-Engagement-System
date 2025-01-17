#!/bin/bash

SESSION_TOKEN=$(curl -s -X POST 'https://localhost:8443/login' \
     -d '{"username":"blah","pass_hash":"1234"}' \
     -H 'Content-Type: application/json' \
     --cacert ca/certs/ca.cert.pem | sed -e 's/.*session_token.*"\(.*\)".*/\1/')

URL='https://localhost:8443/courses'

echo $SESSION_TOKEN
curl -X GET $URL --cacert ca/certs/ca.cert.pem \
     -H 'Authorization: Bearer '$SESSION_TOKEN
