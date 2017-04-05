#!/bin/bash

USERNAME=$1
PASSWORD=$2
COURSEID=$3

if [[ $USERNAME == "" || $PASSWORD == "" || $COURSEID == "" ]]; then
	echo "Usage: enrol.sh <username> <password> <courseid>"
	exit
fi

SESSION_TOKEN=$(curl -s -X POST 'https://localhost:443/login' \
     -d '{"username":"'$USERNAME'","pass_hash":"'$PASSWORD'"}' \
     -H 'Content-Type: application/json' \
     --cacert ca/certs/ca.cert.pem | sed -e 's/.*session_token.*"\(.*\)".*/\1/')

ENROL_URL='https://localhost:443/enrol'

ENROL_REQUEST='{
  "course_id": '$COURSEID'
}'

curl -X POST $ENROL_URL \
     -d "$ENROL_REQUEST" \
     -H 'Content-Type: application/json' \
     -H 'Authorization: Bearer '$SESSION_TOKEN \
     --cacert ca/certs/ca.cert.pem
