CREATE TABLE IF NOT EXISTS ece496.enrol (
  user_id INTEGER,
  class_id INTEGER,
  date_joined TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES ece496.users(id),
  FOREIGN KEY (class_id) REFERENCES ece496.class(id)
);

