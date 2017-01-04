#ifndef HTTP_HANDLER_H
#define HTTP_HANDLER_H

#include <string>
#include <unordered_map>

class HTTPRequest
{
public:
  HTTPRequest(std::string str);

private:
  std::string method;
  std::string url;
  std::string version;
  std::unordered_map<std::string, std::string> headers;
  std::string body;

};

#endif

