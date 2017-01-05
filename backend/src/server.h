#ifndef SERVER_H
#define SERVER_H

#include <unordered_map>
#include <boost/asio.hpp>
#include <boost/asio/ssl.hpp>

#include "connection.h"
#include "db_connection.h"

using boost::asio::ip::tcp;
namespace ssl = boost::asio::ssl;
typedef ssl::stream<tcp::socket> ssl_socket;

class Server
{
public:
  Server(boost::asio::io_service &io_service, int port);

  void start();

  void removeConnection(unsigned int id);

  boost::asio::io_service &get_io_service() { return _io_service; }
  ssl::context &get_ssl_context() { return _context; }

private:
  boost::asio::io_service &_io_service;
  ssl::context _context;
  int _port;
  unsigned int _currentId = 0;
  tcp::acceptor _acceptor;
  std::unordered_map<
    unsigned int, std::shared_ptr<Connection>
  > _connections;
  DBConnection _auth_db;

};

#endif

