alter TABLE bodystat drop COLUMN if exists app_user_id cascade;
ALTER TABLE bodystat ADD COLUMN app_user_id integer not null references app_user(id) on delete cascade;
create index if not exists bodystat_app_user_idx on "bodystat"(app_user_id);

alter table bodystat enable row level security;
drop policy if exists bodystat_select_policy on bodystat;
CREATE POLICY bodystat_select_policy ON bodystat FOR SELECT USING (true);
drop policy if exists bodystat_insert_policy on bodystat;
create POLICY bodystat_insert_policy ON bodystat FOR insert with check (app_user_id = (select current_user_id()));
drop policy if exists bodystat_update_policy on bodystat;
CREATE POLICY bodystat_update_policy ON bodystat FOR update USING (app_user_id = (select current_user_id()));
drop policy if exists bodystat_delete_policy on bodystat;
CREATE POLICY bodystat_delete_policy ON bodystat FOR delete USING (app_user_id = (select current_user_id()));

alter TABLE completed_workout drop COLUMN if exists app_user_id cascade;
ALTER TABLE completed_workout ADD COLUMN app_user_id integer not null references app_user(id) on delete cascade;
create index if not exists completed_workout_app_user_idx on "completed_workout"(app_user_id);

alter table completed_workout enable row level security;
drop policy if exists completed_workout_select_policy on completed_workout;
CREATE POLICY completed_workout_select_policy ON completed_workout FOR SELECT USING (true);
drop policy if exists completed_workout_insert_policy on completed_workout;
create POLICY completed_workout_insert_policy ON completed_workout FOR insert with check (app_user_id = (select current_user_id()));
drop policy if exists completed_workout_update_policy on completed_workout;
CREATE POLICY completed_workout_update_policy ON completed_workout FOR update USING (app_user_id = (select current_user_id()));
drop policy if exists completed_workout_delete_policy on completed_workout;
CREATE POLICY completed_workout_delete_policy ON completed_workout FOR delete USING (app_user_id = (select current_user_id()));

alter table session_analytics enable row level security;
drop policy if exists session_analytics_select_policy on session_analytics;
CREATE POLICY session_analytics_select_policy ON session_analytics FOR SELECT USING (true);
drop policy if exists session_analytics_insert_policy on session_analytics;
create POLICY session_analytics_insert_policy ON session_analytics FOR insert with check (app_user_id = (select current_user_id()));
drop policy if exists session_analytics_update_policy on session_analytics;
CREATE POLICY session_analytics_update_policy ON session_analytics FOR update USING (app_user_id = (select current_user_id()));
drop policy if exists session_analytics_delete_policy on session_analytics;
CREATE POLICY session_analytics_delete_policy ON session_analytics FOR delete USING (app_user_id = (select current_user_id()));

comment on table session_analytics is E'@omit update, delete';

alter table user_exercise enable row level security;
drop policy if exists user_exercise_select_policy on user_exercise;
CREATE POLICY user_exercise_select_policy ON user_exercise FOR SELECT USING (true);
drop policy if exists user_exercise_insert_policy on user_exercise;
create POLICY user_exercise_insert_policy ON user_exercise FOR insert with check (app_user_id = (select current_user_id()));
drop policy if exists user_exercise_update_policy on user_exercise;
CREATE POLICY user_exercise_update_policy ON user_exercise FOR update USING (app_user_id = (select current_user_id()));
drop policy if exists user_exercise_delete_policy on user_exercise;
CREATE POLICY user_exercise_delete_policy ON user_exercise FOR delete USING (app_user_id = (select current_user_id()));



alter TABLE workout_plan drop COLUMN if exists app_user_id cascade;
ALTER TABLE workout_plan ADD COLUMN app_user_id integer not null references app_user(id) on delete cascade; 
create index if not exists workout_plan_app_user_idx on "workout_plan"(app_user_id);

alter table workout_plan enable row level security;
drop policy if exists workout_plan_select_policy on workout_plan;
CREATE POLICY workout_plan_select_policy ON workout_plan FOR SELECT USING (true);
drop policy if exists workout_plan_insert_policy on workout_plan;
create POLICY workout_plan_insert_policy ON workout_plan FOR insert with check (app_user_id = (select current_user_id()));
drop policy if exists workout_plan_update_policy on workout_plan;
CREATE POLICY workout_plan_update_policy ON workout_plan FOR update USING (app_user_id = (select current_user_id()));
drop policy if exists workout_plan_delete_policy on workout_plan;
CREATE POLICY workout_plan_delete_policy ON workout_plan FOR delete USING (app_user_id = (select current_user_id()));



alter table app_user enable row level security;
drop policy if exists app_user_select_policy on app_user;
CREATE POLICY app_user_select_policy ON app_user FOR SELECT USING (true);
drop policy if exists app_user_insert_policy on app_user;
create POLICY app_user_insert_policy ON app_user FOR insert with check (id= (select current_user_id()));
drop policy if exists app_user_update_policy on app_user;
CREATE POLICY app_user_update_policy ON app_user FOR update USING (id = (select current_user_id()));
drop policy if exists app_user_delete_policy on app_user;
CREATE POLICY app_user_delete_policy ON app_user FOR delete USING (id= (select current_user_id()));


create or replace function authenticate(
  username varchar(32),
  password text
) returns jwt_token as $$
declare
  account app_user;
begin
  select a.* into account
    from app_user as a
    where a.username = authenticate.username;
  if account.password = crypt(password, account.password) then
    return (
      extract(epoch from now() + interval '7 days'),
      account.id
    )::jwt_token;
  else
    return null;
  end if;
end;
$$ language plpgsql stable strict security definer ;
grant all on function authenticate to public;
