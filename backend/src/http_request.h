#ifndef HTTP_REQUEST_H
#define HTTP_REQUEST_H

#include <string>
#include <unordered_map>

class HTTPRequest
{
public:
  HTTPRequest(std::string str);

  const std::string &getMethod() { return _method; }
  const std::string &getURL() { return _url; }
  const std::string &getVersion() { return _version; }
  const std::unordered_map<std::string, std::string> &getHeaders() { return _headers; }
  const std::string &getBody() { return _body; }

private:
  std::string _method;
  std::string _url;
  std::string _version;
  std::unordered_map<std::string, std::string> _headers;
  std::string _body;

};

#endif

