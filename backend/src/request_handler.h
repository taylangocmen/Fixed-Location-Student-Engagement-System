#ifndef REQUEST_HANDLER_H
#define REQUEST_HANDLER_H

#include <unordered_map>
#include <string>

#include <Poco/URI.h>
#include <Poco/Data/SessionPool.h>
#include <Poco/Net/HTTPRequestHandler.h>
#include <Poco/Net/HTTPServerRequest.h>
#include <Poco/Net/HTTPServerResponse.h>

class RequestHandler;

typedef void (RequestHandler::*HandlerFunc)(const Poco::URI &,
                                            Poco::Net::HTTPServerRequest &,
                                            Poco::Net::HTTPServerResponse &);

class RequestHandler : public Poco::Net::HTTPRequestHandler
{
public:
  RequestHandler(Poco::Data::SessionPool &sessionPool);

  void handleRequest(Poco::Net::HTTPServerRequest &request,
                     Poco::Net::HTTPServerResponse &response);

private:
  static const std::unordered_map<std::string, HandlerFunc> HANDLERS;

  Poco::Data::SessionPool &_sessionPool;

  static void errorResponse(Poco::Net::HTTPServerResponse &response,
                            std::string errorMessage);

  void handleLogin(const Poco::URI &uri,
                   Poco::Net::HTTPServerRequest &request,
                   Poco::Net::HTTPServerResponse &response);

};

#endif

