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

