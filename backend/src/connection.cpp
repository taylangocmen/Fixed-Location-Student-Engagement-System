#include "connection.h"
#include "server.h"
#include "http_request.h"

Connection::Connection(Server &server, unsigned int id)
  : _server(server),
    _sock(server.get_io_service(), server.get_ssl_context()),
    _id(id)
{
}

bool Connection::handleError(const boost::system::error_code &error)
{
  if (error)
  {
    std::cout << "Connection terminated due to error: " << error.message() << std::endl;
    _server.removeConnection(_id);
  }
  return error;
}

void Connection::handle()
{
  auto handler =
    [this] (const boost::system::error_code &error)
    {
      if (!handleError(error))
      {
        doRead();
      }
    };

  // Asynchronously perform the SSL handshake
  _sock.async_handshake(ssl_socket::server, handler);
}

void Connection::doRead()
{
  auto handler =
    [this] (const boost::system::error_code &error,
            size_t bytes_transferred)
    {
      if (!handleError(error))
      {
        HTTPRequest request(std::string(_buf, bytes_transferred));

        doWrite();
      }
    };

  // Asynchronously read data
  _sock.async_read_some(boost::asio::buffer(_buf), handler);
}

void Connection::doWrite()
{
  std::string msg = "TEST!";
  auto handler =
    [this] (const boost::system::error_code &error,
            size_t bytes_transferred)
    {
      if (!handleError(error))
      {
        doRead();
      }
    };

  // Asynchronously write data
  _sock.async_write_some(boost::asio::buffer(msg), handler);
}

