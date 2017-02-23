var auth = require('../auth');
var database = require('../database');
var config = require('../config');
var login = require('../login');
var create_course = require('../create_course');

var insertInstructorQuery =
  'insert into ece496.users ' +
  '(pass_hash, first_name, last_name, utorid, is_prof) ' +
  'values (?,?,?,?,?)';

module.exports = {
  run: function(emitter) {
      database.pool.query(
        insertInstructorQuery,
        ["1234", "Sample", "Professor", "professorsa", true],
        function(err, rows, fields) {
          if (err) {
            console.log(err);
            throw err;
          }
          else {
            console.log("hello from within create_instructor")
            emitter.emit('do_courses', rows.insertId);
          }
          return;
        }
      );
      return;
  }
}
