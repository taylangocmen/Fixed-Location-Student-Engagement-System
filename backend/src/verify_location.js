var undefsafe = require('undefsafe');

var database = require('./database');

var selectResponsesQuery =
  'select user_id, device_id, device_list ' +
  'from ece496.submissions ' +
  'where course_id=? and question_id=?';

var acceptAnswerQuery =
  'update ece496.submissions ' +
  'set accepted=true ' +
  'where course_id=? and question_id=? and user_id=?';

var rejectAnswerQuery =
  'update ece496.submissions ' +
  'set accepted=false ' +
  'where course_id=? and question_id=? and user_id=?';

var updateDatabase = function(query, course_id, question_id, user_id) {
  database.pool.query(
    query,
    [course_id, question_id, user_id],
    function(err, rows, fields) {
      if (err) {
        console.log(err);
        res.send(errors.unknownError);
        return;
      }
    }
  );
};

var acceptAnswer = function(course_id, question_id, user_id) {
  updateDatabase(acceptAnswerQuery, course_id, question_id, user_id);
};

var rejectAnswer = function(course_id, question_id, user_id) {
  updateDatabase(rejectAnswerQuery, course_id, question_id, user_id);
};

module.exports = {
  verify: function(course_id, question_id) {
    // Fetch the data from the database
    database.pool.query(
      selectResponsesQuery,
      [course_id, question_id],
      function(err, rows, fields) {
        if (err) {
          console.log(err);
          res.send(errors.unknownError);
          return;
        }

        // Build an adjacency matrix representing edges between users
        var adj = new Array(rows.length);

        // Build a map of device_id -> index into adj
        var deviceToIndex = {};
        for (var i = 0; i < rows.length; i++) {
          rows[i].device_list = JSON.parse(rows[i].device_list);
          // Create the columns of adj, filling them with 0s
          adj[i] = Array.apply(null, Array(rows.length))
                        .map(Boolean.prototype.valueOf, false);

          // Initialize the deviceToIndex map
          if (undefsafe(rows[i], 'device_id')) {
            deviceToIndex[rows[i].device_id] = i;
          }
        }

        // For each user
        for (var i = 0; i < rows.length; i++) {
          if (undefsafe(rows[i], 'device_list')) {
            // For each device in this user's device list
            for (var j = 0; j < rows[i].device_list.length; j++) {
              // Get the index of the adj column that corresponds to the device
              var index = deviceToIndex[rows[i].device_list[j]];
              // If the device belongs to another student in the class
              if (index !== undefined) {
                adj[i][index] = true;
              }
            }
          }
        }

        // TODO for each user, perform some heuristic to determine whether they
        // are in the class or not. Either by dividing the class into subgroups,
        // or by expecting each user to see a certain percentage of the rest of the class

        for (var i = 0; i < rows.length; i++) {
          var outgoing = 0, incoming = 0;
          for (var j = 0; j < rows.length; j++) {
            // Outgoing edge exists
            if (adj[i][j]) {
              outgoing++;
            }
            // Incoming edge exists
            if (adj[j][i]) {
              incoming++;
            }
          }

          // TODO Figure out what heuristic to use here. Right now use that the number
          // of incoming connections must be at least half of the class
          if (incoming >= Math.floor(rows.length / 2)) {
            acceptAnswer(course_id, question_id, rows[i].user_id);
          } else {
            rejectAnswer(course_id, question_id, rows[i].user_id);
          }
        }
      }
    );
  }
};

