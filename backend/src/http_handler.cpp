#include "http_handler.h"

std::string parse(const std::string &request, std::string search, size_t &start)
{
  size_t end = request.find_first_of(search, start);
  if (end != std::string::npos)
  {
    auto ret = request.substr(start, end - start);
    start += end - start + 1;
    return ret;
  }
  return "";
}

HTTPHeader HTTPHandler::parseHeader(std::string request)
{
  for (auto iter = request.begin(); iter != request.end(); iter++)
  {
    if (*iter == '\r')
    {
      iter = request.erase(iter);
    }
  }
  HTTPHeader ret;

  size_t index = 0;

  ret.method = parse(request, " \n", index);
  ret.url = parse(request, " \n", index);
  ret.version = parse(request, "\n", index);

  while (request[index] != '\n' && index < request.length())
  {
    std::string key = parse(request, ":", index);
    index += 1;
    std::string value = parse(request, "\n", index);
    ret.values[key] = value;
  }

  return ret;
}
