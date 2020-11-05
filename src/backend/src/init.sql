DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
create table "user" (username varchar(32) not null primary key);
create table "userID" (
  userName varchar (32),
  googleID varchar(64) not null primary key,
  foreign key (userName) references "user" (username)
);
insert into
  "user" (username)
values
  ('orek');
insert into
  "userID" (username, googleID)
values
  ('orek', 'gID');
comment on table userID is E'@omit';
