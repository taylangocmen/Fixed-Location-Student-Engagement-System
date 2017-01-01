#ifndef CONNECTION_H
#define CONNECTION_H

#include <boost/asio.hpp>

using boost::asio::ip::tcp;

class Connection {
public:
  Connection(boost::asio::io_service &io_service);

  void handle();

  tcp::socket &getSock() { return _sock; }

private:
  tcp::socket _sock;
};

#endif

