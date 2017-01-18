var database = require('./database')
var config = require('./config')

var invalidSessionError = {error: 'Session expired. Please log in and try again.'};

module.exports = {
	//takes a utorid and session token as input and returns the classes they're enrolled in
	getClassesByUser: function (req, res) {
		var utorid = req.body.utorid;
		var token = req.body.sessionToken;
    connection = database.connect();

    var sessionTokenQuery = 'select session_token, session_token_expiry from ece496.users where utorid='+connection.escape(utorid);
		connection.query(sessionTokenQuery,	function(err, rows, fields) {
        console.log(rows)
				if (err) {
					console.log(err);
					return;
				}
				if (rows.length == 0) {//does this work?
					res.send(invalidSessionError);
				  return;
        }
        else {
          console.log(rows)
          res.send({"utorid": utorid});
        }
        return;
			}
			)
	}
}
