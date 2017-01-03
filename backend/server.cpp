#include <ctime>
#include <iostream>
#include <string>

#include "server.h"

Server::Server(boost::asio::io_service &io_service, int port)
  : _io_service(io_service),
    _context(ssl::context::tlsv12_server),
    _port(port),
    _acceptor(_io_service, tcp::endpoint(tcp::v4(), _port))
{
  _context.set_password_callback([] (size_t, ssl::context::password_purpose)
                                 {
                                    return "password";
                                 });
  _context.use_certificate_chain_file("server.pem");
  _context.use_private_key_file("server.pem", ssl::context::pem);
}

void Server::start()
{
  _connections.emplace(
    std::make_pair(_currentId,
                   std::make_shared<Connection>(*this, _currentId)));
  auto connection = _connections[_currentId++];

  // Asynchronously accept a connection
  _acceptor.async_accept(connection->getSock(),
                         [this, connection] (const boost::system::error_code &e)
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

void Server::removeConnection(unsigned int id)
{
  _connections.erase(id);
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

