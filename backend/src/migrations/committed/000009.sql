--! Previous: sha1:a95aa26c64a37d7ecadc07a049aa0d6c58e54921
--! Hash: sha1:4352b4eabd06f20183301cc1b11c7aa52bd3fe7e

-- Enter migration here
alter table "user" drop constraint if exists user_pkey cascade;
drop table if exists workout;
create table workout ();


alter table
  "bodystat" drop constraint if exists bodystat_username_fkey cascade;
alter table
  "chat_message" drop constraint if exists chat_message_username_fkey cascade;
alter table "session_analytics"
  drop constraint if exists session_analytics_username_fkey cascade;
alter table "user_exercise"
  drop constraint if exists user_exercise_username_fkey cascade;


alter table "user" drop column if exists id cascade;
alter table "user" add column id serial primary key;
    
alter table "bodystat" drop column if exists user_id cascade;
alter table "bodystat" add column user_id serial references "user"(id) on delete cascade;

alter table "chat_message" drop column if exists user_id cascade;
alter table "chat_message" add column user_id serial references "user"(id) on delete cascade;

alter table "session_analytics" drop column if exists user_id cascade;
alter table "session_analytics" add column user_id serial references "user"(id) on delete cascade;

alter table "user_exercise" drop column if exists user_id cascade;
alter table "user_exercise" add column user_id serial references "user"(id) on delete cascade;

drop policy if exists user_update ON "user";
drop policy if exists user_create ON "user";
drop policy if exists user_delete ON "user";
CREATE POLICY user_update ON "user" FOR UPDATE TO query_sender USING(id = ( SELECT id FROM active_user()));
CREATE POLICY user_create ON "user" FOR INSERT TO query_sender WITH CHECK(id = ( SELECT id FROM active_user()));
CREATE POLICY user_delete ON "user" FOR DELETE TO query_sender USING(id = ( SELECT id FROM active_user()));

drop type public.jwt_token cascade;
CREATE TYPE public.jwt_token AS (
	exp integer,
	user_id integer
);
ALTER TABLE "user" drop CONSTRAINT if exists unique_username ;
ALTER TABLE "user" ADD CONSTRAINT unique_username UNIQUE (username);
