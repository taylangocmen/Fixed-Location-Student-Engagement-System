POST /registration
{
  "name": string,
  "email": string,
  "utorid": string,
  "pass_hash": string
}

POST /login
{
  "email": string (optional), # One of {email, utorid} is mandatory
  "utorid": string (optional),
  "pass_hash": string
}
