CREATE TABLE IF NOT EXISTS ece496.submissions (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  time_recieved TIMESTAMP, #server time when the answer is recieved
  course_id INTEGER,
  question_id INTEGER,
  student_id INTEGER,
  device_id TEXT,
  device_list LONGTEXT,
  answer_mc INTEGER, # stores the multiple choice number selected (2-8)
  answer_text VARCHAR(255), # for text based answers
  FOREIGN KEY(course_id) REFERENCES ece496.courses(id),
  FOREIGN KEY(question_id) REFERENCES ece496.questions(id),
  FOREIGN KEY(student_id) REFERENCES ece496.users(id),
  
  /* Note on location storage: we should store location in users and 
   * reference to the present location at run time and decide then whether 
   * to accept the answer or not. If the answer isn't accepted, the flag
   * "accepted" should be set to false. The instantaneous location should
   * be stored with the submission.*/
  
  accepted BOOLEAN, # whether or not the answer was rejected based on location at the time recieved
  latitude FLOAT,
  longitude FLOAT
);

