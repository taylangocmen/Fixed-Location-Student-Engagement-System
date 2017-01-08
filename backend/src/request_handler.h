#ifndef REQUEST_HANDLER_H
#define REQUEST_HANDLER_H

#include <Poco/Net/HTTPRequestHandler.h>
#include <Poco/Net/HTTPServerRequest.h>
#include <Poco/Net/HTTPServerResponse.h>

class RequestHandler : public Poco::Net::HTTPRequestHandler
{
public:
  void handleRequest(Poco::Net::HTTPServerRequest &request,
                     Poco::Net::HTTPServerResponse &response);
};

#endif

