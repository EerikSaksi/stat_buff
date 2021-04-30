--! Previous: sha1:dbab98216984f9ddcdd7a3ae86f4a28910d9169b
--! Hash: sha1:0654172cb085ff95cb81d5ee80cd4b1a12a940f5

-- Enter migration here
insert into workout_plan(user_id, workout_exercises) values(4, '{"(4, 20, 11)", "(1, 1, 18)", "(2, 2, 10)"}');
drop table if exists user_current_workout_plan;
create table user_current_workout_plan(
  user_id integer references "user"(id) primary key,
  workout_plan_id integer references "workout_plan"(id)
);

create index on "user_current_workout_plan"(workout_plan_id);
grant all on "user_current_workout_plan" to public;


alter table "workout_plan" enable row level security;
drop policy if exists workout_plan_select_policy on "workout_plan";
CREATE POLICY workout_plan_select_policy ON "workout_plan" FOR SELECT USING (true);
drop policy if exists workout_plan_insert_policy on "workout_plan";
create POLICY workout_plan_insert_policy ON "workout_plan" FOR insert with check (user_id = (select id from active_user()));
drop policy if exists workout_plan_update_policy on "workout_plan";
CREATE POLICY workout_plan_update_policy ON "workout_plan" FOR update USING (user_id = (select id from active_user()));
drop policy if exists workout_plan_delete_policy on "workout_plan";
CREATE POLICY workout_plan_delete_policy ON "workout_plan" FOR delete USING (user_id = (select id from active_user()));

alter table "user_current_workout_plan" enable row level security;
drop policy if exists user_current_workout_plan_select_policy on "user_current_workout_plan";
CREATE POLICY user_current_workout_plan_select_policy ON "user_current_workout_plan" FOR SELECT USING (true);
drop policy if exists user_current_workout_plan_insert_policy on "user_current_workout_plan";
create POLICY user_current_workout_plan_insert_policy ON "user_current_workout_plan" FOR insert with check (user_id = (select id from active_user()));
drop policy if exists user_current_workout_plan_update_policy on "user_current_workout_plan";
CREATE POLICY user_current_workout_plan_update_policy ON "user_current_workout_plan" FOR update USING (user_id = (select id from active_user()));
drop policy if exists user_current_workout_plan_delete_policy on "user_current_workout_plan";
CREATE POLICY user_current_workout_plan_delete_policy ON "user_current_workout_plan" FOR delete USING (user_id = (select id from active_user()));
