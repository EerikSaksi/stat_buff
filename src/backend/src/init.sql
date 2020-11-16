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
CREATE INDEX ON "userID" (username);
create table "userID" (
  googleID varchar(64) not null primary key,
  username varchar(32) REFERENCES "user" ON DELETE CASCADE
);
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
comment on table "userID" is E'@omit';
create function query_sender_data() returns varchar as $$
select
  u.username
from
  "user" as u, "userID" as uid
  --where u.username = uid.username
--where
--  uid.googleID = current_setting('user.id', true) :: varchar 
$$ language sql stable;


grant usage on schema public to query_sender;
grant all on table "user" to query_sender;
grant all on table "userID" to query_sender;
Alter table "user" enable row level security;
--CREATE POLICY user_policy ON "user" FOR all TO query_sender USING (username = query_sender_data());
