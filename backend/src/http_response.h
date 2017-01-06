#ifndef HTTP_RESPONSE_H
#define HTTP_RESPONSE_H

#include <string>
#include <unordered_map>

class HTTPResponse
{
public:
  HTTPResponse(unsigned int statusCode,
               bool closeConnection,
               std::string body);

  std::string dump();

private:
  static const std::unordered_map<unsigned int, std::string> STATUS_CODES;

  unsigned int _statusCode;
  bool _closeConnection;
  std::string _body;

};

#endif

