#ifndef CONNECTION_H
#define CONNECTION_H

#include <boost/asio.hpp>

using boost::asio::ip::tcp;

class Server;

class Connection
{
public:
  Connection(Server &server, unsigned int id);

  void handle();

  void handleRead(const boost::system::error_code& error,
                  size_t bytes_transferred);
  void handleWrite(const boost::system::error_code& error,
                   size_t bytes_transferred);

  tcp::socket &getSock() { return _sock; }

private:
  Server &_server;
  tcp::socket _sock;
  unsigned int _id;
  char _buf[256];
};

#endif

