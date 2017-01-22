CREATE TABLE IF NOT EXISTS ece496.users (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  pass_hash VARCHAR(20) NOT NULL,
  first_name VARCHAR(63) NOT NULL,
  last_name VARCHAR(63) NOT NULL,
  email VARCHAR(127) NOT NULL,
  utorid VARCHAR(20) NOT NULL,
  session_token TEXT,
  session_token_expiry BIGINT,
  is_prof BOOLEAN DEFAULT FALSE,
  create_courses BOOLEAN DEFAULT FALSE,
  time_joined BIGINT,
  latitude FLOAT,
  longitude FLOAT,
  time_loc TIMESTAMP
);

