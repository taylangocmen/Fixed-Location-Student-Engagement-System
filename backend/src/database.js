var mysql = require('mysql');

var config = require('./config');

module.exports = {
  pool: mysql.createConnection(
    {
      host: config.db.host,
      user: config.db.user,
      password: config.db.password,
      port: config.db.port
    }
  )
};

