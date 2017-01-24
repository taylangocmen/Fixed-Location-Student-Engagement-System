CREATE TABLE IF NOT EXISTS ece496.questions (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  course_id INTEGER NOT NULL,
  title VARCHAR(64) NOT NULL,
  question_text VARCHAR(255) NOT NULL,
  correct_answer INTEGER NOT NULL,
  num_answers INTEGER NOT NULL,
  answers_array LONGTEXT NOT NULL,
  asked BOOLEAN NOT NULL DEFAULT FALSE,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  timeout INTEGER NOT NULL,
  time_created TIMESTAMP NOT NULL,
  time_opened TIMESTAMP DEFAULT NULL,
  time_closed TIMESTAMP DEFAULT NULL,
  FOREIGN KEY(course_id) REFERENCES ece496.courses(id)
);

