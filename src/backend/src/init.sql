DROP SCHEMA public CASCADE;
create schema public;
create table "group" (name varchar(32) not null primary key, level integer not null);
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
  "group" (name, level)
values
  ('Dream Team', 0),
  ('Team Rocket', 0),
  ('BLU Team', 0);
insert into
  "user" (username, groupName)
values
  ('orek', 'Dream Team');

insert into
  "userID" (username, googleID)
values
  ('orek', '105395086988085655499');
comment on table "userID" is E'@omit';
