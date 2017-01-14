var mysql = require('mysql')
var connection = mysql.createConnection({
	host:'localhost',
	user:'zach',
	password:'*00A51F3F48415C7D4E8908980D443C29C69B60C9'	
})

connection.connect()

connection.end()