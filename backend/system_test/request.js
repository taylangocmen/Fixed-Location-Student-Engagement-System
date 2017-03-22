var CondVar = require('condvar');
var http = require('http');

// TODO Comment this up
module.exports = function(path, method, body, session_token, callback) {
  body = typeof body !== 'undefined' ? body : '';
  body = typeof body !== 'string' ? JSON.stringify(body) : body;

  var options = {
    host: 'localhost',
    port: 8080,
    path: path,
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body)
    }
  };

  if (typeof session_token === 'string') {
    options.headers.Authorization = 'Bearer ' + session_token;
  }

  cv = new CondVar;
  req = http.request(options, function(res) {
    // https://nodejs.org/api/http.html#http_http_request_options_callback
    var output = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      output += chunk;
    });
    res.on('end', function() {
      var sendValue;
      try {
        var obj = JSON.parse(output);
        sendValue = obj;
      } catch (e) {
        sendValue = output;
      }
      if (typeof callback === 'function') {
        callback(sendValue);
      } else {
        cv.send(sendValue);
      }
    });
  });
  req.on('error', function(e) {
    if (typeof callback === 'function') {
      callback(sendValue);
    } else {
      cv.send(sendValue);
    }
  });
  req.write(body);
  req.end();

  if (typeof callback === 'function') {
    return;
  } else {
    return cv.recv();
  }
};
