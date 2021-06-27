-- Enter migration here
alter TABLE app_user drop COLUMN if exists total_xp;
ALTER TABLE app_user ADD COLUMN total_xp integer not null default 0;

alter TABLE app_user drop COLUMN if exists level;

ALTER TABLE app_user ADD COLUMN level integer GENERATED ALWAYS AS (floor(total_xp / 20)) STORED;

drop function if exists create_completed_workout;

drop type if exists create_completed_workout_input;
create type create_completed_workout_input as (
  exercise_id integer,
  volumes volume[]
);

create or replace function create_completed_workout(completed_workout_exercises create_completed_workout_input[]) returns completed_workout_exercise[] as $$
declare
  completed_workout_id integer;
  cwe create_completed_workout_input;
  new_id integer;
  to_return completed_workout_exercise[];
begin
  insert into completed_workout(app_user_id) values (3) returning id into completed_workout_id;
  foreach cwe in array completed_workout_exercises loop
    insert into completed_workout_exercise(completed_workout_id, exercise_id, volumes) values (completed_workout_id, cwe.exercise_id, cwe.volumes) returning * into cwe;
  end loop;
  return null;
end; $$ language plpgsql security definer;
comment on table completed_workout is E'@omit create, update';
comment on table completed_workout_exercise is E'@omit create, update';
