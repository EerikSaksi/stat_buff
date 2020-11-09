DROP SCHEMA public CASCADE;
create schema public;
create table "group" (name varchar(32) not null primary key);
create table "user" (
  username varchar(32) not null primary key,
  groupName varchar(32) REFERENCES "group" ON DELETE CASCADE
);
CREATE INDEX ON "user" (groupName);
create table "userID" (
  googleID varchar(64) not null primary key,
  username varchar(32) REFERENCES "user" ON DELETE CASCADE
);

CREATE INDEX ON "userID" (username);
insert into
  "group" (name)
values
  ('Dream Team');
insert into
  "user" (username, groupName)
values
  ('orek', 'Dream Team');
insert into
  "userID" (username, googleID)
values
  ('orek', 'gID');
comment on table "userID" is E'@omit';
