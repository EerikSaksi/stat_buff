DROP SCHEMA public CASCADE;
create schema public;
create table "group" (
  name varchar(32) not null primary key,
  level integer not null
);
create table "user" (
  username varchar(32) primary key not null,
  groupName varchar(32) REFERENCES "group" ON DELETE set null,
  googleID varchar(64) not null unique
);

create table "body_stat" (
  username varchar(32) REFERENCES "user" ON DELETE cascade,
  isMale boolean,  
  bodymass integer,
  unique(username)
);

CREATE INDEX ON "user" (groupName);
CREATE INDEX ON "body_stat" (username);
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

insert into
  "body_stat" (bodymass, isMale, username)
values
  (85, true, 'eerik'),
  (69, false, 'orek');

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
grant all on table "body_stat" to query_sender;

comment on column "user".googleID is E'@omit';
comment on table "user" is E'@omit create';
Alter table "user" enable row level security;
Alter table "body_stat" enable row level security;


CREATE FUNCTION username() RETURNS varchar AS $$
  select username from "user" where googleID = current_setting('user.googleID')
$$ LANGUAGE sql IMMUTABLE STRICT;

--CREATE POLICY user_update ON "user" FOR update to query_sender USING (googleID = current_setting('user.googleID'));
CREATE POLICY user_update ON "user" FOR update to query_sender USING (googleID = current_setting('user.googleID'));
CREATE POLICY user_delete ON "user" FOR delete to query_sender USING (googleID = current_setting('user.googleID'));
CREATE POLICY user_create ON "user" FOR insert to query_sender with check (googleID = current_setting('user.googleID'));
CREATE POLICY user_select ON "user" FOR select to query_sender using (true);

--only a user should have permissions to their own body stats
create policy body_stats_all on "body_stat" FOR all to query_sender using (username = username())
