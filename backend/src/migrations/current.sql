-- Enter migration here
alter table workout_plan_day enable row level security;
drop policy if exists workout_plan_day_select_policy on workout_plan_day;
CREATE POLICY workout_plan_day_select_policy ON workout_plan_day FOR SELECT USING (true);
drop policy if exists workout_plan_day_insert_policy on workout_plan_day;
create POLICY workout_plan_day_insert_policy ON workout_plan_day FOR insert with check (workout_plan_id in (select id from workout_plan where app_user_id = (select current_user_id())));
drop policy if exists workout_plan_day_update_policy on workout_plan_day;
CREATE POLICY workout_plan_day_update_policy ON workout_plan_day FOR update USING (workout_plan_id in (select id from workout_plan where app_user_id = (select current_user_id())));
drop policy if exists workout_plan_day_delete_policy on workout_plan_day;
CREATE POLICY workout_plan_day_delete_policy ON workout_plan_day FOR delete USING (workout_plan_id in (select id from workout_plan where app_user_id = (select current_user_id())));
