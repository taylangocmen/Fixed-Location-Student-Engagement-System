CREATE TABLE IF NOT EXISTS ece496.class (
  id INTEGER PRIMARY KEY AUTO_INCREMENT, -- id of the section
  prof_id INTEGER NOT NULL, -- prof id
  sizeof INTEGER NOT NULL, -- number of students in the class
  time_created INTEGER, -- stored as a reference to the unix epoch
  latitude REAL, -- location of the class
  longitude REAL,
  time_loc INTEGER, -- stored as a reference to the unix epoch
  radius REAL, 
  FOREIGN KEY(prof_id) REFERENCES ece496.users(id)
);

