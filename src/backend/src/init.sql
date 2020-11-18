DROP SCHEMA public CASCADE;
create schema public;
create table "group" (
  name varchar(32) not null primary key,
  level integer not null
);
create table "user" (
  username varchar(32) primary key not null,
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
grant all on table "user" to query_sender;
grant all on table "group" to query_sender;

comment on column "user".googleID is E'@omit';
Alter table "user" enable row level security;

CREATE POLICY user_update ON "user" FOR update to query_sender USING (googleID = current_setting('user.username'));
CREATE POLICY user_delete ON "user" FOR delete to query_sender  USING (googleID = current_setting('user.username'));
CREATE POLICY user_insert ON "user" FOR insert to query_sender with check (googleID = current_setting('user.username'));
CREATE POLICY user_select ON "user" FOR select to query_sender using (true);
