#include <iostream>

#include <Poco/HMACEngine.h>
#include <Poco/SHA1Engine.h>
#include <Poco/Data/RecordSet.h>

#include "auth.h"

using namespace Poco::Data::Keywords;

#define SESSION_TOKEN_PASSPHRASE "SP[2qD%zB/8u!nXUb-`Z"

bool Auth::authenticate(DBManager &dbManager,
                        std::string username,
                        std::string passhash,
                        std::string &sessionToken) {
  auto sess = dbManager.get();

  int id;
  Poco::Data::Statement stmt =
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

    stmt =
      (sess.first << "update users set session_token=? where id=?",
        use(sessionToken), use(id), now);
    return true;
  } else {
    // Invalid username or password
    return false;
  }
}
