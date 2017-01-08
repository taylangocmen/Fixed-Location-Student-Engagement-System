#include <Poco/Net/HTTPServer.h>
#include <Poco/Net/HTTPRequestHandler.h>
#include <Poco/Net/HTTPServerParams.h>
#include <Poco/Net/HTTPServerRequest.h>
#include <Poco/Net/HTTPServerResponse.h>
#include <Poco/Util/ServerApplication.h>
#include <Poco/DateTime.h>
#include <Poco/DateTimeFormatter.h>
#include <Poco/DateTimeFormat.h>
#include <Poco/Net/SecureServerSocket.h>
#include <iostream>

class Handler : public Poco::Net::HTTPRequestHandler
{
public:
  void handleRequest(Poco::Net::HTTPServerRequest &request, Poco::Net::HTTPServerResponse &response)
  {
    response.setChunkedTransferEncoding(false);
    response.setContentType("text/html");

    Poco::DateTime now;
    std::string timeString(Poco::DateTimeFormatter::format(now, Poco::DateTimeFormat::SORTABLE_FORMAT));

    std::ostream& responseStream = response.send();
    responseStream << "<html><head><head><title>Simple HTTP Server</title></head>";
    responseStream << "<body><h1>Current Time</h1><p>";
    responseStream << ( timeString );
    responseStream << "</p></body></html>";
    std::cout << "Received request" << std::endl;
  }
};

class HandlerFactory : public Poco::Net::HTTPRequestHandlerFactory
{
public:
  Poco::Net::HTTPRequestHandler *createRequestHandler(const Poco::Net::HTTPServerRequest &request)
  {
    return new Handler();
  }
};

class Server : public Poco::Util::ServerApplication
{
public:
  Server()
  {
    Poco::Net::initializeSSL();
  }

  ~Server()
  {
    Poco::Net::uninitializeSSL();
  }

protected:
  void initialize(Application& self)
  {
    loadConfiguration(); // load default configuration files, if present
    ServerApplication::initialize(self);
  }

  int main(const std::vector<std::string> &args)
  {
    Poco::Net::SecureServerSocket socket(9999);
    Poco::Net::HTTPServerParams *pParams = new Poco::Net::HTTPServerParams();
    pParams->setMaxQueued(100);
    pParams->setMaxThreads(16);
    Poco::Net::HTTPServer server(new HandlerFactory(), socket, pParams);
    server.start();
    std::cout << "Server started!" << std::endl;
    waitForTerminationRequest();
    std::cout << "Stopping server!" << std::endl;
    server.stop();
    return EXIT_OK;
  }
};

POCO_SERVER_MAIN(Server);

