var config = {};

config.auth = {};
config.db = {};
config.server = {};

config.auth.sessionTokenSecret = 'SP[2qD%zB/8u!nXUb-`Z';

config.db.host = 'ece496.cgaqufxgrmkh.us-west-2.rds.amazonaws.com';
config.db.user = 'ece496';
config.db.password = 'password';
config.db.port = 3306

config.server.privateKey = 'ca/private/localhost.key.pem';
config.server.certificate = 'ca/certs/localhost.cert.pem';
config.server.passphrase = 'password';
config.server.http_port = 80;
config.server.https_port = 443;

module.exports = config;
