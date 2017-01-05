#include "db_connection.h"
#include "soci/soci.h"
#include "soci/sqlite3/soci-sqlite3.h"
#include <iostream>

DBConnection::DBConnection(const char *filename)
{
  soci::session sess(soci::sqlite3, filename);
  std::string pass_hash;
  sess << "select pass_hash from users where username='braden';", soci::into(pass_hash);
  std::cout << pass_hash << std::endl;
}

DBConnection::~DBConnection()
{
}

void DBConnection::prepare(const char *sql, DBStatement &stmt)
{
}

DBStatement::DBStatement()
{
}

DBStatement::~DBStatement()
{
}

void DBStatement::execute()
{
}

