create table if not exists users (
  id integer primary key autoincrement,
  username varchar(20),
  pass_hash varchar(20),
  session_token varchar(20)
);

