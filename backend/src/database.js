var mysql = require('mysql');

module.exports = {
  connect: function() {
    return mysql.createConnection({
      host     : 'localhost',
      user     : 'ece496',
      password : 'password',
      port     : 3306
    });
  }
};

