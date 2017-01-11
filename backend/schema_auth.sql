CREATE TABLE IF NOT EXISTS ece496.users (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  username TEXT NOT NULL,
  pass_hash TEXT NOT NULL,
  session_token TEXT,
  session_token_expiry BIGINT,
  time_joined BIGINT,
  latitude REAL,
  longitude REAL,
  time_loc BIGINT -- stored as a reference to the unix epoch
);

