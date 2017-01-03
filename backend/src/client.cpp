#include <iostream>
#include <boost/array.hpp>
#include <boost/asio.hpp>
#include <boost/asio/ssl.hpp>

using boost::asio::ip::tcp;
namespace ssl = boost::asio::ssl;
typedef ssl::stream<tcp::socket> ssl_socket;

int main(int argc, char* argv[])
{
  try
  {
    boost::asio::io_service io_service;

    tcp::resolver resolver(io_service);
    tcp::endpoint endpoint(tcp::v4(), 9999);

    tcp::socket socket(io_service);
    boost::system::error_code error = boost::asio::error::host_not_found;
    while (error)
    {
      socket.close();
      socket.connect(endpoint, error);
    }
    if (error)
      throw boost::system::system_error(error);

    for (;;)
    {
      boost::array<char, 128> buf;
      boost::system::error_code error;
      std::string s = "HELLO!";
      boost::asio::write(socket, boost::asio::buffer(s),
           boost::asio::transfer_all(), error);

      size_t len = socket.read_some(boost::asio::buffer(buf), error);

      if (error == boost::asio::error::eof)
        break; // Connection closed cleanly by peer.
      else if (error)
        throw boost::system::system_error(error); // Some other error.

      std::cout.write(buf.data(), len);
    }
  }
  catch (std::exception& e)
  {
    std::cerr << e.what() << std::endl;
  }

  return 0;
}

