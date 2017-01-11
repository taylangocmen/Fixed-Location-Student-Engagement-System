#ifndef DB_SESSION_H
#define DB_SESSION_H

#include <mutex>

#include <Poco/Data/SessionPool.h>

class DBManager {
public:
  DBManager(const std::string &connector,
            const std::string &connectionString);

  std::pair<Poco::Data::Session, std::unique_lock<std::mutex>> get();

private:
  Poco::Data::SessionPool _sessionPool;
  std::mutex _sessionMutex;

};

#endif

