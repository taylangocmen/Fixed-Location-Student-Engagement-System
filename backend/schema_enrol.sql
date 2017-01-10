CREATE TABLE IF NOT EXISTS enrol (
  user_id INTEGER,
  class_id INTEGER,
  date_joined INTEGER, -- stored as a reference to the unix epoch
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (class_id) REFERENCES class_id(id)
);

