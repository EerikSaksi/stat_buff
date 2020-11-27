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
CREATE INDEX ON "user" (groupName);

create table "bodystat" (
  username varchar(32) REFERENCES "user" ON DELETE cascade not null,
  isMale boolean not null,  
  bodymass integer not null check (bodymass > 0),
  unique(username)
);
CREATE INDEX ON "bodystat" (username);
create table "exercise" (
  slug_name varchar(32) not null primary key,
  popularity_ranking integer unique
);
create table "user_exercise" (
  slug_name varchar(32) REFERENCES "exercise" ON DELETE cascade not null,
  username varchar(32) REFERENCES "user" ON DELETE cascade not null,
  repetitions integer not null,
  liftmass float not null,
  strongerPercentage integer not null,
  primary key(slug_name, username)
);
create index on "user_exercise" (slug_name);
create index on "user_exercise" (username);

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
  "bodystat" (bodymass, isMale, username)
values
  (85, true, 'eerik');

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
grant all on table "bodystat" to query_sender;
grant select on table "exercise" to query_sender;
grant all on table "user_exercise" to query_sender;

comment on column "user".googleID is E'@omit';
comment on table "user" is E'@omit create';
comment on table "bodystat" is E'@omit all';

Alter table "user" enable row level security;
Alter table "bodystat" enable row level security;
Alter table "user_exercise" enable row level security;


CREATE FUNCTION username() RETURNS varchar AS $$
  select username from "user" where googleID = current_setting('user.googleID')
$$ LANGUAGE sql IMMUTABLE STRICT;

CREATE FUNCTION average_strength() RETURNS numeric AS $$
  select avg("user_exercise".strongerpercentage) from "user_exercise" where username = username()
$$ LANGUAGE sql IMMUTABLE STRICT;

--CREATE POLICY user_update ON "user" FOR update to query_sender USING (googleID = current_setting('user.googleID'));
CREATE POLICY user_update ON "user" FOR update to query_sender USING (googleID = current_setting('user.googleID'));
CREATE POLICY user_delete ON "user" FOR delete to query_sender USING (googleID = current_setting('user.googleID'));
CREATE POLICY user_create ON "user" FOR insert to query_sender with check (googleID = current_setting('user.googleID'));
CREATE POLICY user_select ON "user" FOR select to query_sender using (true);

CREATE POLICY group_delete ON "group" FOR delete to query_sender USING (false);


--only a user should have permissions to their own body stats
create policy bodystats_all on "bodystat" FOR all to query_sender using (username = username());


CREATE POLICY user_exercise_update ON "user_exercise" FOR update to query_sender USING (username = username());
CREATE POLICY user_exercise_delete ON "user_exercise" FOR delete to query_sender USING (username = username());
CREATE POLICY user_exercise_create ON "user_exercise" FOR insert to query_sender with check (username = username());
CREATE POLICY user_exercise_select ON "user_exercise" FOR select to query_sender using (true);
