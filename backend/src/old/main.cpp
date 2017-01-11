#include <iostream>
#include <mutex>

#include <Poco/Data/SessionPool.h>
#include <Poco/Data/SQLite/Connector.h>
#include <Poco/Net/HTTPServer.h>
#include <Poco/Net/HTTPServerParams.h>
#include <Poco/Net/SecureServerSocket.h>
#include <Poco/Util/ServerApplication.h>

#include "request_handler.h"
#include "db_manager.h"

#define SERVER_PORT 9999
#define MAX_QUEUED_CONNECTIONS 100
#define MAX_THREADS 16

#define DB_TYPE "SQLITE"
#define DB_NAME "database.db"

class HTTPRequestHandlerFactory : public Poco::Net::HTTPRequestHandlerFactory {
public:
  HTTPRequestHandlerFactory(DBManager &dbManager)
    : _dbManager(dbManager) {
  }

  Poco::Net::HTTPRequestHandler *createRequestHandler(
      const Poco::Net::HTTPServerRequest &request) {
    return new RequestHandler(_dbManager);
  }

private:
  DBManager &_dbManager;

};

class Server : public Poco::Util::ServerApplication {
public:
  Server() {
    // Initialize SSL
    Poco::Net::initializeSSL();
  }

  ~Server() {
    // Uninitialize SSL
    Poco::Net::uninitializeSSL();
  }

protected:
  void initialize(Application &self) {
    // Load {filename}.properties config file
    loadConfiguration();

    Poco::Data::SQLite::Connector::registerConnector();
    _dbManager = new DBManager(DB_TYPE, DB_NAME);

    ServerApplication::initialize(self);
  }

  void uninitialize() {
    delete _dbManager;

    ServerApplication::uninitialize();
  }

  int main(const std::vector<std::string> &args) {
    Poco::Net::SecureServerSocket socket(SERVER_PORT);

    Poco::Net::HTTPServerParams *params = new Poco::Net::HTTPServerParams();
    params->setMaxQueued(MAX_QUEUED_CONNECTIONS);
    params->setMaxThreads(MAX_THREADS);

    Poco::Net::HTTPServer server(
      new HTTPRequestHandlerFactory(*_dbManager),
      socket,
      params);

    server.start();

    // Wait for interrupt
    waitForTerminationRequest();

    server.stop();

    return EXIT_OK;
  }

private:
  DBManager *_dbManager;

};

POCO_SERVER_MAIN(Server);

