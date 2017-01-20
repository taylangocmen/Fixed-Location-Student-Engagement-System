var database = require('./database')
var config = require('./config')
var auth = require('./auth')
var validate = require('jsonschema').validate

var invalidSessionError = {error: 'Session expired. Please log in and try again.'};

module.exports = {
	//takes a utorid and session token as input and returns the classes they're enrolled in
	handle: function (req, res) {
		auth.validateSessionToken(req.query.session_token).then(function(user_id) {
			
		}}



	}
}
