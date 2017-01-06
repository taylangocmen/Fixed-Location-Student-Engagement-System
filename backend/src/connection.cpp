#include "connection.h"
#include "server.h"
#include "http_request.h"
#include "json.hpp"

using json = nlohmann::json;

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
    std::cout << "Connection terminated due to error."
              << " Message: " << error.message()
              << " Value: " << error.value() << std::endl;
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

        std::string msg = "{}";

        // TODO: only accept POST and GET requests, write a proper request handler
        // that takes an HTTPRequest and returns an HTTPResponse
        // The URL parameter will specify what operation should be made
        try
        {
          auto json = json::parse(request.getBody());
          msg = json.dump();
        }
        catch (std::exception &e)
        {
          std::cout << e.what() << std::endl;
        }

        doWrite(HTTPResponse(200, false, msg));
      }
    };

  // Asynchronously read data
  _sock.async_read_some(boost::asio::buffer(_buf), handler);
}

void Connection::doWrite(HTTPResponse response)
{
  std::string msg = response.dump();
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

