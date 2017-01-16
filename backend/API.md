This document describes the backend API. Specifically, it defines the HTTP
method, request, and response for each endpoint.

POST /registration
{
  "first_name": string,
  "last_name": string,
  "email": string,
  "utorid": string,
  "pass_hash": string
}
Response: {
}

POST /login
Request: {
  "username": string, # Either the user's utorid or email
  "pass_hash": string
}
Response: {
	"session_token": string
}

