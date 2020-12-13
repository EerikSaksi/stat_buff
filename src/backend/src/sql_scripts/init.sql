DROP SCHEMA public CASCADE;
create schema public;

create table "group" (
  name varchar(32) not null primary key,
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

alter table "group"
add column creator_username varchar(32) not null unique REFERENCES "user" ON DELETE set null;

create table "enemy" (
  level integer primary key,
  max_health integer,
  name varchar(64)
);


CREATE FUNCTION get_max_health(integer level)
RETURNS integer AS $$
BEGIN
  select max_health from "enemy" where level = level;
END;
$$ LANGUAGE plpgsql;
create table "battle" (
  enemy_level integer not null REFERENCES "enemy",
  groupName varchar(32) not null references "group",
  battle_number integer not null,   
  current_health integer not null default 200,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  primary key (groupName, battle_number)
);
create index on "battle"(groupName);
create index on "battle"(enemy_level);

alter table "group"
add column "battle_number" integer; 
alter table "group"
add FOREIGN KEY (name, battle_number) REFERENCES "battle"(groupName, battle_number) on delete set null;

create index on "group"(name, battle_number);

create table "bodystat" (
  username varchar(32) not null REFERENCES "user" ON DELETE cascade not null,
  isMale boolean not null,  
  bodymass integer not null check (bodymass > 0),
  primary key(username),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

create table "workout" (
  id serial primary key,
  average_rir integer not null,
  sets integer not null,
  hits integer GENERATED ALWAYS as ((10 - average_rir) / 10.0 * sets) stored,
  username varchar(32) not null references "user" on delete cascade,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
create index on "workout" (username);

CREATE INDEX ON "bodystat" (username);
create table "exercise" (
  slug_name varchar(32) not null primary key,
  popularity_ranking integer unique
);

create table "user_exercise" (
  slug_name varchar(32) not null REFERENCES "exercise" ON DELETE cascade not null,
  username varchar(32) not null  REFERENCES "user" ON DELETE cascade not null,
  repetitions integer not null,
  liftmass float not null,
  strongerPercentage integer not null,
  primary key(slug_name, username),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()

);
create index on "user_exercise" (slug_name);
create index on "user_exercise" (username);
