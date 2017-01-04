#ifndef HTTP_HANDLER_H
#define HTTP_HANDLER_H

#include <string>
#include <unordered_map>

class HTTPHeader
{
public:
  std::string method;
  std::string url;
  std::string version;
  std::unordered_map<std::string, std::string> values;
};

class HTTPHandler
{
public:
  static HTTPHeader parseHeader(std::string request);
private:
};

#endif

