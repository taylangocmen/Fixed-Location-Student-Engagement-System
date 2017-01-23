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
	"username": string,
	// either utorid or email
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
  "course_id": int,
	"question_id": int (Optional),
	"timeout": int,
	"ask_immediately": bool,
  "question": {
    "text": string,
    "correct_answer": int,
    "answers": [
      string,
      ...
    ]
  } (Optional only if question_id field is present)
}
Response: {
  "course_id": int,
	"question_id": int
}
```

#### GET /courses?username=*username*
```
Headers: {
	"Authorization": "Bearer " + *session_token*,
}
Body: {
	"username": string,
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
		},
		...
	],
	"courses_expired": {
		...
	}
}
```


#### GET /courses?course_id=*course_id*
```
Headers: {
	"Authorization": "Bearer " + *session_token*,
}
Body: {
	"username": string,
}
Response: {
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
	"inactive_questions": [
		{
			*question_id*: {
				...
			"answer": {
				*correct_option*: string
			}
		},
		...
	]
}
```
