CREATE TABLE IF NOT EXISTS class_id (
  id INTEGER PRIMARY KEY autoincrement, -- id of the section
  prof INTEGER NOT NULL, -- prof id
  sizeof INTEGER NOT NULL, -- number of students in the class
  time_created INTEGER, -- stored as a reference to the unix epoch
  
  -- location of the class
  latitude REAL,
  longitude REAL,
  time_loc INTEGER, -- stored as a reference to the unix epoch
  radius REAL, 
  FOREIGN KEY(prof) REFERENCES prof(id)
);

