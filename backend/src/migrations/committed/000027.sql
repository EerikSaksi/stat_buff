--! Previous: sha1:7075729e301c3c4f235512986e5809758d1abe3d
--! Hash: sha1:d7a1729cebd3b962325c98d4c3897e7dedd46b77

-- Enter migration here

select set_config('jwt.claims.user_id', '4', false);
create or replace function current_user_id() returns integer as $$
  select nullif(current_setting('jwt.claims.user_id', true), '')::integer;
$$ language sql stable;

grant all on function current_user_id to public;
  
grant all on function current_user_id to public;
drop table if exists battle cascade;
drop table if exists enemy cascade;
drop table if exists "group" cascade;

alter table "workout_plan_day" enable row level security;
drop policy if exists workout_plan_day_select_policy on "workout_plan_day";
CREATE POLICY workout_plan_day_select_policy ON "workout_plan_day" FOR SELECT USING (true);
drop policy if exists workout_plan_day_insert_policy on "workout_plan_day";
create POLICY workout_plan_day_insert_policy ON "workout_plan_day" FOR insert with check (
  (
  select id in (select workout_plan_day.id from workout_plan join workout_plan_day on workout_plan.id = workout_plan_day.workout_plan_id where workout_plan.user_id = (select current_user_id()))
)
);
drop policy if exists workout_plan_day_update_policy on "workout_plan_day";
CREATE POLICY workout_plan_day_update_policy ON "workout_plan_day" FOR update USING (
  (
  select id in (select workout_plan_day.id from workout_plan join workout_plan_day on workout_plan.id = workout_plan_day.workout_plan_id where workout_plan.user_id = (select current_user_id()))
)
);
drop policy if exists workout_plan_day_delete_policy on "workout_plan_day";
CREATE POLICY workout_plan_day_delete_policy ON "workout_plan_day" FOR delete USING (
  (
  select id in (select workout_plan_day.id from workout_plan join workout_plan_day on workout_plan.id = workout_plan_day.workout_plan_id where workout_plan.user_id = (select current_user_id()))
)
);

ALTER TABLE IF EXISTS "user"
RENAME TO app_user;

delete from "bodystat";
alter TABLE "bodystat" drop COLUMN if exists app_user_id;
ALTER TABLE "bodystat" ADD COLUMN app_user_id integer not null references app_user(id) on delete cascade;

alter table app_user drop column if exists groupName cascade;


drop function if exists calculate_total_damage;
drop function if exists calculate_strength_stats;
drop function if exists encrypt_password_and_set_creator;
drop function if exists get_battle_and_check_expiry;
drop function if exists join_group;
drop function if exists join_random_public_group;
drop function if exists load_groupname;
drop function if exists notify_message_inserted cascade;
drop function if exists notify_user_exercise_inserted cascade;
drop function if exists notify_workout_inserted cascade;
drop function if exists nullify_group;
drop function if exists scale_health;
drop function if exists update_battle_to_current cascade;


delete from app_user;
alter TABLE app_user drop COLUMN if exists password;
ALTER TABLE app_user ADD COLUMN password text not null;
comment on column app_user.password is E'@omit';
