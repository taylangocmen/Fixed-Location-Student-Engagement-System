CREATE TABLE IF NOT EXISTS ece496.submissions (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  time_recieved TIMESTAMP, #server time when the answer is recieved
  course_id INTEGER,
  question_id INTEGER,
  user_id INTEGER,
  device_id VARCHAR(255),
  device_list LONGTEXT,
  answer INTEGER, # stores the multiple choice number selected (2-8)
  accepted BOOLEAN DEFAULT FALSE, # whether or not the answer was rejected based on location at the time recieved
  
  FOREIGN KEY(course_id) REFERENCES ece496.courses(id),
  FOREIGN KEY(question_id) REFERENCES ece496.questions(id),
  FOREIGN KEY(user_id) REFERENCES ece496.users(id),
);

