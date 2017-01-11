CREATE TABLE IF NOT EXISTS ece496.enrol (
  user_id INTEGER,
  class_id INTEGER,
  date_joined INTEGER, -- stored as a reference to the unix epoch
  FOREIGN KEY (user_id) REFERENCES ece496.users(id),
  FOREIGN KEY (class_id) REFERENCES ece496.class(id)
);

