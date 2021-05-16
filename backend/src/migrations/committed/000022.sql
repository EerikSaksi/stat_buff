--! Previous: sha1:8d0a02b57c014f809fb98e24b70f600f1bd6bcb3
--! Hash: sha1:d2721586dcae9bad049316ee8cf463efcdd7bd68

-- Enter migration here
insert into "workout_plan"(user_id, name) values (4, 'Leg day everyday') on conflict (user_id, name) do nothing;

alter table "workout_plan" enable row level security;
drop policy if exists workout_plan_select_policy on "workout_plan";
CREATE POLICY workout_plan_select_policy ON "workout_plan" FOR SELECT USING (true);
drop policy if exists workout_plan_insert_policy on "workout_plan";
create POLICY workout_plan_insert_policy ON "workout_plan" FOR insert with check (user_id = (select id from active_user()));
drop policy if exists workout_plan_update_policy on "workout_plan";
CREATE POLICY workout_plan_update_policy ON "workout_plan" FOR update USING (user_id = (select id from active_user()));
drop policy if exists workout_plan_delete_policy on "workout_plan";
CREATE POLICY workout_plan_delete_policy ON "workout_plan" FOR delete USING (user_id = (select id from active_user()));

alter table "workout_plan_day" enable row level security;
drop policy if exists workout_plan_day_select_policy on "workout_plan_day";
CREATE POLICY workout_plan_day_select_policy ON "workout_plan_day" FOR SELECT USING (true);
drop policy if exists workout_plan_day_insert_policy on "workout_plan_day";
create POLICY workout_plan_day_insert_policy ON "workout_plan_day" FOR insert with check ((select user_id from workout_plan_day inner join workout_plan on workout_plan_day.workout_plan_id = workout_plan.id) = (select id from active_user()));
drop policy if exists workout_plan_day_update_policy on "workout_plan_day";
CREATE POLICY workout_plan_day_update_policy ON "workout_plan_day" FOR update USING ((select user_id from workout_plan_day inner join workout_plan on workout_plan_day.workout_plan_id = workout_plan.id) = (select id from active_user()));
drop policy if exists workout_plan_day_delete_policy on "workout_plan_day";
CREATE POLICY workout_plan_day_delete_policy ON "workout_plan_day" FOR delete USING ((select user_id from workout_plan_day inner join workout_plan on workout_plan_day.workout_plan_id = workout_plan.id) = (select id from active_user()));

comment on table completed_workout_exercise is
  E'@mncud\n';

alter table completed_workout_exercise alter column completed_workout_id set not null
