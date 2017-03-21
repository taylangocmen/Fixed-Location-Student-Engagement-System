SESSION_TOKEN=$(curl -s -X POST 'https://localhost:8443/login' \
     -d '{"username":"blah","pass_hash":"1234"}' \
     -H 'Content-Type: application/json' \
     --cacert ca/certs/ca.cert.pem | sed -e 's/.*session_token.*"\(.*\)".*/\1/')

LOGOUT_URL='https://localhost:8443/logout'

curl -X PUT $LOGOUT_URL \
     -H 'Content-Type: application/json' \
     -H 'Authorization: Bearer '$SESSION_TOKEN \
     --cacert ca/certs/ca.cert.pem
