#include "connection.h"

Connection::Connection(boost::asio::io_service &io_service)
  : _sock(io_service)
{
}

void Connection::handle()
{
  // TODO: this should initiate a series of async read and writes,
  // which will keep the connection alive even though the thread
  // will exit this function
}
