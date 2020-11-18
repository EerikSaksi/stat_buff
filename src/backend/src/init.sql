DROP SCHEMA public CASCADE;
create schema public;
create table "group" (
  name varchar(32) not null primary key,
  level integer not null
);
create table "user" (
  username varchar(32) primary key,
  groupName varchar(32) REFERENCES "group" ON DELETE CASCADE,
  googleID varchar(64) not null unique
);
CREATE INDEX ON "user" (groupName);
insert into
  "group" (name, level)
values
  ('Dream Team', 1),
  ('Team Rocket', 1),
  ('BLU Team', 1);
insert into
  "user" (username, groupName, googleID)
values
  ('orek', 'Dream Team', 'uh oh'),
  ('eerik', 'Team Rocket', 'stinky');

--ensure no privileges that were set before exist
drop owned by query_sender;
drop role query_sender;
create role query_sender;
alter role query_sender with login;
alter user query_sender with password 'restrictedPermissions';
grant all on database rpgym to query_sender;
grant all on schema public to query_sender;
grant all (username, groupName) on table "user" to query_sender;
grant insert (googleID) on table "user" to query_sender;
grant all on table "group" to query_sender;
Alter table "user" enable row level security;
CREATE POLICY user_policy ON "user" FOR  all USING (username = current_setting('user.username'));
CREATE POLICY user_insert ON "user" FOR insert with check (googleID = current_setting('user.googleID'));
