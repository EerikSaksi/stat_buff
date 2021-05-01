--! Previous: sha1:33d99fb3dc3d77bb5ee32044c2673a2f9f632ada
--! Hash: sha1:ceb7cca7a8dbc5cf7e8dc3bd61d1c533674b9549

-- Enter migration here
insert into
  "user_current_workout_plan"(user_id, workout_plan_id)
values
  (4, 1) on conflict(user_id) do nothing;
drop type if exists volume cascade;
create type volume as (sets integer, reps integer);
drop table if exists completed_workout cascade;

drop table if exists completed_workout_exercise cascade;
create table completed_workout(id serial primary key);
create table completed_workout_exercise(
  id serial primary key,
  exercise_id integer references "exercise"(id) on delete cascade not null,
  volume volume [ ] not null,
  completed_workout_id integer references "completed_workout"(id) on delete cascade,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

grant all on completed_workout_exercise_id_seq to public;
create index on "completed_workout_exercise"(exercise_id);
create index on "completed_workout_exercise"(completed_workout_id);
grant all on completed_workout_id_seq to public;
grant all on completed_workout to public;
grant all on completed_workout_exercise to public;
