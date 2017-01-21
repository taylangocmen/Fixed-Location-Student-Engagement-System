CREATE TABLE IF NOT EXISTS ece496.users_courses (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  user_id INTEGER NOT NULL,
  course_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES ece496.users(id),
  FOREIGN KEY (course_id) REFERENCES ece496.courses(id)
);
