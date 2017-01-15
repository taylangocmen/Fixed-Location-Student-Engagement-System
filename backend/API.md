# API

This document describes the backend API. Specifically, it defines the HTTP method, request, and response for each endpoint.

## Use 

#### POST /registration
```
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
```

#### POST /login
```
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
```

#### POST /answer

This endpoint is used by students to answer questions.

```
Headers: {
	"Accept": "application/json",
	"Content-Type": "application/json",
	"Authorization": "Bearer " + *session_token*,
}
Body: {
	"course_id": int,
	"question_id": int,
	"answer": string,
	"nearby_devices": {
		"bluetooth": [
			{
				"address": string,
				"name": string
			},
			...
		],
		"wifi": [
			{
				"address": string,
				"signal": int
			},
			...
		]
	}
}
Response: {
}
```

#### POST /question

This endpoint is used by instructors to pose questions. TODO

```
Headers: {
	"Accept": "application/json",
	"Content-Type": "application/json",
	"Authorization": "Bearer " + *session_token*,
}
Body: {
	"timeout": int,
	"ask_immediately": bool,
	... (TODO)
}
Response: {
	"question_id": int
}
```

#### UPDATE /question

This endpoint is used by instructors to initiate questions that were created
with `ask_immediately=false`.
TODO: could also allow instructors to modify a question.

```
Headers: {
	"Accept": "application/json",
	"Content-Type": "application/json",
	"Authorization": "Bearer " + *session_token*,
}
Body: {
	"question_id": int
}
Response: {
}
```

#### GET /courses
```
Headers: {
	"Accept": "application/json",
	"Content-Type": "application/json",
	"Authorization": "Bearer " + *session_token*,
}
Body: {
	"email": string,
}
Response: {
	"courses_registered": [
		{
			"course_id": int,
			"course_name": string,
			"course_desc": string,
			"active_questions": [
				{
					"question_id": int,
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
				...
			]
			"inactive_questions": {
				*question_id*: {
					...
					"answer": {
						*correct_option*: string
					}
				}
				...
			}
		},
		...
	],
	"courses_expired": {
		...
	}
}
```

