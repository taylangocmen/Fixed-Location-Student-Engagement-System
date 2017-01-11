#include <Poco/JSON/Object.h>
#include <Poco/DateTime.h>
#include <Poco/DateTimeFormatter.h>
#include <Poco/DateTimeFormat.h>
#include <Poco/Data/RecordSet.h>
#include <Poco/Data/Time.h>

#include "request_handler.h"
#include "auth.h"

using namespace Poco::Data::Keywords;

const std::unordered_map<
  std::string, std::unordered_map<std::string, HandlerFunc>
> RequestHandler::HANDLERS = {
    {"GET", {
        {"/login", &RequestHandler::handleLogin}
      }
    },
    {"POST", {
        {"/updateWifiInfo", &RequestHandler::handleUpdateWifiInfo}
      }
    }
  };

RequestHandler::RequestHandler(DBManager &dbManager)
 : _dbManager(dbManager) {
}

void RequestHandler::handleRequest(Poco::Net::HTTPServerRequest &request,
                                   Poco::Net::HTTPServerResponse &response) {
  try {
    response.setContentType("text/json");

    bool unknownEndpoint = true;

    auto outer_iter = HANDLERS.find(request.getMethod());
    if (outer_iter != HANDLERS.end()) {
      Poco::URI uri(request.getURI());

      auto iter = outer_iter->second.find(uri.getPath());

      // Call the handler if it was found
      if (iter != outer_iter->second.end()) {
        (this->*iter->second)(uri, request, response);

        unknownEndpoint = false;
      }
    }

    if (unknownEndpoint) {
      errorResponse(response, "Unknown endpoint");
    }
  } catch (Poco::Data::SessionPoolExhaustedException e) {
    std::cout << "Caught Poco::Data::SessionPoolExhaustedException: " << e.displayText() << std::endl;
  } catch (Poco::Exception e) {
    std::cout << "Caught Poco::Exception: " << e.displayText() << std::endl;
  } catch (std::exception e) {
    std::cout << "Caught std::exception: " << e.what() << std::endl;
  } catch (...) {
    std::cout << "An unknown error occurred" << std::endl;
  }
}

void RequestHandler::errorResponse(Poco::Net::HTTPServerResponse &response,
                                   std::string errorMessage) {
  // Send the error message as a JSON object
  Poco::JSON::Object::Ptr obj = new Poco::JSON::Object();
  obj->set("error", errorMessage);
  obj->stringify(response.send());
}

bool RequestHandler::validateSessionToken(
    const Poco::URI &uri,
    Poco::Net::HTTPServerResponse &response) {
  bool ret = false;

  // Get the session token from the URI parameters
  std::string sessionToken;
  bool foundToken = false;
  for (auto pair : uri.getQueryParameters()) {
    if (pair.first == "session_token") {
      sessionToken = pair.second;
      foundToken = true;
      break;
    }
  }

  if (foundToken) {
    // Get a db session
    auto sess = _dbManager.get();

    std::time_t sessionTokenExpiry;
    auto stmt = (sess.first << "select session_token_expiry from users where session_token=?",
      use(sessionToken), into(sessionTokenExpiry), now);
    Poco::Data::RecordSet rs(stmt);

    // The session token is valid if there is a user that corresponds to it
    // and if the token is not expired
    ret = rs.totalRowCount() == 1 && sessionTokenExpiry > Poco::Timestamp().epochTime();
  }

  // Send an error response if the session token was invalid
  if (!ret) {
    errorResponse(response, "Invalid session token");
  }
  return ret;
}

