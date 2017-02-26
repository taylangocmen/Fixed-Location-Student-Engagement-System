var auth = require('../auth');
var database = require('../database');
var config = require('../config');
var login = require('../login');
var create_course = require('../create_course');

var insertUserQuery =
  'insert into ece496.users ' +
  '(pass_hash, first_name, last_name, utorid, is_prof) ' +
  'values (?,?,?,?,?)';

var prof_id = "";
var student_id = "";

module.exports = {
  run: function(emitter) {
      database.pool.query(
        insertUserQuery,
        ["1234", "Legacy", "User", "bla", false],
        function(err, rows, fields){
          if (err) throw err;
        }
      );
      database.pool.query(
        insertUserQuery,
        ["1234", "Johnny", "Professor", "professorsa", true],
        function(err, rows, fields) {
          if (err) {
            console.log(err);
            throw err;
          }
          else {
            prof_id = rows.insertId;
            database.pool.query(
              insertUserQuery,
              ["1234", "Joe", "User", "userjoe", false],
              function(err, rows, fields) {
                if (err) throw err;
                else {
                  student_id = rows.insertId;
                  emitter.emit('do_courses_and_questions', prof_id, student_id);
                }
              }
            );
          }
        }
      );
      return;
  }
}
