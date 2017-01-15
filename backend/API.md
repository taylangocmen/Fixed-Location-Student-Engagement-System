# API

This document describes the backend API. Specifically, it defines the HTTP method, request, and response for each endpoint.

## Use 

#### POST /registration
    Headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + *session_token*,
       // session_token is null if user is not logged in
    }
    Body: {
      "first_name": string,
      "last_name": string,
      "email": string,
      "utorid": string,
      "pass_hash": string,
    }
    Response: {
    }

#### POST /login
    Headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + *session_token*,
      // session_token is null if user is not logged in

    }
    Body: {
      "email": string,
      "pass_hash": string,
    }
    Response: {
      "session_token": string,
    }

#### GET /courses
    Headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + *session_token*,
    }
    Body: {
      "email": string,
    }
    Response: {
      "courses_registered": {
        *course_id*: {
          "course_name": string,
          "course_desc": string,
          "active_questions": {
            *question_id*: {
              "type": string, // valid types need to be decided, lets accept multiple choice for now
              "date": string,
              "body": string,
              "options": {
                //this is the example for the multiple choice question
                "a": string
                "b": string
                "c": string
                "d": string
                ...
              },
              "answer": {
                //this should be empty for an active question
              }
            },
            *question_id*: {
              ...
            }
            ...
          }
          "inactive_questions": {
            *question_id*: {
              ...
              "answer": {
                *correct_option*: string
              }
            }
            ...
        }
        *course_id*: {
          ...
        }
        ...
      },
      "courses_expired": {
        ...
      }
    }
