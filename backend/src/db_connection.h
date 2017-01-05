#ifndef DB_CONNECTION_H
#define DB_CONNECTION_H

#include <string>

class DBStatement;

class DBConnection
{
public:
  DBConnection(const char *filename);
  ~DBConnection();

  void prepare(const char *sql, DBStatement &stmt);

private:
};

class DBStatement
{
public:
  DBStatement();
  ~DBStatement();

  void execute();

private:
};

#endif

