#include <sstream>

#include "http_response.h"

#define HTTP_VERSION "HTTP/1.1"

// HTTP status codes
const std::unordered_map<unsigned int, std::string> HTTPResponse::STATUS_CODES = {
  std::make_pair<unsigned int, std::string>(100, "Continue"),
  std::make_pair<unsigned int, std::string>(101, "Switching Protocols"),
  std::make_pair<unsigned int, std::string>(200, "OK"),
  std::make_pair<unsigned int, std::string>(201, "Created"),
  std::make_pair<unsigned int, std::string>(202, "Accepted"),
  std::make_pair<unsigned int, std::string>(203, "Non-Authoritative Information"),
  std::make_pair<unsigned int, std::string>(204, "No Content"),
  std::make_pair<unsigned int, std::string>(205, "Reset Content"),
  std::make_pair<unsigned int, std::string>(206, "Partial Content"),
  std::make_pair<unsigned int, std::string>(300, "Multiple Choices"),
  std::make_pair<unsigned int, std::string>(301, "Moved Permanently"),
  std::make_pair<unsigned int, std::string>(302, "Found"),
  std::make_pair<unsigned int, std::string>(303, "See Other"),
  std::make_pair<unsigned int, std::string>(304, "Not Modified"),
  std::make_pair<unsigned int, std::string>(305, "Use Proxy"),
  std::make_pair<unsigned int, std::string>(307, "Temporary Redirect"),
  std::make_pair<unsigned int, std::string>(400, "Bad Request"),
  std::make_pair<unsigned int, std::string>(401, "Unauthorized"),
  std::make_pair<unsigned int, std::string>(402, "Payment Required"),
  std::make_pair<unsigned int, std::string>(403, "Forbidden"),
  std::make_pair<unsigned int, std::string>(404, "Not Found"),
  std::make_pair<unsigned int, std::string>(405, "Method Not Allowed"),
  std::make_pair<unsigned int, std::string>(406, "Not Acceptable"),
  std::make_pair<unsigned int, std::string>(407, "Proxy Authentication Required"),
  std::make_pair<unsigned int, std::string>(408, "Request Time-out"),
  std::make_pair<unsigned int, std::string>(409, "Conflict"),
  std::make_pair<unsigned int, std::string>(410, "Gone"),
  std::make_pair<unsigned int, std::string>(411, "Length Required"),
  std::make_pair<unsigned int, std::string>(412, "Precondition Failed"),
  std::make_pair<unsigned int, std::string>(413, "Request Entity Too Large"),
  std::make_pair<unsigned int, std::string>(414, "Request-URI Too Large"),
  std::make_pair<unsigned int, std::string>(415, "Unsupported Media Type"),
  std::make_pair<unsigned int, std::string>(416, "Requested range not satisfiable"),
  std::make_pair<unsigned int, std::string>(417, "Expectation Failed"),
  std::make_pair<unsigned int, std::string>(500, "Internal Server Error"),
  std::make_pair<unsigned int, std::string>(501, "Not Implemented"),
  std::make_pair<unsigned int, std::string>(502, "Bad Gateway"),
  std::make_pair<unsigned int, std::string>(503, "Service Unavailable"),
  std::make_pair<unsigned int, std::string>(504, "Gateway Time-out"),
  std::make_pair<unsigned int, std::string>(505, "HTTP Version not supported:")
};

HTTPResponse::HTTPResponse(unsigned int statusCode,
                           bool closeConnection,
                           std::string body)
  : _statusCode(statusCode),
    _closeConnection(closeConnection),
    _body(body)
{
}

std::string HTTPResponse::dump()
{
  std::stringstream ss;

  auto iter = STATUS_CODES.find(_statusCode);

  ss << HTTP_VERSION << " "
     << _statusCode
     << (iter != STATUS_CODES.end() ? " " + iter->second : "")
     << std::endl;

  ss << "Content-Length: " << _body.length() << std::endl;
  ss << "Content-Type: text/json" << std::endl;
  ss << "Connection: " << (_closeConnection ? "Closed" : "Open") << std::endl;

  // End of header
  ss << std::endl;

  ss << _body;

  return ss.str();
}

