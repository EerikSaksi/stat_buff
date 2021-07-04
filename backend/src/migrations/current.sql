-- Enter migration here

alter table completed_workout enable row level security;
drop policy if exists completed_workout_select_policy on completed_workout;
CREATE POLICY completed_workout_select_policy ON completed_workout FOR SELECT USING (true);
drop policy if exists completed_workout_insert_policy on completed_workout;
create POLICY completed_workout_insert_policy ON completed_workout FOR insert with check (app_user_id = (select current_user_id()));
drop policy if exists completed_workout_update_policy on completed_workout;
CREATE POLICY completed_workout_update_policy ON completed_workout FOR update USING (app_user_id = (select current_user_id()));
drop policy if exists completed_workout_delete_policy on completed_workout;
CREATE POLICY completed_workout_delete_policy ON completed_workout FOR delete USING (app_user_id = (select current_user_id()));



drop type if exists save_workout_payload;

drop function if exists save_workout cascade;

drop table if exists completed_workout cascade;

CREATE TABLE public.completed_workout  (
    id integer primary key generated always as identity,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    app_user_id integer not null default current_user_id() references app_user(id) on delete cascade
);
create index if not exists completed_workout_app_user_idx on "completed_workout"(app_user_id);

drop table if exists workout_plan cascade;
CREATE TABLE public.workout_plan (
    id integer primary key generated always as identity,
    name character varying NOT NULL,
    app_user_id integer not null default current_user_id() references app_user(id) on delete cascade,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT non_empty_name CHECK ((((name)::text = ''::text) IS FALSE))
);
create index if not exists workout_plan_app_user_idx on workout_plan(app_user_id);


drop function if exists save_workout cascade;
grant all on workout_plan to public;
grant all on completed_workout to public;

alter TABLE completed_workout_exercise drop COLUMN if exists completed_workout_id;
ALTER TABLE completed_workout_exercise ADD COLUMN completed_workout_id integer not null references completed_workout(id) on delete cascade;
create index if not exists completed_workout_exercise_completed_workout_idx on "completed_workout_exercise"(completed_workout_id);

delete from workout_plan_day;
alter TABLE workout_plan_day drop COLUMN if exists workout_plan_id;
ALTER TABLE workout_plan_day ADD COLUMN workout_plan_id integer not null references workout_plan(id) on delete cascade;
create index if not exists workout_plan_day_workout_plan_idx on "workout_plan_day"(workout_plan_id);



drop table if exists exercise_id_and_sets cascade;
drop table if exists exercise_id_and_sets cascade;
create table exercise_id_and_sets(
  exercise_id integer not null ,
  completed_sets completed_set[] not null
);
grant all on exercise_id_and_sets to public;
comment on table exercise_id_and_sets is E'@omit update create delete';

create or replace function save_workout(exercise_ids_and_sets exercise_id_and_sets[]) returns completed_workout as $$
declare
  id_and_sets exercise_id_and_sets;
  set completed_set;
  workout_id integer;
  exercise_id integer;
begin
  insert into completed_workout(app_user_id) values ((select current_user_id())) returning id into workout_id;
  foreach id_and_sets in array exercise_ids_and_sets loop
    insert into completed_workout_exercise(completed_workout_id, exercise_id) values (workout_id, id_and_sets.exercise_id) returning id into exercise_id;
    foreach set in array id_and_sets.completed_sets loop
      insert into completed_set(completed_workout_exercise_id, reps, weight) values (exercise_id, set.reps, set.weight);
    end loop;
  end loop;
  return (select * from completed_workout where id = workout_id);
end; $$ language plpgsql security definer;
