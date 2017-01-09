#include <Poco/JSON/Object.h>
#include <Poco/JSON/Parser.h>

#include "request_handler.h"
#include "update_wifi_info.h"

void RequestHandler::handleUpdateWifiInfo(
    const Poco::URI &uri,
    Poco::Net::HTTPServerRequest &request,
    Poco::Net::HTTPServerResponse &response) {
  // Ensure that a valid session token is provided
  if (validateSessionToken(uri, response)) {
    Poco::JSON::Parser parser;
    bool validJSON = true;
    try {
      auto object = parser.parse(request.stream()).extract<Poco::JSON::Object::Ptr>();
      validJSON &= object->has("wifiAccessPoints");
      auto wifiAccessPoints = object->get("wifiAccessPoints").extract<Poco::JSON::Array::Ptr>();
      for (auto wifiAccessPoint : *wifiAccessPoints) {
        validJSON &= wifiAccessPoint.extract<Poco::JSON::Object::Ptr>()->has("macAddress");
      }
    } catch (Poco::JSON::JSONException e) {
      validJSON = false;
    }

    if (validJSON) {
      // TODO: send requests to the Google geolocation API with the request data
      // TODO: send a proper response
      response.send() << "{}";
    } else {
      errorResponse(response, "Malformed JSON");
    }
  }
}

