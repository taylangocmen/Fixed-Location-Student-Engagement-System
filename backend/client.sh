#!/bin/bash

curl -X GET 'https://localhost:8443/login?username=braden&passhash=1234' --cacert ca/certs/ca.cert.pem
