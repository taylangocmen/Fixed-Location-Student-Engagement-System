CREATE TABLE IF NOT EXISTS prof (
  id INTEGER PRIMARY KEY autoincrement,
  username TEXT NOT NULL,
  pass_hash TEXT NOT NULL,
  session_token TEXT
);

