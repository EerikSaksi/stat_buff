--! Previous: sha1:9791fdcb9ca22cc6b0800898822e035b9eceda45
--! Hash: sha1:8d0a02b57c014f809fb98e24b70f600f1bd6bcb3

create index if not exists workout_plan_user_id_idx on "workout_plan"(user_id);
insert into "user_current_workout_plan"(user_id, workout_plan_id) values (4, 1) on conflict (user_id) do nothing; 


delete from "user_current_workout_plan";
alter table "user_current_workout_plan" alter column workout_plan_id set not null;
insert into "user_current_workout_plan"(user_id, workout_plan_id) values (4, 1) on conflict (user_id) do nothing; 

alter TABLE "workout_plan" drop COLUMN if exists name;
ALTER TABLE "workout_plan" ADD COLUMN name varchar;
ALTER TABLE "workout_plan" drop CONSTRAINT if exists unique_user_id_name;
ALTER TABLE "workout_plan" ADD CONSTRAINT unique_user_id_name UNIQUE (user_id, name);


alter table "workout_plan_day" drop constraint if exists workout_plan_day_name_key;
ALTER TABLE "workout_plan_day" drop CONSTRAINT if exists unique_workout_plan_id_name;
ALTER TABLE "workout_plan_day" ADD CONSTRAINT unique_workout_plan_id_name UNIQUE (workout_plan_id, name);
insert into "workout_plan_day"(workout_plan_id, name, workout_exercises) values (1, 'Legs', '{"(6, 4, 9)", "(7,7,7)"}') on conflict(name, workout_plan_id) do nothing;
insert into "workout_plan_day"(workout_plan_id, name, workout_exercises) values (1, 'Chest and arms', '{"(4, 20, 1)", "(6, 9, 2)"}') on conflict(name, workout_plan_id) do nothing;

update "workout_plan" set name = 'PPL';
ALTER TABLE "workout_plan" ALTER COLUMN name SET NOT NULL;
