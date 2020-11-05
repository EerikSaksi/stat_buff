DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
drop schema app_private cascade;
drop schema app_hidden cascade;
drop schema app_private cascade;
create schema app_private;
create schema app_public;
create table "app_public.user" (username varchar(32) not null primary key);

create table "app_private.userID" (
  userName varchar (32),
  googleID varchar(64) not null primary key,
  foreign key (userName) references "app_public.user" (username)
);
insert into
  "app_public.user" (username)
values
  ('orek');
insert into
  "app_private.userID" (username, googleID)
values
  ('orek', 'gID');
