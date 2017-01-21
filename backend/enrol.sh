SESSION_TOKEN=$(curl -s -X POST 'https://localhost:8443/login' \
     -d '{"username":"blah","pass_hash":"1234"}' \
     -H 'Content-Type: application/json' \
     --cacert ca/certs/ca.cert.pem | sed -e 's/.*session_token.*"\(.*\)".*/\1/')

ENROL_URL='https://localhost:8443/enrolInClass?session_token='$SESSION_TOKEN

ENROL_REQUEST='{
  "utorid": "blah",
  "class_name": "Zachs Class"
}'

curl -X POST $ENROL_URL \
     -d "$ENROL_REQUEST" \
     -H 'Content-Type: application/json' \
     --cacert ca/certs/ca.cert.pem
