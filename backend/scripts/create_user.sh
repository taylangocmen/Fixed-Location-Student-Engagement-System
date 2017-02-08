#!/bin/bash

curl -X POST 'https://localhost:8443/register' \
     -d '{"first_name":"Braden","last_name":"Watling","email":"blah@mail.utoronto.ca","utorid":"blah","pass_hash":"1234"}' \
     -H 'Content-Type: application/json' \
     --cacert ca/certs/ca.cert.pem

curl -X POST 'https://localhost:8443/login' \
     -d '{"username":"blah","pass_hash":"1234"}' \
     -H 'Content-Type: application/json' \
     --cacert ca/certs/ca.cert.pem
