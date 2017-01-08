To create a CA, follow these instructions: https://jamielinux.com/docs/openssl-certificate-authority/index.html

Notes:
  - openssl.cnf must be modified so that CA_default.dir = pwd

  - To create the CA:
    - openssl genrsa -aes256 -out private/ca.key.pem 4096
    - openssl req -config openssl.cnf -key private/ca.key.pem -new -x509 -days 7300 -sha256 -extensions v3_ca -out certs/ca.cert.pem

  - To create the certificate for 'localhost':
    - openssl genrsa -aes256 -out private/localhost.key.pem 2048
    - openssl req -config openssl.cnf -key private/localhost.key.pem -new -sha256 -out csr/localhost.csr.pem
    - openssl ca -config openssl.cnf -extensions server_cert -days 375 -notext -md sha256 -in csr/localhost.csr.pem -out certs/localhost.cert.pem
