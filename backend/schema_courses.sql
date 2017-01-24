CREATE TABLE IF NOT EXISTS ece496.courses (
  id INTEGER PRIMARY KEY AUTO_INCREMENT, # id of the section
  prof_id INTEGER NOT NULL, # prof id
  course_name VARCHAR(30) NOT NULL, #classes should have names, right?
  course_desc VARCHAR(255) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE, # Whether the course is active
  time_created TIMESTAMP,
  latitude FLOAT, # location of the class
  longitude FLOAT,
  time_loc TIMESTAMP, #time when the location was last updated
  radius FLOAT,
  FOREIGN KEY(prof_id) REFERENCES ece496.users(id)
);
