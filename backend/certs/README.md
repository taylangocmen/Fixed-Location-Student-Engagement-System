To create a self-signed certificate: http://www.akadia.com/services/ssh_test_certificate.html

openssl genrsa -des3 -out server.key 1024
openssl req -new -key server.key -out server.csr
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

TODO: need to create our own CA and issue a certificate to ourselves
