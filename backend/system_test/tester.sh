#!/bin/bash

# Check if a server is already running as the current user
SERVER_PID=$(pgrep -u $USER node)
STARTED_SERVER=0

if [[ $SERVER_PID -eq '' ]]; then
  node src/index.js &
	SERVER_PID=$!
	STARTED_SERVER=1
fi

REGISTER_RESPONSE=$(curl -X POST 'https://localhost:8443/register' \
     -d '{"first_name":"System","last_name":"Test","email":"system_test@mail.utoronto.ca","utorid":"system_test","pass_hash":"1234"}' \
     -H 'Content-Type: application/json' \
     --cacert ca/certs/ca.cert.pem)



SESSION_TOKEN=$(curl -s -X POST 'https://localhost:8443/login' \
     -d '{"username":"system_test","pass_hash":"1234"}' \
     -H 'Content-Type: application/json' \
     --cacert ca/certs/ca.cert.pem | sed -e 's/.*session_token.*"\(.*\)".*/\1/')

# Kill the server if we started it
if [[ $STARTED_SERVER == 1 ]]; then
  kill $SERVER_PID
fi
