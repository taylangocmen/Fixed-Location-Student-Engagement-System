CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY autoincrement,
  username TEXT NOT NULL,
  pass_hash TEXT NOT NULL,
  session_token TEXT,
  time_joined INTEGER,
  
  --last known location
  latitude REAL,
  longitude REAL,
  time_loc INTEGER -- stored as a reference to the unix epoch
);

