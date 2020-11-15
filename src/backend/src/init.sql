DROP SCHEMA public CASCADE;
create schema public;
create table "group" (name tsvector not null primary key);
create table "user" (
  username varchar(32) not null primary key,
  groupName tsvector REFERENCES "group" ON DELETE CASCADE
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
  ('orek', '105395086988085655499');
comment on table "userID" is E'@omit';
