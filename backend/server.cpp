#include <ctime>
#include <iostream>
#include <string>

#include "server.h"

Server::Server(boost::asio::io_service &io_service, int port)
  : _io_service(io_service),
    _port(port),
    _acceptor(_io_service, tcp::endpoint(tcp::v4(), _port))
{
}

void Server::start()
{
  auto connection = std::make_shared<Connection>(_io_service);

  // Asynchronously accept a connection
  _acceptor.async_accept(connection->getSock(),
                         [&] (const boost::system::error_code &e)
                         {
                            std::cout << "CLIENT CONNECTED!" << std::endl;

                            // Initiate another async accept
                            start();

                            if (!e)
                            {
                              connection->handle();
                            }
                         });
}

std::string make_daytime_string()
{
  using namespace std; // For time_t, time and ctime;
  time_t now = time(0);
  return ctime(&now);
}

int main()
{
  try
  {
    boost::asio::io_service io_service;
    Server s(io_service, 9999);
    s.start();
    io_service.run();
  }
  catch (std::exception& e)
  {
    std::cerr << e.what() << std::endl;
  }

  return 0;
}

