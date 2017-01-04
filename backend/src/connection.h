#ifndef CONNECTION_H
#define CONNECTION_H

#include <boost/asio.hpp>
#include <boost/asio/ssl.hpp>

using boost::asio::ip::tcp;
namespace ssl = boost::asio::ssl;
typedef ssl::stream<tcp::socket> ssl_socket;

#define MAX_REQUEST_LENGTH 8192

class Server;

class Connection
{
public:
  Connection(Server &server, unsigned int id);

  bool handleError(const boost::system::error_code &error);

  void handle();
  void doRead();
  void doWrite();

  ssl_socket::lowest_layer_type &getSock() { return _sock.lowest_layer(); }

private:
  Server &_server;
  ssl_socket _sock;
  unsigned int _id;
  char _buf[MAX_REQUEST_LENGTH];
};

#endif

