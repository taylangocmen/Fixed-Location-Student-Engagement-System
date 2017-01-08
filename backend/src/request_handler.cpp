#include <Poco/JSON/Object.h>
#include <Poco/DateTime.h>
#include <Poco/DateTimeFormatter.h>
#include <Poco/DateTimeFormat.h>

#include "request_handler.h"
#include "auth.h"

const std::unordered_map<std::string, HandlerFunc> RequestHandler::HANDLERS = {
    std::make_pair<std::string, HandlerFunc>(
      "/login", &RequestHandler::handleLogin)
  };

RequestHandler::RequestHandler(Poco::Data::SessionPool &sessionPool)
 : _sessionPool(sessionPool) {
}

void RequestHandler::handleRequest(Poco::Net::HTTPServerRequest &request,
                                   Poco::Net::HTTPServerResponse &response) {
  response.setContentType("text/json");

  // Search for the handler for this URI
  Poco::URI uri(request.getURI());
  auto iter = HANDLERS.find(uri.getPath());

  // Call the handler if it was found
  if (iter != HANDLERS.end()) {
    (this->*iter->second)(uri, request, response);
  } else {
    errorResponse(response, "Unknown endpoint");
  }
}

void RequestHandler::errorResponse(Poco::Net::HTTPServerResponse &response,
                                   std::string errorMessage) {
  // Send the error message as a JSON object
  Poco::JSON::Object::Ptr obj = new Poco::JSON::Object();
  obj->set("error", errorMessage);
  obj->stringify(response.send());
}

void RequestHandler::handleLogin(const Poco::URI &uri,
                                 Poco::Net::HTTPServerRequest &request,
                                 Poco::Net::HTTPServerResponse &response) {
  auto params = uri.getQueryParameters();

  bool foundUsername = false;
  std::string username;

  bool foundPasshash = false;
  std::string passhash;
  for (auto pair : params) {
    if (pair.first == "username") {
      foundUsername = true;
      username = pair.second;
    }
    if (pair.first == "passhash") {
      foundPasshash = true;
      passhash = pair.second;
    }
  }

  if (foundUsername && foundPasshash) {
    std::string sessionToken;
    // Check the user's credentials, and assign a sessionToken if successful
    if (Auth::authenticate(_sessionPool, username, passhash, sessionToken)) {
      Poco::JSON::Object::Ptr obj = new Poco::JSON::Object();
      obj->set("session_token", sessionToken);
      obj->stringify(response.send());
    } else {
      errorResponse(response, "Invalid username or password");
    }
  } else {
    errorResponse(response, "Missing username or password");
  }
}

