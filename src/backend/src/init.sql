DROP SCHEMA public CASCADE;
create schema public;
create table "group" (
  name varchar(32) not null primary key,
  level integer not null
);
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
  ('orek', 'Dream Team'),
  ('eerik', 'Team Rocket');
insert into
  "userID" (username, googleID)
values
  ('orek', 'stinky'),
  ('eerik', 'uh oh');
--ensure no privileges that were set before exist
  drop owned by query_sender;
drop role query_sender;
create role query_sender;
alter role query_sender with login;
alter user query_sender with password 'restrictedPermissions';
grant all on database rpgym to query_sender;
grant all on schema public to query_sender;
grant all on table "user" to query_sender;
grant all on table "group" to query_sender;
Alter table
  "user" enable row level security;
CREATE POLICY user_insert ON "user" FOR insert TO query_sender with check (username = current_setting('user.id'));
CREATE POLICY user_delete ON "user" FOR delete TO query_sender USING (username = current_setting('user.id'));
CREATE POLICY user_update ON "user" FOR update TO query_sender USING (username = current_setting('user.id'));
