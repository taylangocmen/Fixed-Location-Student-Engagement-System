CREATE TABLE IF NOT EXISTS ece496.users (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(20) NOT NULL,
  pass_hash VARCHAR(20) NOT NULL,
  name VARCHAR(63),
  email VARCHAR(127),
  session_token VARCHAR(20),
  session_token_expiry BIGINT,
  is_prof BOOLEAN,
  time_joined BIGINT,
  latitude FLOAT,
  longitude FLOAT,
  time_loc TIMESTAMP
);

