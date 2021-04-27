--! Previous: sha1:34267d94e82f16a798bb30e5cf195a9944db60f5
--! Hash: sha1:38f79a787992a715ce6642406bff26c329105536

drop table if exists exercise cascade;

drop type if exists body_part_enum ;
create type body_part_enum as enum ( 'Back' , 'Biceps' , 'Chest' , 'Core' , 'Forearms' , 'Legs' , 'Shoulders' , 'Triceps' , 'Whole Body');

drop type if exists exercise_type_enum;
create type exercise_type_enum as enum ('Barbell', 'Bodyweight', 'Olympic', 'Dumbbell', 'Machine', 'Cable');
create table exercise(
  id serial primary key,
  body_part body_part_enum not null,
  exercise_type exercise_type_enum not null,
  name varchar not null,
  count integer not null
);
grant all on exercise to public;
-- Enter migration here
drop table if exists workout_plan_exercise cascade;
create table workout_plan_exercise(
  id SERIAL primary key,
  exercise_id integer references "exercise"(id) not null,
  sets integer not null,
  reps integer not null
);
create index on "workout_plan_exercise"(exercise_id);
drop table if exists workout_plan cascade;
create table workout_plan (
  id SERIAL primary key,
  user_id SERIAL references "user"(id) not null,
  exercises workout_plan_exercise [ ] not null
);
grant all on workout to public;
create index on "workout_plan"(user_id);
grant all on "workout_plan_exercise" to public;
grant all on "workout_plan" to public;
