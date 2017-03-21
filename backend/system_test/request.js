var CondVar = require('condvar');
var http = require('http');

// TODO Comment this up
module.exports = function(path, method, body, session_token) {
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
      try {
        var obj = JSON.parse(output);
        cv.send(obj);
      } catch (e) {
        cv.send(output);
      }
    });
  });
  req.on('error', function(e) {
    cv.send(e);
  });
  req.write(body);
  req.end();

  return cv.recv();
};
