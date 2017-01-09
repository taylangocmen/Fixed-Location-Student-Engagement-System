#ifndef REQUEST_HANDLER_H
#define REQUEST_HANDLER_H

#include <unordered_map>
#include <string>
#include <mutex>

#include <Poco/URI.h>
#include <Poco/Data/SessionPool.h>
#include <Poco/Net/HTTPRequestHandler.h>
#include <Poco/Net/HTTPServerRequest.h>
#include <Poco/Net/HTTPServerResponse.h>

#include "db_manager.h"

class RequestHandler;

typedef void (RequestHandler::*HandlerFunc)(const Poco::URI &,
                                            Poco::Net::HTTPServerRequest &,
                                            Poco::Net::HTTPServerResponse &);

class RequestHandler : public Poco::Net::HTTPRequestHandler
{
public:
  RequestHandler(DBManager &dbManager);

  void handleRequest(Poco::Net::HTTPServerRequest &request,
                     Poco::Net::HTTPServerResponse &response);

private:
  static const std::unordered_map<std::string, HandlerFunc> HANDLERS;

  DBManager &_dbManager;

  static void errorResponse(Poco::Net::HTTPServerResponse &response,
                            std::string errorMessage);

  void handleLogin(const Poco::URI &uri,
                   Poco::Net::HTTPServerRequest &request,
                   Poco::Net::HTTPServerResponse &response);

};

#endif

