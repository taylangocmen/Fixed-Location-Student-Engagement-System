#ifndef SERVER_H
#define SERVER_H

#include <boost/asio.hpp>

#include "connection.h"

using boost::asio::ip::tcp;

class Server {
public:
  Server(boost::asio::io_service &io_service, int port);

  void start();

private:
  boost::asio::io_service &_io_service;
  int _port;
  tcp::acceptor _acceptor;
};

#endif

