#ifndef AUTH_H
#define AUTH_H

#include <mutex>

#include <Poco/Data/SessionPool.h>

#include "db_manager.h"

class Auth {
public:
  static bool authenticate(DBManager &dbManager,
                           std::string username,
                           std::string passhash,
                           std::string &sessionToken);

private:

};

#endif

