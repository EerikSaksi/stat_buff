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
comment on table "userID" is E'@omit';

--ensure no privileges that were set before exist
drop owned by query_sender;
drop role query_sender;
create role query_sender;
alter role query_sender with login;
alter user query_sender with password 'restrictedPermissions';
grant connect on database rpgym to query_sender;
grant usage on schema public to query_sender;
grant all on table "user" to query_sender;
grant all on table "userID" to query_sender;

create function query_sender_data() returns "user" as $$
select
*
from
  "user" 
  where username = 'orek';
   $$ language sql stable;


Alter table "user" enable row level security;
--CREATE POLICY user_policy ON "user" FOR all TO query_sender USING (username = (select username from query_sender_data())) 
CREATE POLICY user_policy ON "user" FOR all TO query_sender USING (username = 'orek'); 
