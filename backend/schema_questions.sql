CREATE TABLE IF NOT EXISTS ece496.questions (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  course_id INTEGER,
  weight INTEGER, #optional question weight
  title VARCHAR(64), # short title for question.
  num_qs INTEGER, #the number of answers (for multiple choice) 2-8
  question LONGTEXT,
  ans_1 VARCHAR(255), # for text based answers, use ans_1 to hold the correct answer
  ans_2 VARCHAR(255),
  ans_3 VARCHAR(255),
  ans_4 VARCHAR(255),
  ans_5 VARCHAR(255),
  ans_6 VARCHAR(255),
  ans_7 VARCHAR(255),
  ans_8 VARCHAR(255),
  correct_ans_mc INTEGER, # the integer value of the correct answer (2-8) in the case of multiple choice
  asked BOOLEAN NOT NULL DEFAULT FALSE,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  timeout INTEGER,
  time_created TIMESTAMP,
  time_opened TIMESTAMP, # soonest time when the prof opened the question
  time_closed TIMESTAMP, # time when the prof closed the question
  FOREIGN KEY(course_id) REFERENCES ece496.courses(id)
);

