#include "connection.h"
#include "server.h"

Connection::Connection(Server &server, unsigned int id)
  : _server(server), _sock(server.get_io_service()), _id(id)
{
}

void Connection::handle()
{
  _sock.async_read_some(boost::asio::buffer(_buf),
                        [this] (const boost::system::error_code& error,
                            size_t bytes_transferred) {
                          handleRead(error, bytes_transferred);
                        });
  // TODO: this should initiate a series of async read and writes,
  // which will keep the connection alive even though the thread
  // will exit this function
}

void Connection::handleRead(const boost::system::error_code& error,
                            size_t bytes_transferred)
{
  if (!error)
  {
    std::cout << _buf << std::endl;
  }
  else
  {
    std::cout << "error receiving" << std::endl;
    _server.removeConnection(_id);
  }
}

void Connection::handleWrite(const boost::system::error_code& error,
                             size_t bytes_transferred)
{
}

