drop table if exists bodystat ;

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

delete from app_user;
alter TABLE app_user drop COLUMN if exists is_male;
ALTER TABLE app_user ADD COLUMN is_male boolean not null default true;

delete from app_user;
alter TABLE app_user drop COLUMN if exists bodymass;
ALTER TABLE app_user ADD COLUMN bodymass float not null default 80.0;

alter TABLE completed_workout drop COLUMN if exists created_at;
ALTER TABLE completed_workout ADD COLUMN created_at timestamp with time zone DEFAULT now() NOT NULL;
alter TABLE completed_workout drop COLUMN if exists updated_at;
ALTER TABLE completed_workout ADD COLUMN updated_at timestamp with time zone DEFAULT now() NOT NULL;
comment on column completed_workout.created_at is E'@omit create, update, delete';
comment on column completed_workout.updated_at is E'@omit create, update, delete';
do $$
  begin
    CREATE TRIGGER set_timestamp BEFORE UPDATE ON completed_workout FOR EACH ROW EXECUTE procedure trigger_set_timestamp();
  exception 
    when sqlstate '42710' then
      raise notice '';
end $$;


comment on column app_user.created_at is E'@omit create, update, delete';
comment on column app_user.updated_at is E'@omit create, update, delete';

comment on column app_user.created_at is E'@omit create, update, delete';
comment on column app_user.updated_at is E'@omit create, update, delete';

alter table completed_workout_exercise drop column if exists created_at cascade;


alter TABLE workout_plan drop COLUMN if exists updated_at;
ALTER TABLE workout_plan ADD COLUMN updated_at timestamp with time zone DEFAULT now() NOT NULL;
CREATE TRIGGER set_timestamp BEFORE UPDATE ON workout_plan FOR EACH ROW EXECUTE procedure trigger_set_timestamp();
comment on column workout_plan.created_at is E'@omit update, delete, create';
comment on column workout_plan.updated_at is E'@omit update, delete, create';
