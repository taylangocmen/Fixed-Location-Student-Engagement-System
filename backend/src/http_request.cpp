#include "http_request.h"

/*
 * Uses std::string::find_first_of to find the first occurence (after offset
 * {@param start}) of one of the characters in {@param search}. Then,
 * {@param start} is incremented to point to the character after the one that
 * was matched in {@param search}. The string of characters between
 * {@param start} and the first character in {@param search} is returned,
 * excluding the character that was matched.
 */
std::string parse(const std::string &request, std::string search, size_t &start)
{
  // Find the first matching character
  size_t end = request.find_first_of(search, start);
  if (end != std::string::npos)
  {
    // Take the substring and increment start
    auto ret = request.substr(start, end - start);
    start += end - start + 1;
    return ret;
  }
  // No character was found
  return "";
}

HTTPRequest::HTTPRequest(std::string request)
{
  for (auto iter = request.begin(); iter != request.end(); iter++)
  {
    if (*iter == '\r')
    {
      iter = request.erase(iter);
    }
  }

  size_t index = 0;

  // Parse the first line of the HTTP header
  _method = parse(request, " \n", index);
  _url = parse(request, " \n", index);
  _version = parse(request, "\n", index);

  // Parse the rest of the header
  while (request[index] != '\n' && index < request.length())
  {
    // Parse key and value as "key: value\n"
    std::string key = parse(request, ":", index);
    index += 1;
    std::string value = parse(request, "\n", index);
    // Insert into the unordered_map
    _headers[key] = value;
  }

  // Skip the '\n' that signals the end of the header
  index++;

  if (index < request.length())
  {
    // The rest of the request is the body
    _body = request.substr(index);
  }
}
