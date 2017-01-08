#ifndef AUTH_H
#define AUTH_H

#include <Poco/Data/SessionPool.h>

class Auth {
public:
  static bool authenticate(Poco::Data::SessionPool &pool,
                           std::string username,
                           std::string passhash,
                           std::string &sessionToken);

private:

};

#endif

