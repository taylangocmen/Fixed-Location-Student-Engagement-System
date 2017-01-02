#ifndef SERVER_H
#define SERVER_H

#include <unordered_map>
#include <boost/asio.hpp>

#include "connection.h"

using boost::asio::ip::tcp;

class Server
{
public:
  Server(boost::asio::io_service &io_service, int port);

  void start();

  void removeConnection(unsigned int id);

  boost::asio::io_service &get_io_service() { return _io_service; }

private:
  boost::asio::io_service &_io_service;
  int _port;
  unsigned int _currentId = 0;
  tcp::acceptor _acceptor;
  std::unordered_map<
    unsigned int, std::shared_ptr<Connection>
  > _connections;
};

#endif

