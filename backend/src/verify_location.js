var database = require('./database');

var selectResponsesQuery =
  'select user_id, device_id, device_list ' +
  'from ece496.submissions ' +
  'where course_id=? and question_id=?';

var handleResponses = function(err, rows, fields) {
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
    // Create the columns of adj, filling them with 0s
    adj[i] = Array.apply(null, Array(rows.length))
                  .map(Boolean.prototype.valueOf, false);

    // Initialize the deviceToIndex map
    deviceToIndex[rows[i].device_id] = i;
  }

  // For each user
  for (var i = 0; i < rows.length; i++) {
    // For each device in this user's device list
    for (var j = 0; j < rows[i].device_list.length; j++) {
      // Get the index of the adj column that corresponds to the device
      var index = deviceToIndex[rows[i].device_list[j]];
      if (index !== undefined) {
        adj[i][index] = true;
      }
    }
  }

  // TODO for each user, perform some heuristic to determine whether they
  // are in the class or not. Either by dividing the class into subgroups,
  // or by expecting each user to see a certain percentage of the rest of the class

  for (var i = 0; i < rows.length; i++) {
    var outgoing = 0, incoming = 0;
    for (var j = 0; j < rows.length; j++) {
      if (adj[i][j]) {
        outgoing++;
      }
      if (adj[j][i]) {
        incoming++;
      }
    }
    // TODO: If the number of outgoing and incoming edges are high enough,
    // accept this user's answer. Update the database to reflect that
  }
};

module.exports = {
  verify: function(course_id, question_id) {
    // Fetch the data from the database
    database.pool.query(
      selectResponsesQuery,
      [course_id, question_id],
      handleResponses
    );
  }
};

