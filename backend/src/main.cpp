#include "server.h"

int main()
{
  try
  {
    boost::asio::io_service io_service;
    Server s(io_service, 9999);
    s.start();
    io_service.run();
  }
  catch (std::exception& e)
  {
    std::cerr << e.what() << std::endl;
  }

  return 0;
}

