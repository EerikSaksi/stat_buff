DROP SCHEMA public CASCADE;
create schema public;

create table "group" (
  name varchar(32) not null primary key,
  level integer not null default 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
create table "user" (
  username varchar(32) primary key not null,
  groupName varchar(32) REFERENCES "group" ON DELETE set null,
  googleID varchar(64) not null unique,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX ON "user" (groupName);

create table "bodystat" (
  username varchar(32) REFERENCES "user" ON DELETE cascade not null,
  isMale boolean not null,  
  bodymass integer not null check (bodymass > 0),
  primary key(username),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
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
  primary key(slug_name, username),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

create index on "user_exercise" (slug_name);
create index on "user_exercise" (username);

insert into
  "group" (name)
values
  ('Dream Team'),
  ('Team Rocket'),
  ('BLU Team');
insert into
  "user" (username, groupName, googleID)
values
  ('orek', 'Dream Team', 'uh oh'),
  ('eerik', 'Team Rocket', 'stinky');

--insert into
--  "bodystat" (bodymass, isMale, username)
--values
--  (85, true, 'orek');


