#include <iostream>

#include <Poco/HMACEngine.h>
#include <Poco/SHA1Engine.h>
#include <Poco/DateTime.h>
#include <Poco/Timespan.h>
#include <Poco/Data/RecordSet.h>
#include <Poco/Data/Time.h>
#include <Poco/JSON/Object.h>

#include "request_handler.h"
#include "auth.h"

using namespace Poco::Data::Keywords;

#define SESSION_TOKEN_PASSPHRASE "SP[2qD%zB/8u!nXUb-`Z"

bool Auth::authenticate(DBManager &dbManager,
                        std::string username,
                        std::string passhash,
                        std::string &sessionToken) {
  auto sess = dbManager.get();

  int id;
  auto stmt =
    (sess.first << "select id from users where username=? and pass_hash=?",
      use(username), use(passhash), into(id), now);

  Poco::Data::RecordSet rs(stmt);

  // If the statement was successful (the user's credentials are correct)
  if (rs.totalRowCount() == 1) {
    // Build a session token using an HMAC
    Poco::HMACEngine<Poco::SHA1Engine> engine(SESSION_TOKEN_PASSPHRASE);
    // Use the username, user id, and the current time to build the token
    engine.update(username);
    engine.update(std::to_string(id));
    engine.update(std::to_string(Poco::Timestamp().epochMicroseconds()));
    auto digest = engine.digest();
    sessionToken = Poco::DigestEngine::digestToHex(digest);

    // Make the session token expire in 1 day
    auto sessionTokenExpiry = (Poco::Timestamp() + Poco::Timespan(1, 0, 0, 0, 0)).epochTime();

    // TODO: make sure the session token is unique before assigning it
    stmt =
      (sess.first << "update users set session_token=?, session_token_expiry=? where id=?",
        use(sessionToken), use(sessionTokenExpiry), use(id), now);
    return true;
  } else {
    // Invalid username or password
    return false;
  }
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
    if (Auth::authenticate(_dbManager,
                           username,
                           passhash,
                           sessionToken)) {
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

