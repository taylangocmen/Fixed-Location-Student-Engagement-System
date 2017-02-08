CREATE TABLE IF NOT EXISTS ece496.enrol (
  user_id INTEGER,
  course_id INTEGER,
  date_joined TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES ece496.users(id),
  FOREIGN KEY (course_id) REFERENCES ece496.courses(id)
);

