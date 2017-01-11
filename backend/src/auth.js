var login = require('./login');
var register = require('./register');
var sessionToken = require('./session_token');

module.exports = {
  handleLogin: login.handle,
  handleRegister: register.handle,
  validateSessionToken: sessionToken.validate
};

