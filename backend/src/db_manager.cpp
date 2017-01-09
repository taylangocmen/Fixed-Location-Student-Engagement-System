#include "db_manager.h"

#define DB_MIN_CONNECTIONS 0
#define DB_MAX_CONNECTIONS 1
#define DB_SESSION_TIMEOUT 1

DBManager::DBManager(const std::string &connector,
                     const std::string &connectionString)
  : _sessionPool(connector,
                 connectionString,
                 DB_MIN_CONNECTIONS,
                 DB_MAX_CONNECTIONS,
                 DB_SESSION_TIMEOUT) {
}

std::pair<Poco::Data::Session, std::unique_lock<std::mutex>> DBManager::get() {
  return std::make_pair(_sessionPool.get(),
                        std::unique_lock<std::mutex>(_sessionMutex));
}
