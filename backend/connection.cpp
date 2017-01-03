#include "connection.h"
#include "server.h"

Connection::Connection(Server &server, unsigned int id)
  : _server(server),
    _sock(server.get_io_service(), server.get_ssl_context()),
    _id(id)
{
}

void Connection::handle()
{
  _sock.async_handshake(ssl_socket::server,
                        [this] (const boost::system::error_code &error)
                        {
                          if (!handleError(error))
                          {
                            doRead();
                          }
                        });
}

bool Connection::handleError(const boost::system::error_code &error)
{
  if (error)
  {
    std::cout << "Connection terminated due to error: " << error << std::endl;
    _server.removeConnection(_id);
  }
  return error;
}

void Connection::doRead()
{
  auto handler =
    [this] (const boost::system::error_code &error,
            size_t bytes_transferred)
    {
      if (!handleError(error))
      {
        std::cout << _buf << std::endl;
      }
    };

  _sock.async_read_some(boost::asio::buffer(_buf), handler);
}

void Connection::doWrite()
{
}

