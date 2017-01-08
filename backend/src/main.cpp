#include <iostream>

#include <Poco/Net/HTTPServer.h>
#include <Poco/Net/HTTPServerParams.h>
#include <Poco/Net/SecureServerSocket.h>
#include <Poco/Util/ServerApplication.h>

#include "request_handler.h"

#define SERVER_PORT 9999
#define MAX_QUEUED_CONNECTIONS 100
#define MAX_THREADS 16

class HTTPRequestHandlerFactory : public Poco::Net::HTTPRequestHandlerFactory {
public:
  Poco::Net::HTTPRequestHandler *createRequestHandler(
      const Poco::Net::HTTPServerRequest &request) {
    return new RequestHandler();
  }
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
  void initialize(Application& self) {
    // Load {filename}.properties config file
    loadConfiguration();
    ServerApplication::initialize(self);
  }

  int main(const std::vector<std::string> &args) {
    Poco::Net::SecureServerSocket socket(SERVER_PORT);

    Poco::Net::HTTPServerParams *params = new Poco::Net::HTTPServerParams();
    params->setMaxQueued(MAX_QUEUED_CONNECTIONS);
    params->setMaxThreads(MAX_THREADS);

    Poco::Net::HTTPServer server(new HTTPRequestHandlerFactory(),
                                 socket,
                                 params);

    server.start();

    // Wait for interrupt
    waitForTerminationRequest();

    server.stop();

    return EXIT_OK;
  }
};

POCO_SERVER_MAIN(Server);

