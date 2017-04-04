#!/bin/bash

USERNAME=$1
PASSWORD=$2
COURSENAME=$3
COURSEDESC=$4

if [[ $USERNAME == "" || $PASSWORD == "" || $COURSENAME == "" || $COURSEDESC == "" ]]; then
	echo "Usage: enrol.sh <username> <password> <coursename> <coursedesc>"
	exit
fi

SESSION_TOKEN=$(curl -s -X POST 'https://localhost:443/login' \
     -d '{"username":"'$USERNAME'","pass_hash":"'$PASSWORD'"}' \
     -H 'Content-Type: application/json' \
     --cacert ca/certs/ca.cert.pem | sed -e 's/.*session_token.*"\(.*\)".*/\1/')

URL='https://localhost:443/create_course'

COURSE_REQUEST='{
  "course_name":"'$COURSENAME'",
	"course_desc":"'$COURSEDESC'"
}'
curl -X POST $URL \
     -d "$COURSE_REQUEST" \
     -H 'Content-Type: application/json' \
     -H 'Authorization: Bearer '$SESSION_TOKEN \
     --cacert ca/certs/ca.cert.pem
