#!/bin/bash

curl -X GET 'https://localhost:9999/login?username=braden&passhash=1234' --cacert bin/ca/certs/ca.cert.pem
