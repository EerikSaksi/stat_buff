create index if not exists workout_plan_user_id_idx on "workout_plan"(user_id);
insert into "workout_plan_day"(workout_plan_id, name, workout_exercises) values (1, 'Chest and arms', '{"(4, 20, 1)", "(6, 9, 2)"}') on conflict(name, workout_plan_id) do nothing;
insert into "user_current_workout_plan"(user_id, workout_plan_id) values (4, 1) on conflict (user_id) do nothing; 

alter table "workout_plan_day" drop constraint if exists workout_plan_day_name_key;
ALTER TABLE "workout_plan_day" drop CONSTRAINT if exists unique_workout_plan_id_name;
ALTER TABLE "workout_plan_day" ADD CONSTRAINT unique_workout_plan_id_name UNIQUE (workout_plan_id, name);

delete from "user_current_workout_plan";
alter table "user_current_workout_plan" alter column workout_plan_id set not null;
insert into "user_current_workout_plan"(user_id, workout_plan_id) values (4, 1) on conflict (user_id) do nothing; 





