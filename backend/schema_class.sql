CREATE TABLE IF NOT EXISTS ece496.class (
  id INTEGER PRIMARY KEY AUTO_INCREMENT, # id of the section
  prof_id INTEGER NOT NULL, # prof id
  sizeof INTEGER NOT NULL, # number of students in the class
  time_created TIMESTAMP, 
  latitude FLOAT, # location of the class
  longitude FLOAT,
  time_loc TIMESTAMP, #time when the location was last updated
  radius FLOAT, 
  FOREIGN KEY(prof_id) REFERENCES ece496.users(id)
);

